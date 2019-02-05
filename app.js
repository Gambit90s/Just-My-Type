$(document).ready(function () {
    //set sentences as variables
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    //set word container to the first place in the sentences array on load
    let sentenceIndex = 0;

    let currentSentence = sentences[0];
    let currentLetter = currentSentence[0];

    let letterIndex = 0;
    let currentLetterDiv = $("#target-letter");
    currentLetterDiv.text(currentLetter);
    $("#words").append(sentences[sentenceIndex]);

    
    let start; // for timer
    let finish;// for timer
    let errors = 0; // to track mistakes

    $("#sentence").append(currentSentence); // setting the content of the sentence div to = currentSentence
    $("#target-letter").append(currentLetter); // setting the content of the next-letter div to = currentLetter
    //make the uppercase keyboard hidden on page load
    $("#keyboard-upper-container").hide(); // hides the uppercase keyboard

    $(document).keydown(function (event) { //show uppercase keyboard and hide lowercase keyboard on shift key press
        let keyDown = event.which;
        if (keyDown === 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        }
    })

    //hide uppercase keyboard on shift release and show lowercase
    $(document).keyup(function (event) {
        let keyUp = event.which;
        if (keyUp === 16) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        }
        $('.highlight').removeClass('highlight');
    });

    //highlight keys on press
    $(document).keypress(function (event) {
        let keyPress = event.which;
        $('#' + keyPress).addClass('highlight');
        let currentSentence = sentences[sentenceIndex];
        let currentLetter = currentSentence[letterIndex];

        if (start == undefined) { // if there is no value in start, set it to = the event.timeStamp
            start = event.timeStamp;
        }

        $("#yellow-block").css("left", "+=17.5px"); //moves the highlightBlock to the left by offsetting it to the right

        letterIndex++; //advances the letterIndex by 1
        let nextLetter = currentSentence[letterIndex]; // sets nextLetter = the current letterIndex
        currentLetterDiv.text(nextLetter); //sets the content of currentLetterDiv = nextLetter

        if (letterIndex < currentSentence.length -1) { // if letterIndex hasn't gone through the entire word yet
            if (event.which === currentLetter.charCodeAt()) { // if key pressed is correct
                $("#feedback").append("<span class = 'glyphicon glyphicon-ok'></span>"); //set ok icon
            } else {
                $("#feedback").append("<span class = 'glyphicon glyphicon-remove'></span>"); //if incorrect set icon to X
                errors++; // and advance the errors counter by 1
            }
        }

        if (letterIndex == currentSentence.length) { // if letterIndex = the end of the currentSentence
            $("#sentence").empty(); //get the sentence div and empty it
            sentenceIndex++; //advance sentenceIndex by 1
            currentSentence = sentences[sentenceIndex]; //set currentSentence = the sentence in teh sentences array 
            //at position sentenceIndex
            $("#sentence").append(sentences[sentenceIndex]); // set content of #sentence to the current sentence 
            letterIndex = 0; //reset the letter index to 0 to start at the beginning of the new sentence
            if (sentenceIndex < sentences.length - 1) { 
                let nextLetter = currentSentence[letterIndex];
            }
            currentLetterDiv.text(nextLetter); // set the content of the currentLetterDiv = nextLetter
            $("#yellow-block").css({ left: 17 }); //resets the position of the highlightBlock
            $("#feedback").empty(); //clears the feedback div
        }

        if (sentenceIndex > sentences.length - 1) { //if you're all the way through the sentences array
            finish = event.timeStamp; //set finish timer to that timer
            let time = (finish - start); //set time = difference between finish and start timeStamp
            time /= 60000; //divide timestamp of finish by 60000
            let speed = Math.round((54 / time) - (errors * 2)); // divides time by # of words in test and subtracts errors * 2
            $("#target-letter").text("Your score is " + speed + " words per minute"); //setting content of next-letter div to results of test

            setTimeout(function () {
                let tryAgain = confirm("Do you wnat to try again?");
                if (tryAgain == true) {
                    window.location.reload(); // reload the page
                } else {
                    return;
                };
            }, 4000);
        };
    })
});