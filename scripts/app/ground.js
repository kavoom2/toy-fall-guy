export class Ground {
    constructor() {
    }

    resize(stageWidth, stageHeight) {
        // 화면크기값을 전달받는다
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    draw(ctx) {
        ctx.fillStyle = "#fee388";
        ctx.beginPath();

        ctx.moveTo(0, this.stageHeight / 2);
        ctx.quadraticCurveTo(this.stageWidth / 2, this.stageHeight / 2 - 50, this.stageWidth, this.stageHeight / 2);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(0, this.stageHeight)
        ctx.fill();
    }
}