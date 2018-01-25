// slider

var boardSize = 0;
$( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        min: 8,
        max: 16,
        create: function() {
            handle.text( $( this ).slider( "value" ));

            },
        slide: function( event, ui ) {

            handle.text( ui.value );
            boardSize = ui.value;
        }
    });
} );
// end of slider

// Tooltip for visualizing the actual board
$( function() {
    $('#slider').tooltip({
        show: { duration: 0 },
        hide: { effect: "fade", duration: 100 },
        track: true,
        content: function() {
            return ("<table><tr><td>X</td></tr></table>".repeat(boardSize));
        }
    });
});

var hasOpenCard = false;
function showCurrentCard() {
    alert('show card face');
    this.style.backgroundColor = "red";
}

function createBoard() {
    var firstDivRow = document.querySelector(".row"),
        cloneDivRow = firstDivRow.cloneNode(true),
        divBoxColl = cloneDivRow.querySelectorAll(".box");
    alert('in create board');
    for (var i = 0; i < divBoxColl.length; i++) {
        var box = divBoxColl[i];
        box.addEventListener('click', showCurrentCard);
    }

    document.querySelector(".gameBoard").appendChild(cloneDivRow);
}