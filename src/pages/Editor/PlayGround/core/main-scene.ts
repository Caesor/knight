import config from './config.json';

export default class MainScene extends Phaser.Scene {
    public layer1;
    private marker;
    private shiftKey;

    preload() {
        this.load.image('tiles', 'assets/tilemap/tilesets/0x72-industrial-tileset-32px-extruded.png');
    }

    create() {
        const tileWidth = 32;
        const tileHeight = 32;

        const map = this.make.tilemap({
            data: new Array(32).fill(new Array(32).fill(-1)),
            tileWidth,
            tileHeight,
            width: 16,
            height: 16,
        });

        const tiles = map.addTilesetImage('industrial', 'tiles', 32, 32, 1, 2);

        this.layer1 = map.createDynamicLayer(0, tiles);
        // const { mainScene, scenes, sprites } = config;
        // for (let id of scenes[mainScene].sprites) {
        //     const { x, y } = sprites[id];

        //     // this.add.sprite(x, y, textures);
        // }
        // this.add.grid(100, 100, 128, 128, 32, 32);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.marker = this.add.graphics();
        this.marker.lineStyle(5, 0xffffff, 1);
        this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
        this.marker.lineStyle(3, 0xff4f78, 1);
        this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

        let state = 0;

        this.input.on('pointerdown', (pointer) => {
            state = 1;
            const tilePos = this.layer1.worldToTileXY(pointer.x, pointer.y);
            const snappedWorldPoint = this.layer1.tileToWorldXY(tilePos.x, tilePos.y);
            // this.layer1.putTileAtWorldXY(4, snappedWorldPoint.x, snappedWorldPoint.y);
            this.layer1.putTilesAt(
                [
                    [65, 66],
                    [97, 98],
                ],
                tilePos.x,
                tilePos.y,
            );
        });
        this.input.on('pointermove', (pointer) => {
            const pointerTileXY = this.layer1.worldToTileXY(pointer.x, pointer.y);
            const snappedWorldPoint = this.layer1.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
            this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            if (state === 1) {
                this.layer1.putTilesAt(
                    [
                        [65, 66],
                        [97, 98],
                    ],
                    pointerTileXY.x,
                    pointerTileXY.y,
                );
            }
        });
        this.input.on('pointerup', (pointer) => {
            state = 0;
        });
    }

    update() {}
}
