import {
    Sky
} from "/scripts/app/sky.js"

import {
    Ground
} from "/scripts/app/ground.js"

import {
    WindController
} from "/scripts/app/wind-controller.js"

import {
    Fallguy
} from "/scripts/app/fallguy.js"

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.resize.bind(this), false);

        this.ground = new Ground();
        this.sky = new Sky(document.body.clientWidth, document.body.clientHeight);
        this.WindController = new WindController();
        this.fallguy = new Fallguy();

        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        // 화면크기에 맞추어 해상도 조절을 한다.
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        // 각 Component에게 화면크기값을 전달한다.
        this.ground.resize(this.stageWidth, this.stageHeight);
        this.sky.resize(this.stageWidth, this.stageHeight);
        this.WindController.resize(this.stageWidth, this.stageHeight);
        this.fallguy.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        // 애니메이션을 재귀호출로 수행한다.
        let requestID = requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        // Component를 Canvas상에 그린다. (나중에 생성된 객체가 더 앞에 배치된다.)

        this.sky.draw(this.ctx, t)
        this.WindController.draw(this.ctx);
        this.ground.draw(this.ctx, t)
        this.fallguy.draw(this.ctx, t);
    }
}

// 페이지가 로드되면 자동으로 실행되도록 한다.
window.onload = () => {
    new App();
}