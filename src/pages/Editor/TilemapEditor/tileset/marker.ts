import Phaser from 'phaser';

export default class Marker extends Phaser.GameObjects.Container {
    private outline;
    private tileId;

    constructor(scene, x = 0, y = 0, children = []) {
        super(scene, x, y, children);

        scene.add.existing(this);

        this.outline = scene.add.graphics();
        this.outline.lineStyle(2, 0x000000, 1);
        this.outline.strokeRect(0, 0, 32, 32);

        this.tileId = scene.add.text(1, 1, '0', {
            font: '12px monospace',
            fill: '#000000',
        });

        this.add(this.outline);
        this.add(this.tileId);
    }

    setText(str) {
        this.tileId.setText(str);
    }
}
