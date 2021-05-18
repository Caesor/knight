import * as React from 'react';
import Pane from 'components/Pane';

import Phaser from 'phaser';
import scene from './tileset/scene';

import './index.scss';

type IProps = {};

type IState = {
    tileSetContainer: Phaser.Game;
};

export default class TilemapEditor extends React.Component<{}, IState> {
    public tileSetContainer;

    componentDidMount() {
        this.tileSetContainer = new Phaser.Game({
            type: Phaser.AUTO,
            width: 1088,
            height: 1088,
            parent: 'tileset',
            // pixelArt: true,
            backgroundColor: '#eee',
            scene: scene,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1000 },
                },
            },
        });
    }
    render() {
        return (
            <Pane title="瓦片地图编辑器">
                <div className="tilemapEditor-tool_container"></div>
                <div id="tileset" className="tilemapEditor-tile_set"></div>
            </Pane>
        );
    }
}
