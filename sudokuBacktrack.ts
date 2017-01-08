/**
 * Created by Herman on 7-1-2017.
 */
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

    if (diff.length === 1) //if there are possibilities
    {
        setBlueTableCell(currentX, currentY, diff[0]); //try the first option
        setCell(currentX, currentY, diff[0]);
    }
    // else{ //backtrack
    //     console.log("No options left for" + currentY + "" + currentX + " - Backtracking")
    //     setBlueTableCell(currentX-1, currentY, diff[1]);
    //     setCell(currentX-1, currentY, diff[1]);
    //
    // }
}