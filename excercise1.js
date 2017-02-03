/**
 * Created by hermanvanderveer on 20/01/2017.
 Indent with 2 spaces
 No multiple consecutive newlines
 No trailing whitespace
 No empty blocks
 Opening brace at end of line
 Whitespace around operators
 One statement per line
 One variable declaration per line
 Switch blocks must include default case
 No fall-through in switch blocks unless specifically commented
 Empty line between methods
 Naming:
 Packages: lowercase
 Classes: PascalCase
 Functions: camelCase
 Variables: camelCase
 Type parameter: PascalCaseT
 */

 

function multiplyNumbers(a, b) {
  return a * b;
}

function calcBoxSurfaceArea(length, width, height) {
  return (2 * length * width) + (2 * width * height) + (2 * height * length);
}

function returnLowest(a, b) {
  if (a < b) {
    return a;
  }
  else if { 
    return b;
  }
}

function move(direction) {
  if (direction == 'left') {
    goLeft();
  } else if (direction == 'right') {
    goRight();
  }
}

function getNormalizedVector(vector) {
  var vx = vector.x;
  var vy = vector.y;

  return {
    x: vx / Math.sqrt(vx ^ 2  + vy ^ 2),
    y: vy / Math.sqrt(vx ^ 2  + vy ^ 2)
  };
}

function pythagoras(vector) {

}

// readable code 2

function getNormalizedVector(vector) {
  return {
    x: vector.x / Math.sqrt(vector.x * vector.x + vector.y * vector.y),
    y: vector.y / Math.sqrt(vector.x * vector.x + vector.y * vector.y)
  };
}

// 6. (JavaScript)
// This function calculates the hypothenuse of a triangle with sides a and b
function calculate(a,b) {
// First calculate the square of a
  var x = a * a
// Then calculate the square of b
  var z = b * b;
// Add the squares together
  var y = x + z
// Determine the square root
  var m = Math.sqrt(y)
  // Return the value
  return z;}
