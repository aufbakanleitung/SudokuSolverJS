/**
 * Created by Tommy de Boer.
 */
var myVar;

function startDeductive()
{
    // highlightCell(0,0);
    myVar = setInterval(doStep, 50);
}

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
    console.log(foundNumbers);

    var diff = numbers.filter(function(x) { return foundNumbers.indexOf(x) < 0 });

    console.log("In "+ currentY + "" + currentX + " found: " + diff);

    if (diff.length === 1) //if there is only one option
    {
        setBlueCell(currentX, currentY, diff[0]);
    }
}
