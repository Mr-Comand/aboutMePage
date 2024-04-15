var clickTime = undefined;
var movingObjekt = undefined;
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
    }
  }
}

for (var elementId in moveableObjects) {
  if (moveableObjects.hasOwnProperty(elementId)) {
    var element = moveableObjects[elementId].elementObject;

    // Attach mousedown event listener to the element
    element.addEventListener("mousedown", function (e) {
      e.preventDefault();
      clickTime = new Date().getTime();
      movingObjekt = this.id;
      var offsetX = e.clientX - this.getBoundingClientRect().left;
      var offsetY = e.clientY - this.getBoundingClientRect().top;

      // Store offsetX and offsetY in the elementInfo
      moveableObjects[movingObjekt].offsetX = offsetX;
      moveableObjects[movingObjekt].offsetY = offsetY;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      function onMouseMove(e) {
        console.log(movingObjekt);
        var x = e.clientX - moveableObjects[movingObjekt].offsetX;
        var y = e.clientY - moveableObjects[movingObjekt].offsetY;
        moveableObjects[movingObjekt].position.left = x;
        moveableObjects[movingObjekt].position.top = y;
        updatePositions(); // Update positions of all elements
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        localStorage.setItem(
          "contentPosition",
          JSON.stringify(moveableObjects)
        );
      }
    });
  }
}

function updatePositions() {
  // Loop through each element in the mappedObject
  for (var elementId in moveableObjects) {
    if (moveableObjects.hasOwnProperty(elementId)) {
      var elementInfo = moveableObjects[elementId];
      var element = elementInfo.elementObject;

      // Update the left and top positions of the element
      element.style.left = elementInfo.position.left + "px";
      element.style.top = elementInfo.position.top + "px";
    }
  }
}
updatePositions();
