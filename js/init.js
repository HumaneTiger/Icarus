var uiBlocker = document.querySelector(".ui-blocker");
var startDialog = document.querySelector("aside.start");
var gameDialog = document.querySelector("aside.game");
var prologuePage = 1;

function runAllIntervals() {
    window.setInterval(function() {
        monitorHero();
    }, 200);

    window.setInterval(function() {
        adjustHero();
    }, 200);

    if (playMode === "hard") {
        window.setInterval(function() {
            adjustWind();
        }, 2000);
    } else {
        wind = 0;
    }

    window.setInterval(function() {
        checkStates();
    }, 1000);

    window.setInterval(function() {
        checkForCollisions();
    }, 50);
}

function startPrologue() {
    startDialog.classList.add("prologue");
    document.querySelector("aside .prologue-cont.page-1").classList.remove("hidden");
}

function prevPrologue() {
    document.querySelector("aside .prologue-cont.page-" + prologuePage).classList.add("hidden");
    if (prologuePage > 1) {
        prologuePage -= 1;
        document.querySelector("aside .prologue-cont.page-" + prologuePage).classList.remove("hidden");
        document.querySelector("aside .prologue-navi .next").classList.remove("hidden");
    }
    if (prologuePage === 1) {
        document.querySelector("aside .prologue-navi .prev").classList.add("hidden");
    }
}

function nextPrologue() {
    document.querySelector("aside .prologue-cont.page-" + prologuePage).classList.add("hidden");
    if (prologuePage < 3) {
        prologuePage += 1;
        document.querySelector("aside .prologue-cont.page-" + prologuePage).classList.remove("hidden");
        document.querySelector("aside .prologue-navi .prev").classList.remove("hidden");
    }
    if (prologuePage === 3) {
        document.querySelector("aside .prologue-navi .next").classList.add("hidden");
    }
}

function prepareGame() {

    runAllIntervals();

    initSunnySky();
    initWaves();

    hero.classList.remove("hidden");
    allMeters.classList.remove("hidden");

    if (playMode === "hard") {
        document.querySelector("main .wind").classList.remove("hidden");
    }

    window.setTimeout(function() {
        startFlying();
        addingSunsInterval();
        addingWavesInterval();
        addingDesertInterval();
    }, startDelay);

}

function hideUI() {

    uiBlocker.classList.add("fade-out");
    startDialog.classList.add("fade-out");

    window.setTimeout(function() {
        uiBlocker.classList.add("hidden");
        startDialog.classList.add("hidden");
    }, 800);
}


function startTutorial() {
    
    playMode = "normal";

    prepareGame();

    hideUI();

    let audio = allAudio.querySelector(".waves");
    audio.volume = 0.5; audio.play();

    startChapterTheBeginning();

}

function playNormal() {
    
    playMode = "normal";
    prepareGame();

    hideUI();

    let audio = allAudio.querySelector(".waves");
    audio.volume = 0.5; audio.play();
    startChapterShoreOfTheDeadlyCliffs(true);
    
}

function playHard() {

    playMode = "hard";

    prepareGame();

    hideUI();

    let audio = allAudio.querySelector(".waves");
    audio.volume = 0.5; audio.play();

    startChapterShoreOfTheDeadlyCliffs(true);

}

function toggleUIGameMenu() {
	if (gameDialog.classList.contains("hidden")) {
		uiBlocker.classList.remove("start");
		uiBlocker.classList.remove("fade-out");
		uiBlocker.classList.remove("hidden");
		gameDialog.classList.remove("hidden");
	} else {
		uiBlocker.classList.add("hidden");
		gameDialog.classList.add("hidden");
	}
}

function initUI() {

    document.querySelector("aside button[name='prologue']").addEventListener("click", function(ev) {
	    ev.preventDefault();
        startPrologue();
    });

    document.querySelector("aside button[name='tutorial']").addEventListener("click", function(ev) {
	    ev.preventDefault();
        startTutorial();
    });

    document.querySelector("aside button[name='prolo-tutorial']").addEventListener("click", function(ev) {
	    ev.preventDefault();
        startTutorial();
    });

    document.querySelector("aside button[name='play']").addEventListener("click", function(ev) {
	    ev.preventDefault();
	    document.querySelector("aside li.play").classList.add("hidden");
	    document.querySelector("aside li.play-modes").classList.remove("hidden");
    });

    document.querySelector("aside button[name='play-normal']").addEventListener("click", function(ev) {
	    ev.preventDefault();
        playNormal();
    });

    document.querySelector("aside button[name='prolo-play-normal']").addEventListener("click", function(ev) {
	    ev.preventDefault();
        playNormal();
    });

    document.querySelector("aside button[name='play-hard']").addEventListener("click", function(ev) {
	    ev.preventDefault();
        playHard();
    });

    document.querySelector("aside button[name='credits']").addEventListener("click", function(ev) {
	    document.querySelector("aside button[name='credits']").classList.add("hidden");
	    document.querySelector("aside.start").classList.add("credits");
	    document.querySelector("aside.start div.credits").classList.add("show");
    });

    document.querySelector("aside .prologue-navi .prev").addEventListener("click", function(ev) {
	    ev.preventDefault();
        prevPrologue();
    });

    document.querySelector("aside .prologue-navi .next").addEventListener("click", function(ev) {
	    ev.preventDefault();
        nextPrologue();
    });

    gameDialog.querySelector("button[name='continue']").addEventListener("click", function(ev) {
		toggleUIGameMenu();
	}.bind(gameDialog));

    gameDialog.querySelector("button[name='quit']").addEventListener("click", function(ev) {
		location.reload();
	});

}

(function () {
    initUI();
})();