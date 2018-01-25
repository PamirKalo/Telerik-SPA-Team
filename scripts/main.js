// slider
$( function() {
    $( "#slider" ).slider();
} );

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