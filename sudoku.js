var cells;
var puzzles;
var puzzle;
var doContinue = true;

(function () {
    $.ajax({url: "sudoku.txt"})
        .done(function (fileContent) {
            parseFile(fileContent);
            initCells();
            // loadPuzzle(puzzleNumber);
            // start();
        });
})($);

function selectPuzzle() {
    var myElement = document.getElementById("puzzleNumber");
    var puzzleNumber = myElement.value;
    console.log(puzzleNumber);
    loadPuzzle(puzzleNumber);
}

function loadPuzzle(puzzleIndex)
{
    puzzle = puzzles[puzzleIndex];
    console.log(puzzle);
    for (var y = 0; y < 9; y++)
    {
        for (var x = 0; x < 9; x++)
        {
            setCell(x, y, puzzle[y][x]);
        }
    }
}

function stop(){
    clearInterval(myVar);
}

function clearPuzzle() {
    loadPuzzle(0);
    console.log(0);
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

function getCell(x, y)
{
    return puzzle[y][x];
}

function setCell(x, y, value)
{
    puzzle[y][x] = value;
    if (puzzle[y][x] === 0){
        cells[y][x].html("");
    } else {
        cells[y][x].html(value);
    }
}

function setBlueCell(x, y, value)
{
    puzzle[y][x] = value;
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