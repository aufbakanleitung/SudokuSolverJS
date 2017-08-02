/**
* Created by Herman van der Veer on 7-1-2017.
*/

function startBacktrack(){
    ce = -1;
    intervar = setInterval(stepForward, 100);
}

function backtrackFast(){
    ce = -1;
    while(emptyLocGrid.length > ce){
        stepForward();
    }
}

function backtrackAll(){
    var a=31;
    while(a <= 50){
        $("#number").html(a);
        console.log(a);
        loadPuzzle(a);
        ce = -1;
        while(emptyLocGrid.length > ce){
            stepForward();
        }
        a++;
    }
}

var emptyLocGrid = []; //array of all empty locations in grid
var ce = -1; //counter of empty grid position

function backtrack(cx, cy, ct) {
    setBacktrackCell(cx, cy, 0);
    console.log("Backtracking for x:" + cx + ", y:" + cy + ", t:" + ct);
    emptyLocGrid[ce][2] = 0; //reset the ct counter
    //One step back
    ce--;
    cx = emptyLocGrid[ce][1];
    cy = emptyLocGrid[ce][0];
    setBacktrackCell(cx, cy, 0);
    emptyLocGrid[ce][2]++;
    ce--; //One extra step back to negate te stepforward immediately after.v
    return {cx: cx, cy: cy};
}

function stepForward() //stepfunction
{
    if(ce>=0){
        deHighlightCell(emptyLocGrid[ce][1],emptyLocGrid[ce][0]);
    }
    ce++;
    console.log(emptyLocGrid.length + " = " + ce);
    if(emptyLocGrid.length == ce) {
        stop();
        addSolutionToList();
        return;
    }

    var cx = emptyLocGrid[ce][1];
    var cy = emptyLocGrid[ce][0];
    var ct = emptyLocGrid[ce][2];
    highlightCell(cx,cy);

    var foundNumbers = getColumn(cx);
    foundNumbers = foundNumbers.concat(getRow(cy));
    foundNumbers = foundNumbers.concat(getBlock(cx, cy));

    var diff = numbers.filter(function(x) { return foundNumbers.indexOf(x) < 0 })

    console.log("In x:"+ cx + ", y:" + cy +" , t:" + ct + " found: " + diff);

    if (diff.length >= ct+1) //if there are possibilities
    {
        setBacktrackCell(cx, cy, diff[ct]); //try the ct'th option

    }
    else{ //backtrack
        backtrack(cx, cy, ct);
    }
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

