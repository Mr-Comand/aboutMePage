let touchMoved = false;

// Function to handle movement
function handleMovement(x, y) {
    const background = document.getElementById('background');
    const bgWidth = background.offsetWidth;
    const bgHeight = background.offsetHeight;
    const moveX = (x / window.innerWidth - 0.5) * bgWidth * -0.01;
    const moveY = (y / window.innerHeight - 0.5) * bgHeight * -0.01;
    background.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.01)`;
}

// Mouse move event listener
document.addEventListener("mousemove", function(e) {
    handleMovement(e.clientX, e.clientY);
});

// Touch move event listener
document.addEventListener("touchmove", function(e) {
    const touch = e.touches[0];
    if (touch) {
        handleMovement(touch.clientX, touch.clientY);
        touchMoved = true;
    }
});

// If touch ends without any movement, trigger movement with the last touch position
document.addEventListener("touchend", function(e) {
    if (!touchMoved) {
        const lastTouch = e.changedTouches[0];
        if (lastTouch) {
            handleMovement(lastTouch.clientX, lastTouch.clientY);
        }
    }
    touchMoved = false;
});