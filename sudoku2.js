/**
 * Created by Herman on 5-1-2017.
 */
var cells;
initCells();
fillGrid();

console.log(flatCells[5]);
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
function fillGrid() {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            for (var z = 0; z < ; z++) {
            for (var z = 0 )
            cells[y][x].html(y+x);
        }
    }
}



function setTableCell(x, value)
{
    cells[x].html(value);
}
