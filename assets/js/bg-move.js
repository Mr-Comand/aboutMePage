document.addEventListener("mousemove", function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const background = document.getElementById('background');
    const bgWidth = background.offsetWidth;
    const bgHeight = background.offsetHeight;
    const moveX = (mouseX / window.innerWidth - 0.5) * bgWidth * -0.01;
    const moveY = (mouseY / window.innerHeight - 0.5) * bgHeight * -0.01;
    background.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.01)`;
});