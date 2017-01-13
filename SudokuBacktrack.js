/**
* Created by Herman van der Veer on 7-1-2017.
*/
var emptyLocGrid = []; //array of all empty locations in grid
var ce = -1; //counter of position

function startBacktrack(){
    myVar = setInterval(stepForward, 300);
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
    if(ce>=0){
        deHighlightCell(emptyLocGrid[ce][1],emptyLocGrid[ce][0]);
    }
    ce++;
    var cy = emptyLocGrid[ce][1];
    var cx = emptyLocGrid[ce][0];
    highlightCell(cy,cx);

    var foundNumbers = getColumn(cx);
    foundNumbers = foundNumbers.concat(getRow(cy));
    foundNumbers = foundNumbers.concat(getBlock(cx, cy));
    // console.log(foundNumbers)

    var diff = numbers.filter(function(x) { return foundNumbers.indexOf(x) < 0 })


    console.log("In x:"+ cy + ", y:" + cx + " found: " + diff);

    if (diff.length >= 1) //if there are possibilities
    {
        setBacktrackCell(cy, cx, diff); //try the first option
        // console.log(diff);
    }
    else{ //backtrack
        cells[cy][cx].addClass('selectedRed');
        console.log("No options left for" + cy + ", " + cx + " - Backtracking")
        stepBack(cx, cy)
        // setBlueTableCell(cx, cy, diff[0]);
        // setCell(cx-1, cy, diff[1]);
    }
}
function stepBack(){
    deHighlightCell(cx, cy);
    ce--;
    highlightCell(currentX, currentY);
}

function setBacktrackCell(x, y, value)
{
    puzzle[y][x] = value;
    // console.log(puzzle);
    cells[y][x].html(value).css("color", "blue");
}

