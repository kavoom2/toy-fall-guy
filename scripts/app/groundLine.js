class GroundLine {
    constructor(stageWidth, stageHeight, controlPoint) {
        // Variables for Resizing
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.fps = 60;
        this.fpsTime = 1000 / this.fps;
        // Points
        this.cp = controlPoint;
        this.endP0 = {
            x: 0,
            y: this.stageHeight / 2,
        }
        this.endP4 = {x: this.stageWidth,
            y: this.stageHeight / 2,
        }
        this.endP1 = this.findCoordinates(this.endP0, this.cp, this.endP4, 0.25);
        this.endP2 = this.findCoordinates(this.endP0, this.cp, this.endP4, 0.50);
        this.endP3 = this.findCoordinates(this.endP0, this.cp, this.endP4, 0.75);
        // Array - endPoint
        this.endPoint = [
            this.endP0,
            this.endP1,
            this.endP2,
            this.endP3,
            this.endP4,
        ]
        // Array - MaxTravelDistance
        this.maxTravelDistance = [
            (this.stageHeight - this.endP0.y),
            (this.stageHeight - this.endP1.y),
            (this.stageHeight - this.endP2.y),
            (this.stageHeight - this.endP3.y),
            (this.stageHeight - this.endP4.y)
        ]
        // Array - Current Point
        this.curPoint = [
            {x: this.endP0.x, y: stageHeight},
            {x: this.endP1.x, y: stageHeight},
            {x: this.endP2.x, y: stageHeight},
            {x: this.endP3.x, y: stageHeight},
            {x: this.endP4.x, y: stageHeight},
        ]
        // Settings
        this.lineWidth = 15;
        this.color = "#99792e";
        this.colorChanged = false;
        this.speed = 1;
        this.blockColor = null;
    }


    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

    }

    draw(ctx, t) {
        if ( !this.time ) {
            this.time = t;
        }
        const now = t - this.time;
        if ( now > this.fpsTime ) {
            this.time = t;
            // 1. Move Coordinates
            this.speed *= 0.983;
            this.lineWidth *= 0.98;
            for ( let i = 0; i < this.curPoint.length; i++ ) {
                this.curPoint[i].y -= (this.maxTravelDistance[i] / 50) * this.speed;
            }
        }
    
        // 2. Draw - Set a starting point
        ctx.beginPath();
        let prevX = this.curPoint[0].x
        let prevY = this.curPoint[0].y

        // 2. Draw - Draw A Quadratic Lines
        ctx.moveTo(prevX, prevY);
        for ( let i = 1; i < this.curPoint.length; i++ ) {
            const curX = this.curPoint[i].x;
            const curY = this.curPoint[i].y;
            const cpX = (prevX + curX) / 2;
            const cpY = (prevY + curY) / 2;
            ctx.quadraticCurveTo(cpX, cpY, curX, curY)
            prevX = curX;
            prevY = curY;
        }
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    // Find coordinates on a bezier curve
    // t = 0.5; // given example value                  
    // x = (1 - t) * (1 - t) * p[0].x + 2 * (1 - t) * t * p[1].x + t * t * p[2].x;
    // y = (1 - t) * (1 - t) * p[0].y + 2 * (1 - t) * t * p[1].y + t * t * p[2].y;
    // p[0] is the start point, p[1] is the control point, and p[2] is the end point. t is the parameter, which goes from 0 to 1.
    findCoordinates(p1, cp, p2, t) {
        const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cp.x + t * t * p2.x;
        const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cp.y + t * t * p2.y;
        return {
            x: x,
            y: y,
        }
    }
    
}