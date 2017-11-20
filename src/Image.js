import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import lazyload from './lazyload';

import './Image.css';

class Image extends PureComponent {

    static propTypes = {
        source: PropTypes.shape({
            uri: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }).isRequired,
        alt: PropTypes.string,
        placeholder: PropTypes.string,
    };

    static defaultProps = {
        alt: '',
        placeholder: '',
    };

    componentDidMount() {
        lazyload(this.wrap, this.image);
    }

    componentWillUnMount() {
        // 队列删除
        // unlazyload(this.wrap, this.image);
    }

    render() {
        const {source, alt, placeholder} = this.props;
        // data-lazyload-state="interactive|loading|complete|error"
        return (
            <div
                ref={(element)=>{this.wrap = element;}}
                role="img"
                className="lazyload-img"
                style={{width: `${source.width}px`}}
                src={source.uri}
            >
                <div style={{padding: `${source.height / source.width * 100}% 0 0 0`}}>
                    {
                        placeholder ?
                            <img
                                src={placeholder}
                                alt={alt}
                                ref={(element)=>{this.image = element;}}
                            />
                            :
                            <img
                                alt={alt}
                                ref={(element)=>{this.image = element;}}
                            />
                    }
                </div>
            </div>
        );
    }

}

export default Image;
