let touchMoved = false;
const scale = 0.03
// Function to handle movement
function handleMovement(x, y) {
    const background = document.getElementById('background');
    const bgWidth = background.offsetWidth;
    const bgHeight = background.offsetHeight;
    
    const moveX = (x / window.innerWidth - 0.5) * bgWidth * -1 * scale;
    const moveY = (y / window.innerHeight - 0.5) * bgHeight * -1 * scale;
    background.style.transform = `translate(${moveX}px, ${moveY}px) scale(${(scale+1)})`;
    const middleground = document.getElementById('middleground');
    middleground.style.transform = `translate(${moveX/1.5}px, ${moveY/1.5}px) scale(${(scale/2+1)})`;
    const foreground = document.getElementById('foreground');
    foreground.style.transform = `translate(${moveX/2}px, ${moveY/2}px) scale(${(scale/2+1)})`;
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