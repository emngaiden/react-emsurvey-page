import React, { useEffect, useState } from 'react';
import { Loader } from 'src/components/loader';

export interface IImageGridProps {
    imagesSrc: any[];
    size?: number;
    preload?: boolean;
    padding?: number;
    radius?: number;
    disableContextMenu?: boolean;
    disableDrag?: boolean;
    onImageClick?: (event?: React.MouseEvent<HTMLImageElement, MouseEvent>, src?: any, handledSrc?: string) => void;
    srcHandler?: (src: any) => string;
}

export function ImageGrid(props: IImageGridProps) {
    const imgStyle = {
        width: props.size + 'vh',
        height: props.size + 'vh',
        padding:  props.padding + 'vh',
        cursor: props.onImageClick !== undefined ? 'pointer' : '',
        borderRadius: props.radius + 'px'
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(props.preload) {
            cacheImages(props.imagesSrc);
        } else {
            setIsLoading(false);
        }
    }, [])

    async function cacheImages(images: any[]) {
        const p = await images.map(image => (
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = props.srcHandler(image);
            })
        ));
        await Promise.all(p);
        setIsLoading(false)
    }

    function clickHandler(event: React.MouseEvent<HTMLImageElement, MouseEvent>, src: any, handledSrc: string) {
        if (props.onImageClick !== undefined) {
            props.onImageClick(event, src, handledSrc);
        }
    }

    return (
        <div id="image-grid-container">
            {props.preload && isLoading ? 
                <Loader color="black" /> :
                props.imagesSrc.map(image => {
                    const src = props.srcHandler(image);
                    return <img
                        key={src}
                        onContextMenu={e => props.disableContextMenu ? e.preventDefault() : e}
                        onDragStart={e => props.disableDrag ? e.preventDefault(): e}
                        id={src}
                        style={imgStyle}
                        src={src}
                        onClick={function (event) { clickHandler(event, image, src)}}
                    />
                })
            }
        </div>
    );
}

ImageGrid.defaultProps = {
    imagesSrc: undefined,
    size: 25,
    padding: 0,
    preload: false,
    radius: 0,
    disableDrag: false,
    disableContextMenu: false,
    srcHandler: src => src
}