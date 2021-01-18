class Sky {
    constructor(stageWidth, stageHeight) {
        this.items = [];
        this.items.push(new SkyLine(stageWidth, stageHeight, 0, 0));
        this.items.push(new SkyLine(stageWidth, stageHeight, stageWidth, 0));;
        console.log(this.items)
        this.fps = 24;
        this.fpsTime = 1000 / 24;
    }

    resize(stageWidth, stageHeight) {
        // 화면크기값을 전달받는다
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        for ( let i = 0; i < this.items.length; i++ ) {
            this.items[i].resize(stageWidth, stageHeight);
        }
    }

    draw(ctx, t) {
        // fps Check
        if ( !this.time ) {
            this.time = t;
        }
        this.curTime = (t - this.time);

        // Draw Sky
        ctx.fillStyle = "#4cc5fe";
        ctx.beginPath();

        ctx.moveTo(0, 0);
        ctx.lineTo(this.stageWidth, 0);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(0, this.stageHeight);
        ctx.fill();

        for ( let i = 0; i < this.items.length; i++ ) {
            this.items[i].draw(ctx, this.curTime);
        }
    }

    getPositionY(timePassed) {
        let numRad = timePassed /  1000 * Math.PI;
        return Math.abs(Math.sin(numRad));
    }

}