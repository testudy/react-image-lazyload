import React from 'react';

import './index.css';

function Image(props) {
    return (
        <div role="img" src={"图片路径"} class="lazyload-img" style="width: 图片宽度px;">
            <div style="padding: 图片高宽百分比% 0 0 0;">
                <img {...props} data-lazyload-original="图片路径" data-lazyload-state="interactive|loading|complete|error" />
            </div>
        </div>
    );
}

function lazy(component) {
}

export lazy;

export default Image;
