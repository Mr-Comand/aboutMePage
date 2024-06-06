const base_spread = 50

let isMousePressed = false;

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('mousedown', function () {
        isMousePressed = true;
    });

    document.addEventListener('mouseup', function () {
        isMousePressed = false;
    });

    document.addEventListener('mousemove', function (e) {
        if (isMousePressed) {
            createSparkle(e);
        }
    });
});



function createSparkle(e) {

    var spread = 50
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + (Math.random() - 0.5) * base_spread + 'px';
    sparkle.style.top = e.pageY + (Math.random() - 0.5) * base_spread + 'px';
    sparkle.style.backgroundColor = generateWhiteWithHintOfColor();
    document.body.appendChild(sparkle);
    setTimeout(function () {
        document.body.removeChild(sparkle);
    }, 1000); // Adjust the duration of the sparkle effect



}


function generateWhiteWithHintOfColor() {
    // Hue: 0-360 (covers all colors)
    const hue = Math.floor(Math.random() * 360);

    // Saturation: Low value for a hint of color
    const saturation = Math.floor(Math.random() * 10) + 50; // 5-15%

    // Lightness: High value for whiteness
    const lightness = Math.floor(Math.random() * 10) + 80; // 90-100%

    // Format the HSL values into a CSS HSL color string
    const colorCode = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return colorCode;
}