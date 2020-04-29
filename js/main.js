const wait = (delay, callback) => {
  setTimeout(() => {
    callback();
  }, delay);
};

const init = () => {
  let btnWinnerToggle, btnLoserToggle, winnerModal, loserModal, btnCloseWinnerModal, btnCloseLoserModal,
    gameOn = false,
    interval, numberOfPlayedGame = 0,
    timer, animalCards, result = 0,
    cardsToCompare = [],
    cardSources = [],
    cardPairs = [],
    firstHalf = [];
  const blankCard = "images/mem_card.png";

  const restart = () => {
    const animalCardImgs = animalCards.getElementsByTagName("img");
    for (var i = 0; i < animalCardImgs.length; i++) {
      animalCardImgs[i].src = blankCard;
      animalCardImgs[i].style = "opacity:1";
    }
    if (timer.innerHTML != "Time:0:00") {
      timer.innerHTML = "Time:1:59";
      clearInterval(interval);
    }
  };

  const animateCards = (previousCard, currentCard, matched = false) => {
    wait(1300, () => {
      previousCard.classList.remove("transformationN");
      currentCard.classList.remove("transformationN");

      if (!matched) {
        previousCard.src = blankCard;
        currentCard.src = blankCard;
      } else {
        previousCard.src = previousCard.firstElementChild.src;
        currentCard.src = currentCard.firstElementChild.src;
      }
    });
    //Reverse rotation
    currentCard.classList.add("transformationM");
    previousCard.classList.add("transformationM");
  };

  const openCard = (event) => {
    cardsToCompare.push(event.target);
    let length = cardsToCompare.length;

    if (gameOn) {
      if (cardsToCompare.length % 2 == 0 && cardsToCompare.length > 0) {
        if (cardsToCompare[length - 1].firstElementChild.src != cardsToCompare[length - 2].firstElementChild.src) {
          cardsToCompare[length - 1].classList.add("transformationN");
          cardsToCompare[length - 2].classList.add("transformationN");

          cardsToCompare[length - 1].src = cardsToCompare[length - 1].firstElementChild.src;
          cardsToCompare[length - 2].src = cardsToCompare[length - 2].firstElementChild.src;
          animateCards(cardsToCompare[length - 1], cardsToCompare[length - 2]);

          cardsToCompare[length - 1].alt = "changed";
          cardsToCompare[length - 2].alt = "changed";
        } else if (cardsToCompare[length - 1].src == cardsToCompare[length - 2].src && cardsToCompare[length - 1].parentElement.id != cardsToCompare[length - 2].parentElement.id) {
          cardsToCompare[length - 1].style.opacity = "0.3";
          cardsToCompare[length - 2].style.opacity = "0.3";
          animateCards(cardsToCompare[length - 1], cardsToCompare[length - 2], true);
          result++;
        }
        if (result == 12) {
          btnWinnerToggle.click();
          document.getElementById("currentScore").innerHTML = result;
          restart();
        }
      }
    }
  };
  const getRandomCard = () => {
    let randomCard = cardSources[Math.floor(Math.random() * cardSources.length)];
    cardPairs.push(randomCard);
    return randomCard;
  };
  const getCounterOfCardAppearedInArray = (randomCard) => {
    let counterOfCurrentCard = 0;
    cardPairs.filter((card) => {
      if (card === randomCard) 
       ++counterOfCurrentCard;
    });
    return counterOfCurrentCard;
  };
  const generate12Pairs = () => {
    let randomCardApproved = getRandomCard();
    if (getCounterOfCardAppearedInArray(randomCardApproved) < 2) {
      return randomCardApproved;
    } else {
      return generate12Pairs();
    }
  };
  //Algorithm to get 12 pairs of cards, non duplicate pairs, one card by one.
  const getCardPairs = () => {
    return generate12Pairs();
  };
  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  const createCardsDynamically = (array, i) => {
    let div = document.createElement("div");
    div.style.cssFloat = "left";
    div.setAttribute("id", "card" + i);

    let blank = document.createElement("IMG");
    blank.setAttribute("class", "card");
    blank.setAttribute("src", blankCard);

    let realCard = document.createElement("IMG");
    realCard.setAttribute("class", "card");

    if(!array) {
      realCard.setAttribute("src", getCardPairs());
      firstHalf.push(realCard.src);
    } else {
      realCard.setAttribute("src", array[i]);
    }
    realCard.setAttribute("visibility", "hidden");
    blank.appendChild(realCard);

    div.appendChild(blank);
    div.setAttribute("class", "cardWrap");
    animalCards.appendChild(div);
  }
  const generateTwoHalfOfCards = () => {
    //Generate first half,then call shuffle 
    for (var i = 0; i < 12; i++) {
      createCardsDynamically();
    }
    shuffleArray(firstHalf);
    for (var i = 0; i< 12; i++) {
      createCardsDynamically(firstHalf, i);
    }
  }
  const renderMemoryCards = () => {
    for (var i = 1; i <= 12; i++) {
      cardSources.push("images/mem_" + i + ".png");
    }
    generateTwoHalfOfCards();

    let cardWraps = [...animalCards.getElementsByTagName("div")];
    cardWraps.forEach(div => {
      div.addEventListener('click', openCard);
    });
  };

  const getRemainingTimeToPlay = (time) => {
    let minutes = 0;
    let start = time.indexOf(":", 0);
    let remanining = time.substr(start + 1, time.length - start);
    minutes = parseInt(remanining[0]);
    let secondLastDigit = parseInt(remanining[remanining.indexOf(":", 0) + 2]);
    secondLastDigit--;

    let secondFirstDigit = parseInt(remanining[remanining.indexOf(":", 0) + 1]);
    if (secondLastDigit < 0) {
      secondFirstDigit--;
      secondLastDigit = 9;
    } else if (secondFirstDigit == 0 && secondLastDigit == 0 && minutes != 0) {
      minutes = 0;
      secondFirstDigit = 5;
      secondLastDigit = 9;
    }
    return {
      minutes: minutes,
      firstDigit: secondFirstDigit,
      lastDigit: secondLastDigit
    };
  };

  const runTimer = () => {
    //TIMER
    let time = "";
    let remaining = getRemainingTimeToPlay(timer.innerHTML);

    wait(10, () => {
      time = "Time" + ":" + remaining.minutes.toString() + ":" + remaining.firstDigit.toString() + "" + remaining.lastDigit;
      if (timer.innerHTML != "Time:0:00")
        timer.innerHTML = time;

      if (timer.innerHTML === "Time:0:00") {
        timer.innerHTML = "Time:1:59";
        btnLoserToggle.click();
        clearInterval(interval);
        restart(); //to refresh game

        //Save score
        const score = {
          user: localStorage.getItem("user"),
          score: result
        };
        let scoredPre = [];
        if (localStorage.getItem("score")) {
           let previous = JSON.parse(localStorage.getItem("score"));
           scoredPre.push(previous);
           scoredPre.push(score);
        } 
        localStorage.setItem("score", JSON.stringify(scoredPre));
      }
    });
  };

  const startGame = () => {
    if (document.getElementById("inpt1").checked) {
      interval = setInterval(runTimer, 1000);
      gameOn = true;
    } else {
      alert('Morate odabrati tip igre prvo');
    }
    numberOfPlayedGame = localStorage.getItem("numberOfPlayedGames");
    if (numberOfPlayedGame == null)
      numberOfPlayedGame = 0;

    numberOfPlayedGame++;
    localStorage.setItem("numberOfPlayedGames", numberOfPlayedGame);
  };

  const getScores = () => {
    let scoredPre = JSON.parse(localStorage.getItem("score"));
    let scoreModal = document.getElementById('topScoreModal');
    let closeModal = document.getElementById('closeTopScore');
    let scoreResultDiv = scoreModal.querySelector('#idn');

    scoredPre.sort((a,b) => {
     return -(a > b)  || + (a < b) 
    });
    if (scoredPre.length > 5) {
      scoredPre = scoredPre.slice(0, 5);
    }
    scoredPre.forEach(item => {
     scoreResultDiv.innerHTML += `<p>${item.user}: <b>${item.score}</b></p>`
    });
    modalToggle(scoreModal);

    closeModal.addEventListener("click", () => {
      modalToggle(scoreModal, 'yes');
    });
  }

  const modalToggle = (modal, close) => {
    if (!close) {
      modal.classList.add('show');
    } else {
      modal.classList.remove('show');
    }
  };
  const events = () => {
    //play game && startTIMER
    document.getElementById("btnStartGame").addEventListener("click", startGame);
    document.getElementById("btnTopScores").addEventListener("click", getScores);

    //playAgain
    document.getElementById("again").addEventListener("click", restart);

    //opening modals
    btnWinnerToggle.addEventListener("click", () => {
      modalToggle(winnerModal);
    });
    btnLoserToggle.addEventListener("click", () => {
      modalToggle(loserModal);
    });
    //closing modal
    btnCloseWinnerModal.addEventListener("click", () => {
      modalToggle(winnerModal, 'yes');
    });
    btnCloseLoserModal.addEventListener("click", () => {
      modalToggle(loserModal, 'yes');
    });
  };

  const greeting = () => {
    const user = prompt("Vase ime:");
    if (user) {
      localStorage.setItem("user",user);
    } 
  }

  const dom = () => {
    winnerModal = document.getElementById("winnerModal");
    loserModal = document.getElementById('loserModal');
    btnCloseWinnerModal = document.getElementById("btnCloseWinner");
    btnCloseLoserModal = document.getElementById('btnCloseLoser');
    btnWinnerToggle = document.getElementById('btnWinnerResult');
    btnLoserToggle = document.getElementById('btnLoserResult');
    timer = document.getElementById("timer");
    animalCards = document.getElementById("main");
    greeting();
    renderMemoryCards();
    events();
  };
  dom();
};

init();