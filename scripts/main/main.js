// Game initiation
// window.onload = () => {
//     let app = new App();
// }
let app = new App();

function addEventListener() {
// // 특정 상황에서 KeyPressDown이 작동되도록 합니다.
    // document.removeEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
};

const isKeyUp = {
    // 스페이스를 계속 누르고 있어도 점프가 되지 않도록 해야 합니다.
    SPACE: true,
    A: true,
    D: true,
}

function handleKeyDown(event) {
    if ( event.keyCode === key.SPACE && app.fallguy.isJumpable === true && isKeyUp.SPACE ) {
        // Jump
        console.log( "space is pressed")
        app.fallguy.isRunning = false;
        app.fallguy.isJumpable = false;
        isKeyUp.SPACE = false;
    } else if ( event.keyCode === key.A && isKeyUp.D === true ) {
        if ( app.fallguy.isRunning ) {
            app.fallguy.isMovedAxisX = true;
            isKeyUp.A = false;
            console.log("A Down activated")
        }
    } else if ( event.keyCode === key.D && isKeyUp.A === true ) {
        if ( app.fallguy.isRunning ) {
            app.fallguy.isMovedAxisX = true;
            isKeyUp.D = false;
            console.log("D Down activated")
        }
    }
}
function handleKeyUp(event) {
    if ( event.keyCode === key.SPACE ) {
        isKeyUp.SPACE = true;
    } else if ( event.keyCode === key.A && isKeyUp.A === false ) {
        console.log("A Up activated")
        isKeyUp.A = true;
    } else if ( event.keyCode === key.D && isKeyUp.D === false ) {
        console.log("D Up activated")
        isKeyUp.D = true;
    }

addEventListener();
}