
        // Function to apply the shake animation to a given element
        function shakeElement(element) {
            element.style.animationName = 'shake'; // Apply the shake animation
            element.style.animationDuration = Math.random()+"s";
        }

        // Function to stop the shake animation on a given element
        function stopShake(element) {
            element.style.animationName = ''; // Remove the shake animation
        }

        // Function to randomly select an element and shake it
        function shakeRandomElement(iterations, duration) {
            // Get all elements with the 'box' class
            const boxes = document.querySelectorAll('.content');

            // Choose a random element from the list of boxes
            const randomIndex = Math.floor(Math.random() * boxes.length);
            const randomBox = boxes[randomIndex];

            // Apply the shake animation to the randomly selected element
            shakeElement(randomBox);

            // Stop the shake animation after the specified duration
            setTimeout(() => {
                stopShake(randomBox);
            }, duration);

            // Repeat the process for the specified number of iterations
            iterations--;
            if (iterations > 0) {
                // Choose a random time interval for the next shake (between 1 and 5 seconds)
                const interval = Math.random() * 4000 + 1000; // Adjust the range as needed

                // Schedule the next shake after the random interval
                setTimeout(() => {
                    shakeRandomElement(iterations, duration);
                }, interval);
            }
        }

        // Start the shaking animation with 5 iterations and a duration of 2 seconds per iteration
        shakeRandomElement(5, 2000);
