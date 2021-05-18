import Phaser from 'phaser';
import Marker from './marker';

export default class PlatformerScene extends Phaser.Scene {
    public marker;
    public maskLayer;

    private pos;
    private tileBlock;

    preload() {
        this.load.image('tiles', 'assets/tilemap/tilesets/0x72-industrial-tileset-32px-extruded.png');
    }

    init() {
        this.marker = null;
    }

    create() {
        const tileWidth = 32;
        const tileHeight = 32;
        this.add
            .grid(0, 0, 1024 * 2, 1024 * 2, 32, 32, 0xffffff)
            .setAltFillStyle(0xf5f5f5)
            .setOutlineStyle();

        let i = 0;
        const maskData = Array.from({ length: 32 }, (n) => Array.from({ length: 32 }, (n) => i++));

        const map = this.make.tilemap({
            data: maskData,
            tileWidth,
            tileHeight,
            width: 16,
            height: 16,
        });

        const tiles = map.addTilesetImage('0x72-industrial-tileset-32px-extruded', 'tiles', 32, 32, 1, 2);
        console.log(tiles.columns, tiles.rows);
        this.maskLayer = map.createStaticLayer(0, tiles);

        this.pos = this.add.text(600, 600, '', {
            font: '18px monospace',
            fill: '#000000',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
        });

        // image.on('pointerover', function () {
        //     this.setTint(0x00ff00);
        // });

        // image.on('pointerout', function () {
        //     this.clearTint();
        // });

        // this.input.setDraggable(image);

        // this.input.on('dragstart', function (pointer, gameObject) {
        //     gameObject.setTint(0xff0000);
        // });

        // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        // });

        // this.input.on('dragend', function (pointer, gameObject) {
        //     gameObject.clearTint();
        // });
        this.tileBlock = this.add.graphics();

        this.marker = new Marker(this);

        let startPoint;
        let endPoint;

        let isSelecting = false;

        this.input.on('pointerdown', (pointer) => {
            this.tileBlock.clear();
            isSelecting = true;
            const tilePos = this.maskLayer.worldToTileXY(pointer.x, pointer.y);
            // const wPoint = this.maskLayer.tileToWorldXY(tilePos.x, tilePos.y);
            startPoint = tilePos;
            this.pos.setText(`x:${tilePos.x}, y:${tilePos.y}`);
            this.drawSelection(tilePos.x * tileWidth, tilePos.y * tileHeight, tileWidth, tileHeight);
        });
        this.input.on('pointermove', (pointer) => {
            const pointerTileXY = this.maskLayer.worldToTileXY(pointer.x, pointer.y);
            const snappedWorldPoint = this.maskLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
            this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            this.marker.setText(pointerTileXY.y * tiles.columns + pointerTileXY.x);
            if (isSelecting) {
                this.tileBlock.clear();
                // this.tileBlock.fillStyle(0xfff000, 0.9);
                const tilePos = this.maskLayer.worldToTileXY(pointer.x, pointer.y);

                endPoint = tilePos;
                // const wPoint = this.maskLayer.tileToWorldXY(tilePos.x, tilePos.y);
                this.pos.setText(`x:${tilePos.x}, y:${tilePos.y}`);
                const x = (startPoint.x < tilePos.x ? startPoint.x : tilePos.x) * tileWidth;
                const y = (startPoint.y < tilePos.y ? startPoint.y : tilePos.y) * tileHeight;
                this.drawSelection(
                    x,
                    y,
                    (Math.abs(startPoint.x - tilePos.x) + 1) * tileWidth,
                    (Math.abs(startPoint.y - tilePos.y) + 1) * tileHeight,
                );
            }
        });
        this.input.on('pointerup', (pointer) => {
            const tilePos = this.maskLayer.worldToTileXY(pointer.x, pointer.y);
            endPoint = tilePos;
            isSelecting = false;
            let data: number[][] = [];
            const { x: x1, y: y1 } = startPoint;
            const { x: x2, y: y2 } = endPoint;
            for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
                let row: number[] = [];
                for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
                    row.push(i + j * tiles.columns);
                }
                data.push(row);
            }
            console.log(data);
        });
    }

    drawSelection(x, y, width, height) {
        this.tileBlock.fillStyle(0x1b3667, 0.4);
        this.tileBlock.lineStyle(1, 0x000000, 1);
        this.tileBlock.fillRect(x, y, width, height);
        this.tileBlock.strokeRect(x, y, width, height);
    }

    update(time, delta) {
        // Convert the mouse position to world position within the camera
        // this.pos.setText(`x:${worldPoint.x}, y:${worldPoint.y}, col:${pointerTileXY.x}, row:${pointerTileXY.y}`)
        // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
        // then tile -> world, we end up with the position of the tile under the pointer
        // const pointerTileXY = groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        // const snappedWorldPoint = groundLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
        // marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
    }
}
