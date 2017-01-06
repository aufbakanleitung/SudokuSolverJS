var cells;
var puzzles;
var puzzle;

(function () {
    $.ajax({url: "sudoku.txt"})
        .done(function (fileContent) {
            parseFile(fileContent);
            initCells();
            loadPuzzle(7);
            start();
        });
})($);

function loadPuzzle(puzzleIndex)
{
    puzzle = puzzles[puzzleIndex];
    for (var y = 0; y < 9; y++)
    {
        for (var x = 0; x < 9; x++)
        {
            if (puzzle[y][x] === 0) continue;
            setTableCell(x, y, puzzle[y][x]);
        }
    }
}

function parseFile(fileContent)
{
    var lines = fileContent.match(/[^\r\n]+/g);
    puzzles = [];
    for (var i = 0; i < lines.length / 10; i++)
    {
        var puzzleLines = lines.slice(i*10 + 1, i*10 + 10);
        var puzzle = [];
        puzzleLines.forEach(function(stringLine){
            var digitArray = [];
            for (var j = 0; j < 9; j++)
            {
                digitArray.push(parseInt(stringLine.charAt(j)));
            }
            puzzle.push(digitArray);
        });
        puzzles.push(puzzle);
    }

    console.log(puzzles);
}

function initCells()
{
    var flatCells = $('.sudoku').find('td');
    cells = [];
    for (var y = 0; y < 9; y++)
    {
        cells[y] = [];
        for (var x = 0; x < 9; x++)
        {
            cells[y][x] = $(flatCells[x + y*9]);
        }
    }
}

function start()
{
    highlightCell(0,0);
    setInterval(doStep, 100);
}

var currentX = 0;
var currentY = 0;

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function doStep()
{
    deHighlightCell(currentX, currentY);

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
        setBlueTableCell(currentX, currentY, diff[0]); //try the first option
        setCell(currentX, currentY, diff[0]);
    }
    else{ //backtrack
        console.log("No options left for" + currentY + "" + currentX + " - Backtracking")
        setBlueTableCell(currentX-1, currentY, diff[1]);
        setCell(currentX-1, currentY, diff[1]);

    }
}
function stepBack(){
    //backtrack
}

function getCell(x, y)
{
    return puzzle[y][x];
}

function setCell(x, y, value)
{
    puzzle[y][x] = value;
}

function getRow(y)
{
    return puzzle[y];
}

function getColumn(x)
{
    var row = [];
    for (var y = 0; y < 9; y++)
    {
        row.push(puzzle[y][x]);
    }
    return row;
}

function getBlock(x, y) {
    // translate cell coordinates to top-left coordinates in block
    var blockX = Math.floor(x / 3) * 3;
    var blockY = Math.floor(y / 3) * 3;

    var block = [];
    for (var i = blockX; i < blockX + 3; i++) {
        for (var j = blockY; j < blockY + 3; j++) {
            block.push(puzzle[j][i]);
        }
    }
    return block;
}

function setTableCell(x, y, value)
{
    cells[y][x].html(value);
}

function setBlueTableCell(x, y, value)
{
    cells[y][x].html(value).css("color", "blue");
}


function highlightCell(x, y)
{
    cells[y][x].addClass('selected');
}

function deHighlightCell(x, y)
{
    cells[y][x].removeClass('selected');
}