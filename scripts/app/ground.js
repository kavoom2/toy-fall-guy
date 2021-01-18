class Ground {
    constructor(stageWidth, stageHeight) {
        this.items = [];
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        // Control Point
        this.controlValue = 50;
        this.controlPoint = {
            x: this.stageWidth / 2, 
            y: this.stageHeight / 2 - this.controlValue,
        }
        this.firstBlockColor = "#ffca4e";
        this.firstBlockRemoved = false;
        this.topP0 = {x: 0, y: this.stageHeight / 2};
        this.topP4 = {x: this.stageWidth, y: this.stageHeight / 2};
        this.topP1 = this.findCoordinates(this.topP0, this.controlPoint, this.topP4, 0.25);
        this.topP2 = this.findCoordinates(this.topP0, this.controlPoint, this.topP4, 0.50);
        this.topP3 = this.findCoordinates(this.topP0, this.controlPoint, this.topP4, 0.75); 
        this.addNewLine();
    }

    resize(stageWidth, stageHeight) {
        // 화면크기값을 전달받는다
        this.scaleX = stageWidth / this.stageWidth;
        this.scaleY = stageHeight / this.stageHeight;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        // Resize Control Point
        this.controlValue *= this.scaleY;
        this.controlPoint.x *= this.scaleX;
        this.controlPoint.y *= this.scaleY;                                        
    }

    addNewLine(stageWidth, stageHeight, controlPoint) {
        const item = new GroundLine(this.stageWidth, this.stageHeight, this.controlPoint);
        this.items.push(item);
    }

    findCoordinates(p1, cp, p2, t) {
        const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cp.x + t * t * p2.x;
        const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cp.y + t * t * p2.y;
        return {
            x: x,
            y: y,
        }
    }

    getRandomColor() {
        const randomDice = Math.ceil(Math.random() * 4)
        if ( randomDice === 1) {
            // Orange
            return "#ffca4e"
        } else if ( randomDice === 2) {
            // light Green
            return "#b0cf5c"
        } else if ( randomDice === 3) {
            // Red
            return "#f44e53"
        } else {
            // teal
            return "#61d09c"
        }
    }

    getLineColor (blockColor) {
        if ( blockColor === "#ffca4e") {
            // Orange
            return "#99792e"
        } else if ( blockColor === "#b0cf5c") {
            // light Green
            return "#697c37"
        } else if ( blockColor === "#f44e53") {
            // Red
            return "#922e31"
        } else {
            // teal
            return "#3a7c5d"
        }
    }

    draw(ctx, t) {
        // Make Ground
        ctx.fillStyle = "#ffca4e";
        ctx.beginPath();
        ctx.moveTo(this.topP0.x, this.topP0.y);
        ctx.lineTo(this.topP1.x, this.topP1.y);
        ctx.lineTo(this.topP2.x, this.topP2.y);
        ctx.lineTo(this.topP3.x, this.topP3.y);
        ctx.lineTo(this.topP4.x, this.topP4.y);
        // ctx.quadraticCurveTo(this.stageWidth / 2, this.stageHeight / 2 - this.controlValue, this.stageWidth, this.stageHeight / 2);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(0, this.stageHeight)
        ctx.fill();

        // Make Colored Block
        // Case.1 initial Block
        if ( this.items.length === 1) {
            const groundLine = this.items[0];
            ctx.beginPath()
            let prevX = groundLine.curPoint[0].x;
            let prevY = groundLine.curPoint[0].y
            ctx.moveTo(prevX, prevY);
            for ( let i = 1; i < groundLine.curPoint.length; i++ ) {
                const curX = groundLine.curPoint[i].x;
                const curY = groundLine.curPoint[i].y;
                ctx.lineTo(curX, curY)
            }
            ctx.lineTo(this.stageWidth, this.stageHeight);
            ctx.lineTo(0, this.stageHeight);
            if ( groundLine.blockColor === null ) {
                groundLine.blockColor = this.getRandomColor();
            }
            ctx.fillStyle = groundLine.blockColor;
            ctx.fill();
        }
        // Case.2
        else {
            if ( this.firstBlockRemoved ) {
                // Initial Block Colored
                const groundLine = this.items[0];
                ctx.beginPath();
                ctx.moveTo(this.topP4.x, this.topP4.y);
                ctx.lineTo(this.topP3.x, this.topP3.y);
                ctx.lineTo(this.topP2.x, this.topP2.y);
                ctx.lineTo(this.topP1.x, this.topP1.y);
                ctx.lineTo(this.topP0.x, this.topP0.y);
                for ( let i = 0; i < groundLine.curPoint.length; i++ ) {
                    const curX = groundLine.curPoint[i].x;
                    const curY = groundLine.curPoint[i].y;
                    ctx.lineTo(curX, curY)
                }
                ctx.fillStyle = this.firstBlockColor;
                ctx.fill();
            }
            // Else Block Colored
            for ( let i = 1; i < this.items.length - 1; i++ ) {
                const curGroundLine = this.items[i];
                const nextGroundLine = this.items[i + 1];
                let prevX = curGroundLine.curPoint[0].x;
                let prevY = curGroundLine.curPoint[0].y
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                for ( let i = 0; i < curGroundLine.curPoint.length; i++ ) {
                    const curX = curGroundLine.curPoint[i].x;
                    const curY = curGroundLine.curPoint[i].y;
                    ctx.lineTo(curX, curY)
                }
                for ( let i = nextGroundLine.curPoint.length - 1; i >= 0; i-- ) {
                    const curX = nextGroundLine.curPoint[i].x;
                    const curY = nextGroundLine.curPoint[i].y;
                    ctx.lineTo(curX, curY)
                }
                if ( curGroundLine.blockColor === null ) {
                    curGroundLine.blockColor = this.getRandomColor();
                }
                ctx.fillStyle = curGroundLine.blockColor;
                ctx.fill();

                if ( !nextGroundLine.colorChanged ) {
                    nextGroundLine.color = this.getLineColor(curGroundLine.blockColor);
                    nextGroundLine.colorChanged = true;
                }
            }
            // Final Line
            const groundLine = this.items[this.items.length - 1];
            ctx.beginPath()
            let prevX = groundLine.curPoint[0].x;
            let prevY = groundLine.curPoint[0].y
            ctx.moveTo(prevX, prevY);
            for ( let i = 1; i < groundLine.curPoint.length; i++ ) {
                const curX = groundLine.curPoint[i].x;
                const curY = groundLine.curPoint[i].y;
                ctx.lineTo(curX, curY)
            }
            ctx.lineTo(this.stageWidth, this.stageHeight);
            ctx.lineTo(0, this.stageHeight);
            if ( groundLine.blockColor === null ) {
                groundLine.blockColor = this.getRandomColor();
            }
            ctx.fillStyle = groundLine.blockColor;
            ctx.fill();
        }

        // Line Controller
        if ( !this.time ) {
            this.time = t;
        }
        const now = t - this.time;
        if ( now > 1000 ) {
            this.time = t;
            // 1. Move Coordinates
            if ( this.items.length < 12 ) {
                this.addNewLine();
            }
        }
        for (let i = 1; i < this.items.length; i++ ) {
            if ( this.items[i].curPoint[2].y <= this.items[i].endPoint[2].y) {
                // 마지막 Block Color Save
                this.firstBlockColor = this.items[i].blockColor;
                this.items.splice(i, 1);
                if ( !this.firstBlockRemoved ) {
                    this.firstBlockRemoved = true;
                }
            } else {
                this.items[i].draw(ctx, t);
            }
        }
    }
}