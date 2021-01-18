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



// Event Handler - Key Pressed
function handleKeyDown(event) {
    console.log(`${event.keyCode}, ${app.fallguy.multiplierA} ${app.fallguy.multiplierD}`);
    if ( event.keyCode === key.SPACE && app.fallguy.isJumpable === true && isKeyUp.SPACE ) {
        // Jump
        app.fallguy.isRunning = false;
        app.fallguy.isJumpable = false;
        isKeyUp.SPACE = false;
    } else if ( event.keyCode === key.A ) {
        if ( app.fallguy.isRunning ) {
            app.fallguy.isMovableAxisX = true;
            app.fallguy.getMultiplierKeyDown(key.A)
            isKeyUp.A = false;
        }
    } else if ( event.keyCode === key.D ) {
        if ( app.fallguy.isRunning ) {
            app.fallguy.isMovableAxisX = true;
            app.fallguy.getMultiplierKeyDown(key.D);
            isKeyUp.D = false;
        }
    }
}
function handleKeyUp(event) {
    if ( event.keyCode === key.SPACE ) {
        isKeyUp.SPACE = true;
    } else if ( event.keyCode === key.A ) {
        app.fallguy.getMultiplierKeyUp(key.A)
        isKeyUp.A = true;
    } else if ( event.keyCode === key.D ) {
        app.fallguy.getMultiplierKeyUp(key.D);
        isKeyUp.D = true;
    }

addEventListener();
}