// slider

var boardSize = 0;
$(function () {
    var handle = $("#custom-handle");
    $("#slider").slider({
        min: 8,
        max: 16,
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
    var arr = [1, 3, 5, 2, 6, 12, 8, 40, 3, 12, 8, 1, 5, 6, 40, 2];
    var divValueMap = new Map();
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
                divValueMap.set('box'+idNumber, arr[idNumber-1]);
                idNumber++;
            }
            divGameBoard.append(divRow);
        }

        $("body").append(divGameBoard);
        hasBoard = true;
    }

    var hasOpenCard = false;
    var cardValueId = '';
    function showCurrentCard() {
        var el = $(this);

         el.css("background-color", "red");
        //  var currentCard=divValueMap.get(el.attr('id'));
         
         el.html(divValueMap.get(el.attr('id')));
         $(this).toggleClass("rotated");
          //alert(divValueMap.get('currentCardId'));

         if (hasOpenCard) {
            if (divValueMap.get(cardValueId)===divValueMap.get(el.attr('id'))) {
                alert('equals');        
            } else {
                alert('no');
                el.css("background-color", "");
                el.html("");
                $("#"+cardValueId).html('');
                $("#"+cardValueId).css("background-color", "");
            }
            hasOpenCard = false;
            cardValueId='';
         } else {
             // to do 
             //var currentCardId=el.attr('id');
             cardValueId =el.attr('id');
             hasOpenCard=true;
         }
        
    }
    

    
});
