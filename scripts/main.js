$(function () {
    var boardSize = 8;
    var score = 0;
    var cardsType = 0;
    var speedType = 0;
	var speed;

	if(speedType===0){
	    speed = 1000;
	} else if (speedType ===1) {
	    speed = 2000;
	} else if (speedType ===2) {
	    speed = 3000;
	}

		var imageArr=["image1.jpg","image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg",
	"image8.jpg", "image9.jpg", "image10.jpg", "image11.jpg", "image12.jpg", "image13.jpg", "image14.jpg", "image15.jpg",
	"image16.jpg", "image17.jpg", "image18.jpg", "image19.jpg", "image20.jpg", ];

	var colorArr = ['#5d8aa8','#f0f8ff','#e32636','#efdecd','#ffbf00','#a4c639','#cd9575','#915c83','#008000',
	     '#fdee00','#66ff00','#004225','#480607','#cc5500','#702963','#c19a6b','#00cc99','#ffa700', '#ffffff', '#000000'];
	     
	var  wordArr = ['Variables', 'Math', 'Array', 'if-else', 'function', 'const', 'let', 'random', 'loop', 'for', 
	'switch-case', 'object', 'regex', 'map', 'set', 'graph', 'three', 'link-list', 'scope', 'booleans',];

	var arr = [];

    // slider
    $("#submit").css("display", "none"); // hide the score_submit form by default
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

    // end of slider

    // Tooltip for visualizing the actual board
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

    // create game 4x4 board when button is clicked
    $("#createBoardBtn").on("click", createBoard);
    var hasBoard = false;

    $('.progress-bar').timer({
        format:'%H:%M:%S',
        duration: '5m',
        countdown: true,
        callback: function() {
            alert('Time up!');
        }
    });


    $('.progress-bar').attr("style", 'width='+$('.progress-bar').html()+"%");
    //     .timer({
    //     duration: '5m',
    //     callback: function() {
    //         alert('again! you have ' +score+'points');
    //     }
    // });

    // var arr = [1, 3, 5, 2, 6, 12, 8, 40, 3, 12, 8, 1, 5, 6, 40, 2, 15, 7, 13, 7, 9, 15, 9, 13];
    var divValueMap = new Map();

    
    function createBoard() {
        if (hasBoard) { // prevent creation infinity boards
            return;
        }

        cardsType = $("input[type='radio'][name='cardsType']:checked").val();

        $("#customize").hide(); // //hide the customization screen
        $("#submit").show(); //show the form for submitting score

		var rowSize = 4; // Math.floor(Math.sqrt(boardSize*2))
		var colSize = boardSize * 2 / 4;
		var idNumber = 1;
		var divGameBoard = $("<div class='gameBoard' id='#gameBoard'>");
		var divBox;
		var divRow;
		var startButton = $("<button>Start game!</button>");

        function randDigits(max, min) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

		var arrVisit = [];
	    var input = [];
	    for (var p=0; p<boardSize*2; p+=2) {
	        var k=randDigits(0, 20);
	        while (arrVisit[k]===1) {
	            k=randDigits(0, 20);
	        }
	        input[p]=k;
	        input[p+1]=k;
	        arrVisit[k]=1;
	    }
        
	    var arrVisitTwo=[];
	    for (var t=0; t<boardSize*2; t+=1) {
	        var m=randDigits(0, boardSize*2);
	        while (arrVisitTwo[m]) {
	            m=randDigits(0, boardSize*2);
	        }                    
	        arr[t]= input[m];
	        arrVisitTwo[m]=true;
	    }
        

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
		var ind = divValueMap.get(el.attr("id"));
        $(this).toggleClass("rotated");
    
        if (cardsType==='2'){
        el.addClass('cardFace');
        el.css('background-image', `url(scripts/images/${imageArr[ind]})`);
        } else if (cardsType==='1') {
            el.html(`<div style='background-color:${colorArr[ind]};width: 100%;height:100%;'></div>`);
        } else if (cardsType==='0') {
            el.css("background-color", "red");
            el.html(`${wordArr[ind]}`);
        }


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
                    openedCard.html("");
                    openedCard.css("background-color", "");
                    openedCard.css("background-image", "");
                    openedCard.removeClass('cardFace');
                    openedCard.toggleClass('rotated');
                    el.removeClass('cardFace');
                    el.css("background-image", "");
                    el.css("background-color", "");
                    el.html("");
                    el.toggleClass('rotated');
                    
                    inSetTimeOut = false;
                }, speed);
            }
            hasOpenCard = false;
            openedCardId = '';
        } else {
            openedCardId = el.attr('id');
            hasOpenCard = true;
        }
    }


    function validateForm() {
        var x = document.forms["myForm"]["fname"].value;
        if (x == "") {
            alert("Name must be filled out");
            return false;
        }
    }
})

