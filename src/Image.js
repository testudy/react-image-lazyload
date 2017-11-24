import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Lazyload from './Lazyload';
import hashcode from './hashcode';

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

    componentDidMount () {
        this.entity = {
            hashcode: hashcode(this),
            image: this.image,
            uri: this.props.source.uri
        };
        Lazyload.getInstance().add(this.entity);
    }

    componentWillUnMount () {
        Lazyload.getInstance().remove(this.entity);
    }

    render() {
        const {source, alt, placeholder} = this.props;

        // data-lazyload-state="interactive|loading|complete|error"
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
