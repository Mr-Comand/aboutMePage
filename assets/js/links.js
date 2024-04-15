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