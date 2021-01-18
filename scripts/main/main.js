// Game initiation
window.onload = () => {
    let app = new App();
}



// Press Key down
// function addEventListener() {
// // 특정 상황에서 KeyPressDown이 작동되도록 합니다.
//     document.removeEventListener("keydown", handleKeyPress);
//     document.addEventListener("keydown", handleKeyPress);
// };
function handleEventKeyPress(event) {
    if ( event.keyCode === key.Sapce ) {
        // Jump
        app.fallguy.isRunning = false;
    } else if ( event.keyCode === key.A || event.keyCode === key.D ) {
        if ( app.fallguy.isRunning ) {

        }
    }
}