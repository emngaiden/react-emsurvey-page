import React, { useEffect, useState } from 'react';
import './style.css';

export function Loader(props) {
    const st = {border: `4px solid ${props.color}`}
    return <div className="lds-ripple"><div style={st}/><div style={st}/></div>
}