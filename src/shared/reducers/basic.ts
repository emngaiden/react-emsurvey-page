const initialState = {
    data: 0
};

export type BasicState = Readonly<typeof initialState>;

export const ACTION_TYPES = {
    INCREASE_DATA: "basic/increase_data",
    DECREASE_DATA: "basic/decrease_data",
    RESET: "basic/reset"
}

export default (state: BasicState = initialState, action): BasicState => {
    switch(action.type) {
        case ACTION_TYPES.INCREASE_DATA: {
            return {
                ...state,
                data: state.data + 1
            }
        }
        case ACTION_TYPES.DECREASE_DATA: {
            return {
                ...state,
                data: state.data - 1
            }
        }
        case ACTION_TYPES.RESET: {
            return initialState;
        }
        default:
            return state;
    }
}

export const increaseData = () => ({
    type: ACTION_TYPES.INCREASE_DATA
});

export const decreaseData = () => ({
    type: ACTION_TYPES.DECREASE_DATA
});

export const reset = () => ({
    type: ACTION_TYPES.RESET
});