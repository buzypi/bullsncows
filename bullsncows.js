var app = angular.module('bullsncows', []);
app.controller('BCController', function() {
    this.randomNo = Math.floor(Math.random()*10001);
    this.tries = [];

    this.alreadyEntered = function() {
        var enteredNumber = this.enteredNumber;
        var numFound = false;
        _.each(this.tries, function(item) {
            if(item.num === enteredNumber) {
                numFound = true;
            }
        });
        return numFound;
    };

    this.verifyBullsNCows = function() {
        var bulls = 0, cows = 0;
        var tempRandomNumber = this.randomNo;
        var tempEnteredNumber = this.enteredNumber;

        //Checking for bulls
        for(var i=0;i<4;i++){
            if(tempRandomNumber % 10 == tempEnteredNumber % 10) {
                bulls++;
                if(bulls == 4) {
                    alert("Bingo!");
                    document.location.reload();
                }
            }
            tempRandomNumber = parseInt(tempRandomNumber / 10);
            tempEnteredNumber = parseInt(tempEnteredNumber / 10);
        }
        //Checking for cows
        var tempEnteredNumber = this.enteredNumber;
        var tempRandomNumber = this.randomNo;
        var randDigits = [], enteredDigits = [];
        for(var i = 0; i < 4; i++){
            enteredDigits.push(tempEnteredNumber % 10);
            randDigits.push(tempRandomNumber % 10);
            tempEnteredNumber = parseInt(tempEnteredNumber / 10);
            tempRandomNumber = parseInt(tempRandomNumber / 10);
        }
        for(var i = 0; i < 4; i++) {
            var digit = enteredDigits[i];
            var position = randDigits.indexOf(digit);
            if(position >= 0) {
                randDigits[position] = null;
                cows++;
            }
        }

        cows = cows - bulls;
        this.tries.push({num: this.enteredNumber, bulls: bulls, cows: cows});
    };

    this.verify = function() {
        if(this.alreadyEntered()) {
            this.enteredNumber = null;
            return;
        }
        if(this.enteredNumber > 0 && this.enteredNumber < 10000){
            this.verifyBullsNCows();
        }
        else{
            alert('Wrong number');
        }
        this.enteredNumber = null;
    };

    this.giveUp = function () {
        var msg = "Click OK to give up, Cancel to continue trying.";
        if(confirm(msg)) {
            alert('The number was '+ this.randomNo);
            document.location.reload();
        }
        else
            return;
    };

    this.testKey = function(evt) {
        if(evt.keyCode === 13) {
            this.verify();
        }
    };

});

$(document).ready(function() {
    $('#tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});
