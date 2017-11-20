import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

export function Image({source, placeholder}) {
    console.log(placeholder);
    return (
        <div
            role="img"
            className="lazyload-img"
            style={{width: `${source.width}px`}}
            src={source.uri}
        >
            <div style={{padding: `${source.height / source.width * 100}% 0 0 0`}}>
                {
                    placeholder ?
                        <img src={placeholder} data-lazyload-state="interactive|loading|complete|error" />
                        :
                        <img data-lazyload-state="interactive|loading|complete|error" />
                }
            </div>
        </div>
    );
}

Image.propTypes = {
    source: PropTypes.shape({
        uri: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired,
    placeholder: PropTypes.string,
};

Image.defaultProps = {
    placeholder: '',
};

export function lazy(component) {
}
