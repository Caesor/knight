import React, { Component } from 'react';
import Phaser from 'phaser';
import config from './core';

class PlayGround extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const game = new Phaser.Game(
            Object.assign(config, {
                parent: 'playground',
            }),
        );
    }
    render() {
        return <div id="playground"></div>;
    }
}

export default PlayGround;
