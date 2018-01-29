// slider

var boardSize = 0;
$( function()  );

// end of slider

// Tooltip for visualizing the actual board
$(function () {
    $('#slider').tooltip({
        show: {duration: 0},
        hide: {effect: "fade", duration: 100},
        track: true,
        content: function () {
            return ("<table><tr><td>X</td></tr></table>".repeat(boardSize));
        }
    });
});


// create game board with size dependent from boardSize variable
$(function () {
    $("button").on("click", createBoard);
    var hasBoard = false;   //

    function createBoard(boardSize) {
        if (hasBoard) { // prevent creation infinity boards
            return;
        }
        var rowSize = 4,
            colSize = 4,
            idNumber = 1,
            divGameBoard = $("<div class='gameBoard' id='#gameBoard'>"),
            divBox,
            divRow;

        for (var i = 0; i < rowSize; i++) {
            divRow = $("<div class='row'>");
            for (var j = 0; j < colSize; j++) {
                divBox = $("<div class='box'>")
                    .on('click', showCurrentCard);
                divRow.append(divBox.attr('id', 'box' + idNumber));
                idNumber++;
            }
            divGameBoard.append(divRow);
        }

        $("body").append(divGameBoard);
        hasBoard = true;
    }

    var hasOpenCard = false;

    function showCurrentCard() {
        var el = $(this);
        var idText=  el.attr("id");
        alert('id='+idText);
        this.style.backgroundColor = "red";
    }
});
