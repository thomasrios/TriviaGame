let questionList = {};
let trivia = {};

let questions;
let answers = ["A", "D", "B", "C", "C", "A", "D", "B"];

let intervalID;

//Timer
timer = {

    time: 90,

    start: function() {
        $("#timer-display").text("1:30");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function() {

        timer.time--;
        let currentTime = timer.timeCoverter(timer.time);
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-bloock").hide();
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 90;
        $("#timer-display").text("1:30");
        clearInterval(intervalID);
    },

    timeCoverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};

//Questions 

function startTrivia() {
    questionList = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0, 
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "Who has the most rushing TDs in NFL history?",
            A: "Emmitt Smith",
            B: "Marcus Allen",
            C: "Ladainian Tomlinson",
            D: "Jim Brown",
        },
        q1: {
            question: "Which NFL team has the most Super Bowl titles since 2000?",
            A: "Dallas Cowboys",
            B: "Baltimore Ravens",
            C: "Pittsburgh Steelers",
            D: "New England Patriots",
        },
        q2: {
            question: "Which NFL team has the most Super Bowl titles since 2000?",
            A: "Dallas Cowboys",
            B: "Baltimore Ravens",
            C: "Pittsburgh Steelers",
            D: "New England Patriots",
        },
        q3: {
            question: "Which NFL team has the most Super Bowl titles since 2000?",
            A: "Dallas Cowboys",
            B: "Baltimore Ravens",
            C: "Pittsburgh Steelers",
            D: "New England Patriots",
        },
        q4: {
            question: "Which NFL team has the most Super Bowl titles since 2000?",
            A: "Dallas Cowboys",
            B: "Baltimore Ravens",
            C: "Pittsburgh Steelers",
            D: "New England Patriots",
        },
        q5: {
            question: "Which NFL team has the most Super Bowl titles since 2000?",
            A: "Dallas Cowboys",
            B: "Baltimore Ravens",
            C: "Pittsburgh Steelers",
            D: "New England Patriots",
        },
        q6: {
            question: "Which NFL team has the most Super Bowl titles since 2000?",
            A: "Dallas Cowboys",
            B: "Baltimore Ravens",
            C: "Pittsburgh Steelers",
            D: "New England Patriots",
        },
        q7: {
            question: "Which NFL team has the most Super Bowl titles since 2000?",
            A: "Dallas Cowboys",
            B: "Baltimore Ravens",
            C: "Pittsburgh Steelers",
            D: "New England Patriots",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionList);
    for (var i = 0; i < questions.length; i++) {
        var questionTitle = questions[i];
        var question = questionList[questionTitle];
        var questionBlocks = createQuestions(question, questionTitle);
        $(".question-block").append(questionBlocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    let playerAnswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playerAnswers);
    console.log(answers);

    for (k=0; k < questions.length; k++) {
        if (playerAnswers[k] === undefined) {
            trivia.blank++;
        } else if (playerAnswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

//Question timer
$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});