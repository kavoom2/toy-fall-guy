export class Wind {
    constructor(stageWidth, stageHeight) {
        this.x;
        this.y;
        this.width;
        this.height;
        this.speedRate;
        [this.scaleX, this.scaleY] = [1, 1];
        [this.stageWidth, this.stageHeight] = [stageWidth, stageHeight];
        [this.endX, this.endY] = [(stageWidth / 2), (stageHeight / 2 -20)]

        this.setRandomPosition(stageWidth, stageHeight);
        this.setRandomSize()
        this.TravelSpeedRate = this.setTravelDistance(this.x, this.y, this.endX,this.endY) / stageHeight * 2;
        this.angleRad = this.setAngleRad(this.x, this.y, this.endX, this.endY);
        this.rotateRad = -this.angleRad;
        this.speed =  this.setSpeed(this.x, this.angleRad);
    }

    resize(stageWidth, stageHeight) {
        // 창 크기에 따라 위치를 유동적으로 변경할 수 있도록 합니다.

        this.scaleX = stageWidth / this.stageWidth;
        this.scaleY = stageHeight / this.stageHeight;


        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        if ( this.scaleX !== 1) {
            this.x *= this.scaleX;
            this.endX *= this.scaleX;
            this.speed.vx *= this.scaleX;
        }
        if ( this.scaleY !== 1) {
            this.y *= this.scaleY;
            this.endY *= this.scaleY;
            this.speed.vy *= this.scaleY;
        }
    }
    setRandomSize() {
        this.height = (Math.random() * 500 + 500) * this.scaleX;
        this.width = (Math.random() * 10 + 30) * this.scaleY;
        this.speedRate = 4.5 * this.scaleY;
    }

    setTravelDistance(x1, y1, x2, y2) {
        return Math.sqrt(((y2 - y1)*(y2 - y1) + (x2-x1)*(x2-x1)));
    }

    setRandomPosition(stageWidth, stageHeight) {
        const tempNum = Math.floor(Math.random() * 3);
        if ( tempNum === 1 ) {
            this.x = Math.random() * stageWidth;
            this.y = 0;
        } else if ( tempNum === 2 ) {
            this.x = 0;
            this.y = Math.random() * stageHeight / 2 - 50
        } else {
            this.x = stageWidth;
            this.y = Math.random() * stageHeight / 2 - 50
        }
        this.speed = Math.floor(Math.random() * 5 + 2) * this.scaleX;
    }

    draw(ctx) {
        this.x += this.speed.vx;
        this.y += this.speed.vy;

        this.width /= 1.05;
        this.speed.vx /= 1.08;
        this.speed.vy /= 1.08;
        // this.rotateRad += this.vRad;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotateRad);
        ctx.fillStyle = "#defbfe";
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height)
        ctx.restore();
    }


    setAngleRad(x1, y1, x2, y2) {
        const dx = y2 - y1;
        const dy = x2 - x1;
        return Math.atan2(dy, dx);
    }

    setSpeed(x1, angleRad) {
        const vx = Math.sin(angleRad) * this.speed;
        const vy = Math.cos(angleRad) * this.speed;
        return {
            vx: vx * this.speedRate * this.TravelSpeedRate,
            vy: vy * this.speedRate * this.TravelSpeedRate,
        }
    }
    
}