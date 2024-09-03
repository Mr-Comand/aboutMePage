// Function to get URL parameter value
function getURLParameter(name) {
    const regex = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)', 'i');
    const match = regex.exec(window.location.search);
    return match ? decodeURIComponent(match[1]) : null;
}
if (!getURLParameter('disableLinks')) {
    // Get all anchor elements in the document
    var allLinks = document.getElementsByClassName('link');

    // Iterate over each anchor element
    for (var i = 0; i < allLinks.length; i++) {
        // Attach mousedown event listener to the anchor element
        allLinks[i].addEventListener("mouseup", function (event) {
            // Start the press timer
            if ((new Date().getTime() - clickTime) < 100) {
                window.location.href = this.getAttribute("target");
            }
        });
    }
}