class Fallguy {
    constructor() {
        this.img = new Image();
        this.img.src = "./assets/images/fallGuy.png"

        this.imgShadow = new Image();
        this.imgShadow.src = "./assets/images/fallGuyShadow.png"

        this.imgWidth = 250;
        this.imgHeight = 300;
        this.imgWidthHalf = this.imgWidth / 2;
        this.imgHeightHalf = this.imgHeight / 2;

        this.initY = 300;

        this.totalFrame = 14;
        this.curFrame = 0;

        this.fps = 30;
        this.fpsTime = 1000 / this.fps;

        this.isRunning = false;

        this.jumpHeight = 100;
        this.jumpTime = 5;
        this.startJumpingTime = null;
    }

    resize(stageWidth, stageHeight) {
        // 창 크기에 따라 위치를 유동적으로 변경할 수 있도록 합니다.
        if ( (!this.scaleX) && (!this.scaleY) ) {
            this.scaleX = 1;
            this.scaleY = 1;
        } else {
            this.scaleX = stageWidth / this.stageWidth;
            this.scaleY = stageHeight / this.stageHeight;
        }
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = this.x * this.scaleX;
        this.y = this.y * this.scaleY;
    }

    draw(ctx, t) {
        if ( (!this.x) && (!this.y )) {
            this.x = this.stageWidth / 2;
            this.y = this.stageHeight / 2;
        }
        // Animation 변경 
        if (!this.time) {
            // this.time: Prev TimeStamp
            this.time = t; // Check Real Time
            this.timeRunning = t; // Check Running Animation Time
        }

        const now = t - this.timeRunning;
        this.time = t; 

        if ( (now > this.fpsTime) && this.isRunning ) {
            // 기준 프레임마다 애니메이션 변경
            this.timeRunning = t;
            this.curFrame += 1;
            if ( this.curFrame === this.totalFrame ) {
                this.curFrame = 0;
            }
        }

        // Jumping coordinates
        if ( !this.isRunning ) {
            if ( this.startJumpingTime === null ) {
                this.startJumpingTime = t;
            }
            this.currentJumpingTime = (t - this.startJumpingTime);
            console.log(this.currentJumpingTime / 1000);
            if ( this.currentJumpingTime <= 1000) {
                this.y = -this.getPositionY(this.currentJumpingTime);
                // console.log(this.y)
            } else {
                this.y = 0;
                this.isRunning = true;
                this.startJumpingTime = null;
            }

        }
        this.animate(ctx);
    }

    getPositionY(timePassed) {
        let numRad = timePassed /  1000 * Math.PI;
        return Math.sin(numRad) * this.jumpHeight;
    }


    animate(ctx) {
        //Img Shadow
        ctx.save();
        ctx.translate(this.x, 0)
        ctx.drawImage(
            this.imgShadow,
            this.imgWidth * this.curFrame, // X축 기준 Sprite slicing 0이 기준
            0, // Y축 기준 Sprite slicing 0이 기준
            this.imgWidth, // 이미지 자르는 기준차 (W)
            this.imgHeight, // 이미지 자르는 기준치 (H)
            -this.imgWidthHalf,
            this.initY,
            this.imgWidth, // 이미지 폭
            this.imgHeight, // 이미지 높이
        )
        ctx.restore();

        // ImgFallGuy
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame, // X축 기준 Sprite slicing 0이 기준
            0, // Y축 기준 Sprite slicing 0이 기준
            this.imgWidth, // 이미지 자르는 기준차 (W)
            this.imgHeight, // 이미지 자르는 기준치 (H)
            -this.imgWidthHalf,
            this.initY,
            this.imgWidth, // 이미지 폭
            this.imgHeight, // 이미지 높이
        )
        ctx.restore();
    }
}