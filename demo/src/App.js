import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Image } from './../../src/';

console.log('image', Image);

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            images: [
                {src: '/images/big/(1).jpg', width: 960, height: 600},
                {src: '/images/big/(2).jpg', width: 960, height: 600},
                {src: '/images/big/(3).jpg', width: 960, height: 600},
                {src: '/images/big/(4).jpg', width: 960, height: 600},
                {src: '/images/big/(5).jpg', width: 960, height: 638},
                {src: '/images/big/(6).jpg', width: 960, height: 600},
                {src: '/images/big/(7).jpg', width: 960, height: 600},
                {src: '/images/big/(8).jpg', width: 960, height: 600},
                {src: '/images/big/(9).jpg', width: 960, height: 600},
                {src: '/images/big/(10).jpg', width: 960, height: 600},
                {src: '/images/big/(11).jpg', width: 960, height: 600},
                {src: '/images/big/(12).jpg', width: 960, height: 600},
                {src: '/images/big/(13).jpg', width: 960, height: 540},
                {src: '/images/big/(14).jpg', width: 960, height: 600},
                {src: '/images/big/(15).jpg', width: 960, height: 600},
                {src: '/images/big/(16).jpg', width: 480, height: 300},
                {src: '/images/big/(17).jpg', width: 480, height: 300},
                {src: '/images/big/(18).jpg', width: 480, height: 300},
                {src: '/images/big/(19).jpg', width: 480, height: 300},
                {src: '/images/big/(20).jpg', width: 480, height: 300},
                {src: '/images/big/(21).jpg', width: 480, height: 300},
                {src: '/images/big/(22).jpg', width: 480, height: 300},
                {src: '/images/big/(23).jpg', width: 480, height: 300},
                {src: '/images/big/(24).jpg', width: 480, height: 300},
                {src: '/images/big/(25).jpg', width: 480, height: 300},
            ],
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React图片惰性加载</h1>
                </header>
                <div className="container-div">
                    {
                        this.state.images.map((image, index) => (
                            <Image key={index} {...image} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default App;
