document.addEventListener("DOMContentLoaded", init);

function init() {
  const linkElement = document.createElement("link");

  // Set the attributes for the link element
  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = "/assets/css/snow.css"; // Replace with the actual path to your CSS file

  // Append the link element to the head of the document
  document.head.appendChild(linkElement);
  const snowContainer = document.createElement("div");
  snowContainer.id="snowflakes";
  document.body.appendChild(snowContainer);
  //const snowContainer = document.getElementById("snowflakes");
  const snowflakeicons = ["❄️"];
  const maxsnowflakes = 20;
  var amout = 0;
  function unregelmaessigeSchwingung(t) {
    // Parameter für die einzelnen Schwingungen
    const amplituden = [1, 0.5, 0.8];
    const frequenzen = [2, 3, 1.5];
    const phasenverschiebungen = [0, Math.PI / 2, Math.PI];

    // Summe der sinusförmigen Schwingungen
    let result = 0;
    for (let i = 0; i < amplituden.length; i++) {
      result +=
        amplituden[i] * Math.sin(frequenzen[i] * t + phasenverschiebungen[i]);
    }

    return result;
  }
  function createSnowflake() {
    if (amout <= maxsnowflakes) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.innerHTML =
        snowflakeicons[Math.floor(Math.random() * snowflakeicons.length)];

      const size = Math.random() * 20 + 10; // Random size between 10 and 30
      snowflake.style.fontSize = `${size}px`;

      const startPosition = Math.random() * window.innerWidth;
      snowflake.style.left = `${startPosition}px`;
      snowflake.style.top = `-20px`;

      snowContainer.appendChild(snowflake);
      amout++;
      animateSnowflake(snowflake);
    }
  }
  function animateSnowflake(snowflake) {
    const speed = Math.random() * 2 + 1; // Zufällige Geschwindigkeit zwischen 1 und 3
    const amplitude = Math.random() * 20 + 10; // Zufällige Amplitude für seitliche Bewegung
    const frequency = Math.random() * 0.1 + 0.05; // Zufällige Frequenz für seitliche Bewegung
    const phase = Math.random() * Math.PI * 2; // Zufällige Phasenverschiebung für seitliche Bewegung

    function moveSnowflake(t) {
      const currentTop = parseFloat(getComputedStyle(snowflake).top);
      const currentLeft = parseFloat(getComputedStyle(snowflake).left);

      snowflake.style.top = `${currentTop + speed}px`;
      snowflake.style.transform = `rotate(${(currentLeft  + speed + currentTop/2)%360}deg)`;
      // Seitliche Bewegung mit unregelmäßiger Schwingung
      const sideToSide = unregelmaessigeSchwingung(t + phase);
      snowflake.style.left = `${currentLeft + sideToSide}px`;

      if (currentTop > window.innerHeight) {
        amout--;
        snowflake.remove();
      } else {
        requestAnimationFrame(function (timestamp) {
          moveSnowflake(timestamp / 1000); // Zeit in Sekunden übergeben
        });
      }
    }

    requestAnimationFrame(function (timestamp) {
      moveSnowflake(timestamp / 1000); // Zeit in Sekunden übergeben
    });
  }

  function createSnowfall() {
    setInterval(createSnowflake, 500); // Create a new snowflake every 500 milliseconds
  }

  createSnowfall();
}
init();