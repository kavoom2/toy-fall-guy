import {
     Wind 
} from "./wind.js";

export class WindController {
    constructor() {
        this.items = [];
        this.cur = 0;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        for ( let i = 0; i < this.items.length; i++ ) {
            this.items[i].resize(stageWidth, stageHeight);
        }
    }

    addWind() {
        this.items.push(
            new Wind(this.stageWidth, this.stageHeight),
        )
    }

    draw(ctx) {
        this.cur += 1;
        if ( this. cur > 15 ) {
            this.cur = 0;
            this.addWind();
        }

        for ( let i = 0; i < this.items.length; i++ ) {
            const item = this.items[i];
            if ( (item.width < 0.001) ) {
                this.items.splice(i, 1);
            } else {
                item.draw(ctx);
            }
        }
    }
}