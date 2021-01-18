// Game initiation
// window.onload = () => {
//     let app = new App();
// }
let app = new App();

function addEventListener() {
// // 특정 상황에서 KeyPressDown이 작동되도록 합니다.
    // document.removeEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", handleKeyPress);
};
function handleKeyPress(event) {
    console.log("pressed")
    if ( event.keyCode === key.SPACE ) {
        // Jump
        console.log( "space is pressed")
        app.fallguy.isRunning = false;
    } else if ( event.keyCode === key.A || event.keyCode === key.D ) {
        if ( app.fallguy.isRunning ) {

        }
    }
}
addEventListener();