// slider

var boardSize = 8;
$(function () {
    var handle = $("#custom-handle");
    $("#slider").slider({
        min: 8,
        max: 18,
        create: function () {
            handle.text($(this).slider("value"));

        },
        slide: function (event, ui) {

            handle.text(ui.value);
            boardSize = ui.value;
        }
    });
});
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

// create game 4x4 board when button is clicked
$(function () {
    $("#createBoardBtn").on("click", createBoard);
    var hasBoard = false;

    function createBoard() {
        if (hasBoard) { // prevent creation infinity boards
            return;
        } 

        alert(boardSize);
        var rowSize = 4,// Math.floor(Math.sqrt(boardSize*2))
            colSize = boardSize*2/4,
            idNumber = 1,
            divGameBoard = $("<div class='gameBoard' id='#gameBoard'>"),
            divBox,
            divRow;

        var arr = [1, 3, 5, 2, 6, 12, 8, 40, 3, 12, 8, 1, 5, 6, 40, 2];
        for (var i = 0; i < rowSize; i++) {
            divRow = $("<div class='row'>");
            for (var j = 0; j < colSize; j++) {
                divBox = $("<div class='box'>")
                    .on('click', showCurrentCard);
                divRow.append(divBox.attr('id', 'box' + idNumber));
                divRow.append(divBox.attr('value', arr[idNumber-1]));
                divRow.append(divBox.attr('open', false));
                idNumber++;
            }
            divGameBoard.append(divRow);
        }

        $("body").append(divGameBoard);
        hasBoard = true;
    }

    var hasOpenCard = false;
var arr = [1, 3, 5, 2, 6, 12, 8, 40, 3, 12, 8, 1, 5, 6, 40, 2];
    function showCurrentCard() {
        var el = $(this);
        alert(el.attr('id'))
        var idText=  el.attr("id");
         //alert('id='+idText);
         this.style.backgroundColor = "red";
         var cardOpen = el.attr("open");
        if (!cardOpen) {
            $(this).toggleClass("rotated");
            el.append(el.attr("value"));
            el.attr("open", true);
        }
    }
});
