class SkyLine {
    constructor(stageWidth, stageHeight, x, y) {
        [this.stageWidth, this.stageHeight] = [stageWidth, stageHeight];
        [this.x1, this.y1] = [x, y];
        [this.x2, this.y2, this.x4, this.y4] = this.setInitPosition(x, stageWidth, stageHeight);
        [this.x3, this.y3] = [stageWidth / 2, stageHeight / 2];

    }
    resize(stageWidth, stageHeight) {
        this.scaleX = stageWidth / this.stageWidth;
        this.scaleY = stageHeight / this.stageHeight;

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        if ( this.scaleX !== 1 ) {
            this.x1 *= this.scaleX;
            this.x2 *= this.scaleX;
            this.x3 *= this.scaleX;
            this.x4 *= this.scaleX;
        }

        if (this.scaleY !== 1 ) {
            this.y1 *= this.scaleY;
            this.y2 *= this.scaleY;
            this.y3 *= this.scaleY;
            this.y4 *= this.scaleY;
        }

    }

    draw(ctx, curTime) {
        ctx.fillStyle = "#64ceff";
        ctx.beginPath();

        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.lineTo(this.x4, this.y4);
        ctx.fill();
    }

    setInitPosition(x1, stageWidth, stageHeight) {
        let x2;
        let y2;
        let x4;
        let y4;
        if ( x1 < stageWidth / 2 ) {
            x2 = stageWidth / 5;
            y2 = 0;
            x4 = 0;
            y4 = stageHeight * 2 / 6;
        } else {
            x2 = stageWidth * 6 / 7;
            y2 = 0
            x4 = stageWidth;
            y4 = stageHeight / 4
        }

        return [x2, y2, x4, y4];
    }
}