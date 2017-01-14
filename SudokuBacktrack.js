/**
* Created by Herman van der Veer on 7-1-2017.
*/

function startBacktrack(){
    myVar = setInterval(stepForward, 120);
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


var emptyLocGrid = []; //array of all empty locations in grid
var ce = -1; //counter of empty grid position
function stepForward()
{
    if(ce>=0){
        deHighlightCell(emptyLocGrid[ce][1],emptyLocGrid[ce][0]);
    }
    ce++;
    var cx = emptyLocGrid[ce][1];
    var cy = emptyLocGrid[ce][0];
    var ct = emptyLocGrid[ce][2];
    highlightCell(cx,cy);

    var foundNumbers = getColumn(cx);
    foundNumbers = foundNumbers.concat(getRow(cy));
    foundNumbers = foundNumbers.concat(getBlock(cx, cy));
    // console.log(foundNumbers);

    var diff = numbers.filter(function(x) { return foundNumbers.indexOf(x) < 0 })
    // console.log(diff);

    console.log("In x:"+ cx + ", y:" + cy +" , t:" + ct + " found: " + diff);

    if (diff.length >= ct+1) //if there are possibilities
    {
        setBacktrackCell(cx, cy, diff[ct]); //try the ct'th option
        // console.log(diff);
    }
    else{ //backtrack
        // redlightCell(cx, cy);
        setBacktrackCell(cx, cy, 0);
        console.log("Backtracking for x:" + cx + ", y:" + cy + ", t:" + ct);
        emptyLocGrid[ce][2] = 0; //reset the ct counter
        //One step back
        ce--;
        cx = emptyLocGrid[ce][1];
        cy = emptyLocGrid[ce][0];
        setBacktrackCell(cx, cy, 0);
        emptyLocGrid[ce][2]++;
        ce--;
    }
}

function stepBack(){
    deHighlightCell(cx, cy);
    ce = ce-2;
    highlightCell(currentX, currentY);
}

function setBacktrackCell(x, y, value)
{
    puzzle[y][x] = value;
    // console.log(puzzle);
    if (puzzle[y][x] === 0){
        cells[y][x].html("");
    } else {
        cells[y][x].html(value).css("color", "blue");
    }
}

