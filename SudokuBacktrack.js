/**
* Created by Herman van der Veer on 7-1-2017.
*/
var loc = [];
// var currentX = 0;
// var currentY = 0;
// numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var grid = [
    1, 0, 3, 6, 0, 4, 7, 0, 9, // 0x0
    0, 2, 0, 0, 9, 0, 0, 1, 0, // 0x1
    7, 0, 0, 0, 0, 0, 0, 0, 6, // 0x2
    2, 0, 4, 0, 3, 0, 9, 0, 8, // 1x0
    0, 0, 0, 0, 0, 0, 0, 0, 0, // 1x1
    5, 0, 0, 9, 0, 7, 0, 0, 1, // 1x2
    6, 0, 0, 0, 5, 0, 0, 0, 2, // 2x0
    0, 0, 0, 0, 7, 0, 0, 0, 0, // 2x1
    9, 0, 0, 8, 0, 2, 0, 0, 5  // 2x2
];

function startBacktrack(){
    myVar = setInterval(stepForward, 100);
}

function countInGrid(){
    loc = find_empty_location()
    for (var i = 0; i < 9; i++) {
        setCell(loc[0], loc[1], i)
    }
}


function printGrid(grid){
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            // if (cells[y][x].css("color", "blue") == true) {
            setCell(col,row,puzzle[y][x]);
            puzzle[y][x] = value;
            cells[y][x].html(value);
        }
    }
}


function find_empty_location(){
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (puzzle[row][col] == 0) {
                loc[0] = row
                loc[1] = col
                return loc;
            }
        }
    }
    return false;
}

function usedInRow(grid, row, num) {
    for (var i = 0; i < 9; i++) {
        if (grid[row][i] == num){
            console.log(num + " used in row")
            return true;
        }
    }
    return false;
}

function usedInCol(grid, col, num) {
    for (var i = 0; i < 9; i++) {
        if (grid[i][col] == num){
            console.log(num + " used in Column")
            return true;
        }
    }
    return false;
}

function Solve(grid) {
    if(true);
}

function usedInBlock(x, y) {
    // translate cell coordinates to top-left coordinates in block
    var blockX = Math.floor(x / 3) * 3;
    var blockY = Math.floor(y / 3) * 3;

    var block = [];
    for (var i = blockX; i < blockX + 3; i++) {
        for (var j = blockY; j < blockY + 3; j++) {
            if (grid[i + row][j + col] == num){
                console.log(num + " used in block")
                return true;
            }
        }
    }
    return false;
}


function stepForward()
{
    deHighlightCell(currentX, currentY);
    // find_empty_location(grid, loc)

    currentX++;
    if (currentX > 8)
    {
        currentX = 0;
        currentY++;
    }
    if (currentY > 8)
    {
        currentX = 0;
        currentY = 0;
    }
    highlightCell(currentX, currentY);

    if (getCell(currentX, currentY) !== 0) return;

    var foundNumbers = getColumn(currentX);
    foundNumbers = foundNumbers.concat(getRow(currentY));
    foundNumbers = foundNumbers.concat(getBlock(currentX, currentY));
    console.log(foundNumbers)

    var diff = numbers.filter(function(x) { return foundNumbers.indexOf(x) < 0 })

    console.log("In "+ currentY + "" + currentX + " found: " + diff);

    if (diff.length >= 1) //if there are possibilities
    {
        setBlueCell(currentX, currentY, diff); //try the first option
        // setCell(currentX, currentY, diff);
        console.log(diff);
    }
    // else{ //backtrack
    //     console.log("No options left for" + currentY + "" + currentX + " - Backtracking")
    //     stepBack(currentX, currentY)
    //     setBlueTableCell(currentX, currentY, diff[1]);
    //     setCell(currentX-1, currentY, diff[1]);
    // }
}
function stepBack(){
    deHighlightCell(currentX, currentY);
    currentX--;
    if (currentX < 0)
    {
        currentX = 8;
        currentY--;
    }
    highlightCell(currentX, currentY);
}