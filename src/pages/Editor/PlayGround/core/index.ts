import Phaser from 'phaser';
import MainScene from './main-scene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#eee',
    // parent: 'game-container',
    scene: MainScene,
    pixelArt: true,
    physics: { default: 'matter' },
    plugins: {
        // scene: [
        //     {
        //         plugin: PhaserMatterCollisionPlugin, // The plugin class
        //         key: 'matterCollision', // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        //         mapping: 'matterCollision', // Where to store in the Scene, e.g. scene.matterCollision
        //     },
        // ],
    },
};

export default config;
// const game = new Phaser.Game(config);
