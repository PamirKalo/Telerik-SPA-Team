// slider



var boardSize = 8;
var score = 0;
$(function () {
    $("#submit").css("display", "none");
    // hide the score_submit form by default
    var handle = $("#custom-handle");
    $("#slider").slider({
        value: 8,
        min: 8,
        max: 12,
        step: 2,
        create: function () {
            handle.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handle.text(ui.value);
            boardSize = ui.value;
        }
    });
    $("#amount").val("$" + $("#slider").slider("value"));
});
// end of slider

// Tooltip for visualizing the actual board
$(function () {
    $('#slider').tooltip({
        show: {
            duration: 0
        },
        hide: {
            effect: "fade",
            duration: 100
        },
        track: true,
        content: function () {
            if (boardSize === 8) {
                return ("<p>easy</p>");
            } else if (boardSize === 10) {
                return ("<p>medium</p>");
            } else {
                return ("<p>hard</p>");
            }
        }

    });
});

// create game 4x4 board when button is clicked
$(function () {
    $("#createBoardBtn").on("click", createBoard);
    var hasBoard = false;

    var arr = [1, 3, 5, 2, 6, 12, 8, 40, 3, 12, 8, 1, 5, 6, 40, 2, 15, 7, 13, 7, 9, 15, 9, 13];
    var divValueMap = new Map();

    // function createBoard(boardSize) {
    function createBoard() {
        if (hasBoard) { // prevent creation infinity boards
            return;
        }

        $("#customize").hide(); // //hide the customization screen
        $("#submit").show(); //show the form for submitting score

        var rowSize = 4, // Math.floor(Math.sqrt(boardSize*2))
            colSize = boardSize * 2 / 4,
            idNumber = 1,
            divGameBoard = $("<div class='gameBoard' id='#gameBoard'>"),
            divBox,
            divRow,
            startButton = $("<button>Start game!</button>");

        for (var i = 0; i < rowSize; i++) {
            divRow = $("<div class='row'>");
            for (var j = 0; j < colSize; j++) {
                divBox = $("<div class='box'>")
                    .on('click', showCurrentCard);
                divRow.append(divBox.attr('id', 'box' + idNumber));
                divValueMap.set('box' + idNumber, arr[idNumber - 1]);
                idNumber++;
            }
            divGameBoard.append(divRow);
        }
        $("body").append(divGameBoard);
        hasBoard = true;
        if (hasBoard) {
            startButton.addClass("button");
            $("#submit").append(startButton);
        }
    }

    var hasOpenCard = false;
    var openedCardId = '';
    var inSetTimeOut = false;

    function showCurrentCard() {
        if (inSetTimeOut) {
            return;
        }
        if (hasOpenCard && $(this).attr('id') === openedCardId) {
            return;
        }
        var el = $(this);

        el.css("background-color", "red");
        el.html(divValueMap.get(el.attr('id')));
        $(this).toggleClass("rotated");

        if (hasOpenCard) {
            if (divValueMap.get(openedCardId) === divValueMap.get(el.attr('id'))) {
                $("#" + openedCardId).off('click');
                el.off('click');
                score += 10;
                $("#score").html(score);
            } else {
                var openedCard = $("#" + openedCardId);
                inSetTimeOut = true;
                setTimeout(function () {
                    openedCard.html('');
                    openedCard.css("background-color", "");
                    el.css("background-color", "");
                    el.html("");
                    inSetTimeOut = false;
                }, 1000);
            }
            hasOpenCard = false;
            openedCardId = '';
        } else {
            openedCardId = el.attr('id');
            hasOpenCard = true;
        }
    }
});

function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}