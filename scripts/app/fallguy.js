class Fallguy {
    constructor(stageHeight) {
        // Image variables
        this.img = new Image();
        this.img.src = "./assets/images/fallGuy.png"
        this.imgShadow = new Image();
        this.imgShadow.src = "./assets/images/fallGuyShadow.png"
        this.imgWidth = 250;
        this.imgHeight = 300;
        this.multiplier = 0;
        this.imgWidthHalf = this.imgWidth / 2;
        this.imgHeightHalf = this.imgHeight / 2;

        // start Y location
        this.initY = 0.29 * (stageHeight);

        // fps Animation variables
        this.totalFrame = 14;
        this.curFrame = 0;
        this.fps = 30;
        this.fpsTime = 1000 / this.fps;

        // Action - Movement variables 
        this.startMovingTime = null;
        this.isRunning = true;
        this.movementSpeed = 8;
        this.isMovableAxisX = false; // only W and A
        this.coordinateX = 0;

        // Action - Jump variables
        this.isJumpable = true; // jump interval time
        this.jumpHeight = 100;
        this.jumpTime = 4.5;
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
        // initial Coordinates configuration
        if ( (!this.x) && (!this.y )) {
            this.x = this.stageWidth / 2;
            this.y = 0;
        }

        //  Play Animation
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

        // Action: Jump
        if ( !this.isRunning ) {
            if ( this.startJumpingTime === null ) {
                this.startJumpingTime = t;
            }
            this.currentJumpingTime = (t - this.startJumpingTime);
            if ( this.currentJumpingTime <= 1100) {
                this.y = -this.getPositionY(this.currentJumpingTime);
            } else {
                this.y = 0;
                this.isRunning = true;
                this.startJumpingTime = null;
                setTimeout(() => {
                    this.isJumpable = true;
                }, 350);
            }
        }


        // Action: Axis X Movement
        if ( this.isMovableAxisX ) {
            if ( this.startMovingTime === null ) {
                this.startMovingTime = t;
            }
            this.currentMovingTime = t;
            if ( this.currentMovingTime - this.startMovingTime >= (1000 / 60) ) {
                this.startMovingTime = this.currentMovingTime;
                // A, D를 모두 누르거나 땠을 경우 서서히 멈추도록 합니다.
                if ( (isKeyUp.A === true && isKeyUp.D === true)) {
                    if ( this.coordinateX > 0 ) {
                        this.multiplier = -1;
                    } else if (this.coordinateX < 0 ) {
                        this.multiplier = 1;
                    } else {
                        this.multiplier = 0;
                    }
                }
                // 사인함수에 넣을 인자를 결정합니다.
                this.coordinateX = this.coordinateX + (this.multiplier + this.multiplierA + this.multiplierD) / 15;
                if ( this.coordinateX > 1 ) {
                    this.coordinateX = 1;
                } else if ( this.coordinateX < -1 ) {
                    this.coordinateX = -1;
                } else if ( isKeyUp.A === true && isKeyUp.D === true ) {
                    // 종료조건
                    this.multiplier = 0;
                    if ( Math.floor(Math.abs(this.coordinateX * 10)) === 0 ) {
                        this.multiplier = 0;
                        this.isMovableAxisX = false;
                    }
                }
                // 이동값을 계산합니다.
                this.dx = this.getPositionX(this.coordinateX);
                if ( this.isBlocked(this.x, this.dx) ) {
                    this.x += this.dx;
                }
            }
        }
        
        // Animate all Animations
        this.animate(ctx);
    }
    getMultiplierKeyDown(eventKey) {
        if( eventKey === key.A ) {
            this.multiplierA = -1;
            this.multiplierD = 0;
        }
        else if ( eventKey === key.D ) {
            this.multiplierD = 1;
            this.multiplierA = 0;
        }
    }
    getMultiplierKeyUp(eventKey) {
        if( eventKey === key.A ) {
            this.multiplierA = 0;
        }
        else if ( eventKey === key.D ) {
            this.multiplierD = 0;
        }
    }

    getPositionY(timePassed) {
        let numRad = timePassed /  1100 * Math.PI;
        return Math.sin(numRad) * this.jumpHeight;
    }

    getPositionX(num) {
        let numRadian = num * Math.PI / 2;
        return Math.sin(numRadian) * this.movementSpeed;
    }

    isBlocked(x, dx) {
        let newX = x + dx;
        if ((newX - this.imgWidthHalf) > 0 && (newX + this.imgWidthHalf < this.stageWidth ) ) {
            return true;
        } else {
            return false;
        }
    }

    isEvadableFloorObject(y) {
        // 공중에 떠있을 때 바닥의 장애물을 피할 수 있도록 합니다.
        // isRunning과는 높이값이 달라야 합니다.

    }


    animate(ctx) {
        //Img Shadow
        ctx.save();
        ctx.translate(this.x, 0);
        ctx.drawImage(
            this.imgShadow,
            this.imgWidth * this.curFrame, // X축 기준 Sprite slicing 0이 기준
            0, // Y축 기준 Sprite slicing 0이 기준
            this.imgWidth, // 이미지 자르는 기준차 (W)
            this.imgHeight, // 이미지 자르는 기준치 (H)
            -this.imgWidthHalf,
            this.initY * 1.05,
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