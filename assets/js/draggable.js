var sunX = 0.4 * window.innerWidth;
var sunY = 0.7 * window.innerHeight;
var shadowDistance = 15;

var clickTime = undefined;
var movingObjekt = undefined;

var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
window.addEventListener("resize", onWindowResize)
function onWindowResize(){
  viewportWidth  = window.innerWidth || document.documentElement.clientWidth;
  viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  for (var elementId in moveableObjects) {
    moveToValidPosition(elementId);
  }
  sunX = 0.4 * window.innerWidth;
  sunY = 0.7 * window.innerHeight;
  updatePositions()
}
// Make the content draggable
var draggableElements = document.getElementsByClassName("draggable");
var moveableObjects = {};

for (var i = 0; i < draggableElements.length; i++) {
  var elementId = draggableElements[i].id;
  var elementInfo = {
    elementObject: draggableElements[i],
    xOffset: 0,
    yOffset: 0,
    position: {
      left: 0,
      top: 0,
    },
    z_index: 1,
  };

  // Store the information in the mapped object with the element ID as the key
  moveableObjects[elementId] = elementInfo;
}

// Check if position is saved in localStorage
var storedPosition = localStorage.getItem("contentPosition");
if (storedPosition) {
  var storedObject = JSON.parse(storedPosition);
  for (var elementId in moveableObjects) {
    if (storedObject.hasOwnProperty(elementId)) {
      moveableObjects[elementId].position = storedObject[elementId].position;
      if (
        isElementOutsideViewport(moveableObjects[elementId].elementObject, true)
      ) {
        moveToValidPosition(elementId);
      }
    }
  }
} else {
  for (var elementId in moveableObjects) {
    moveToRandomPosition(elementId);
  }
}

for (var elementId in moveableObjects) {
  if (moveableObjects.hasOwnProperty(elementId)) {
    var element = moveableObjects[elementId].elementObject;

    // Attach mousedown event listener to the element
    element.addEventListener("touchstart", onMouseUp);
    element.addEventListener("mousedown", onMouseUp);
    function onMouseUp(e) {
      e.preventDefault();
      clickTime = new Date().getTime();
      movingObjekt = this.id;
      bringToFront(movingObjekt);
      var offsetX =
        (e.clientX || e.touches[0].clientX) - this.getBoundingClientRect().left;
      var offsetY =
        (e.clientY || e.touches[0].clientY) - this.getBoundingClientRect().top;
      moveableObjects[movingObjekt].elementObject.classList.add("dragging");
      // Store offsetX and offsetY in the elementInfo
      moveableObjects[movingObjekt].offsetX = offsetX;
      moveableObjects[movingObjekt].offsetY = offsetY;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", onMouseUp);
      function onMouseMove(e) {
        console.log(movingObjekt);
        var x =
          (e.clientX || e.touches[0].clientX) -
          moveableObjects[movingObjekt].offsetX;
        var y =
          (e.clientY || e.touches[0].clientY) -
          moveableObjects[movingObjekt].offsetY;
        moveableObjects[movingObjekt].position.left = x;
        moveableObjects[movingObjekt].position.top = y;
        updatePositions(); // Update positions of all elements
      }
      function onTouchMove(e) {
        var touch = e.touches[0]; // Get the first touch (assuming single touch)
        console.log(movingObjekt, touch.clientX);
        var x = touch.clientX - moveableObjects[movingObjekt].offsetX;
        var y = touch.clientY - moveableObjects[movingObjekt].offsetY;
        moveableObjects[movingObjekt].position.left = x;
        moveableObjects[movingObjekt].position.top = y;
        updatePositions(); // Update positions of all elements
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onMouseUp);
        movingObjekt = undefined;
        moveableObjects[movingObjekt].elementObject.classList.remove(
          "dragging"
        );
        localStorage.setItem(
          "contentPosition",
          JSON.stringify(moveableObjects)
        );
      }
    }
  }
}

function updatePositions(ignoreValidity = false) {
  // Loop through each element in the mappedObject
  for (var elementId in moveableObjects) {
    if (moveableObjects.hasOwnProperty(elementId)) {
      var elementInfo = moveableObjects[elementId];
      var element = elementInfo.elementObject;
      var oldPositions = [element.style.left, element.style.top];
      // Update the left and top positions of the element
      element.style.left = elementInfo.position.left + "px";
      element.style.top = elementInfo.position.top + "px";

      if (isElementOutsideViewport(element, true) && !ignoreValidity) {
        moveToValidPosition(elementId);
      }
      element.style.left = elementInfo.position.left + "px";
      element.style.top = elementInfo.position.top + "px";

      // Calculate angle between the sun and the draggable element

      var deltaX = elementInfo.position.left - sunX;
      var deltaY = elementInfo.position.top - sunY;
      var angleRadians = Math.atan2(deltaY, deltaX);

      // Calculate shadow position based on angle and distance
      var shadowX = shadowDistance * Math.cos(angleRadians);
      var shadowY = shadowDistance * Math.sin(angleRadians);

      // Apply drop shadow effect
      element.style.setProperty("--shadowX", shadowX + "px");
      element.style.setProperty("--shadowY", shadowY + "px");
    }
  }
}
updatePositions();

function bringToFront(elementId) {
  var zIndexCounter = 0;
  moveableObjects[elementId].z_index = Object.keys(moveableObjects).length + 2;
  // Sort the elements by z-index first
  var sortedElements = Object.values(moveableObjects).sort(function (a, b) {
    return a.z_index - b.z_index;
  });
  // Loop through each sorted element and update its z-index
  for (var i = 0; i < sortedElements.length; i++) {
    zIndexCounter++;
    moveableObjects[sortedElements[i].elementObject.id].z_index = zIndexCounter;
  }
  for (var elementId in moveableObjects) {
    if (moveableObjects.hasOwnProperty(elementId)) {
      var elementInfo = moveableObjects[elementId];
      var element = elementInfo.elementObject;
      element.style.zIndex = elementInfo.z_index;
    }
  }
}

function isElementOutsideViewport(element, partialDetection) {
  var rect = element.getBoundingClientRect();

  if (partialDetection) {
    // Check if any part of the element is outside of the viewport
    return (
      rect.left < 0 ||
      rect.top < 0 ||
      rect.right > viewportWidth ||
      rect.bottom > viewportHeight
    );
  } else {
    // Check if the entire element is outside of the viewport
    return (
      rect.right <= 0 ||
      rect.bottom <= 0 ||
      rect.left >= viewportWidth ||
      rect.top >= viewportHeight
    );
  }
}
function moveToValidPosition(elementId) {
  console.log("moved");
  var element = moveableObjects[elementId].elementObject;
  var rect = element.getBoundingClientRect();
  // Calculate the new position to ensure the element stays within the viewport
  var newX = Math.min(Math.max(rect.left, 10), viewportWidth - rect.width);
  var newY = Math.min(Math.max(rect.top, 10), viewportHeight - rect.height);

  // Set the element's new position

  moveableObjects[elementId].position.left = newX;
  moveableObjects[elementId].position.top = newY;
}
function moveToRandomPosition(elementId) {
  moveableObjects[elementId].position.left = Math.random() * viewportWidth;
  moveableObjects[elementId].position.top = Math.random() * viewportHeight;
}


