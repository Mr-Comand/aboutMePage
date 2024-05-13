const base_spread = 50
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('mousemove', function (e) {

        var spread = 50
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.pageX + (Math.random() - 0.5) * base_spread + 'px';
        sparkle.style.top = e.pageY + (Math.random() - 0.5) * base_spread + 'px';
        document.body.appendChild(sparkle);
        setTimeout(function () {
            document.body.removeChild(sparkle);
        }, 1000); // Adjust the duration of the sparkle effect



    });
});