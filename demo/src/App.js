import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Image } from './../../src/';

class App extends Component {
    images = [
        {uri: '/images/big/(1).jpg', width: 960, height: 600},
        {uri: '/images/big/(2).jpg', width: 960, height: 600},
        {uri: '/images/big/(3).jpg', width: 960, height: 600},
        {uri: '/images/big/(4).jpg', width: 960, height: 600},
        {uri: '/images/big/(5).jpg', width: 960, height: 638},
        {uri: '/images/big/(6).jpg', width: 960, height: 600},
        {uri: '/images/big/(7).jpg', width: 960, height: 600},
        {uri: '/images/big/(8).jpg', width: 960, height: 600},
        {uri: '/images/big/(9).jpg', width: 960, height: 600},
        {uri: '/images/big/(10).jpg', width: 960, height: 600},
        {uri: '/images/big/(11).jpg', width: 960, height: 600},
        {uri: '/images/big/(12).jpg', width: 960, height: 600},
        {uri: '/images/big/(13).jpg', width: 960, height: 540},
        {uri: '/images/big/(14).jpg', width: 960, height: 600},
        {uri: '/images/big/(15).jpg', width: 960, height: 600},
        {uri: '/images/big/(16).jpg', width: 480, height: 300},
        {uri: '/images/big/(17).jpg', width: 480, height: 300},
        {uri: '/images/big/(18).jpg', width: 480, height: 300},
        {uri: '/images/big/(19).jpg', width: 480, height: 300},
        {uri: '/images/big/(20).jpg', width: 480, height: 300},
        {uri: '/images/big/(21).jpg', width: 480, height: 300},
        {uri: '/images/big/(22).jpg', width: 480, height: 300},
        {uri: '/images/big/(23).jpg', width: 480, height: 300},
        {uri: '/images/big/(24).jpg', width: 480, height: 300},
        {uri: '/images/big/(25).jpg', width: 480, height: 300},
    ];

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React图片惰性加载</h1>
                </header>
                <div className="App-main">
                    {
                        this.images.map((image, index) => (
                            <Image key={index} source={image} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default App;
