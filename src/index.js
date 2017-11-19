import React from 'react';

import './index.css';

export function Image(props) {
    return (
        <div
            role="img"
            className="lazyload-img"
            style={{width: `${props.width}px`}}
            src={props.src}
        >
            <div style={{padding: `${props.height / props.width * 100}% 0 0 0`}}>
                <img {...props} data-lazyload-state="interactive|loading|complete|error" />
            </div>
        </div>
    );
}

export function lazy(component) {
}
