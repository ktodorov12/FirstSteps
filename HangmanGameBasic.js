<!DOCTYPE html>
<html>
<head>
<title> Hangman game!</title>
</head>
<body>
<h1>Hangman!</h1>
<script>
    function randomWord(...words){
        let randomWord = Math.floor(Math.random() * words.length )
        let emptyArray = [];
        for (let character = 0; character < randomWord.lenght; character++){
            emptyArray[character] = "_";
        }
        let letters = randomWord.lenght
        while (letters > 0){
            alert(emptyArray.join(""))
            let guess = prompt('Pick letter, or press cancel to stop playing')
            if (guess === null){
                break
            } else if(guess.lenght !== 1){
                alert('Please pick single character')
            } else 
                for (let correct = 0; correct < randomWord.lenght; correct++){
                    if(randomWord[correct] === guess){
                        emptyArray[correct] === correct
                        letters--
                    }
                }
        }

    }
    alert(answerArray.join(" "));
alert("Good job! The answer was " + randomWord);

</script>
</body>
</html>