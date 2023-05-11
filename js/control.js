var hero = document.getElementById("hero");
var alarmIndicator = document.getElementById("alarm-indicator");
var sceneBlocker = document.querySelector(".scene-blocker");
var heroBoundingRect = hero.getBoundingClientRect();
var heroHeight = hero.offsetHeight;
var viewportHeight = window.innerHeight;
var cmd = "-";
var wind = 0, windy = 1.5, windProp = 1;
var heroTransState = "idle";
var excitement = 0, heat = 0, wetness = 0;
var saveExcitement = 0, saveHeat = 0, saveWetness = 0;
var alarmTriggers = 0;
var allMeters = document.querySelector("main .meters"),
    excitementMeter = document.querySelector("main .meters .excitement"),
    heatMeter = document.querySelector("main .meters .heat"),
    wetnessMeter = document.querySelector("main .meters .wetness");
var excitementMeterState = document.querySelector("main .meters .excitement .zero"),
    heatMeterState = document.querySelector("main .meters .heat .zero"),
    wetnessMeterState = document.querySelector("main .meters .wetness .zero");
var windDirection = document.querySelector("main .wind .direction");
var flap = document.querySelector(".flap");


document.body.addEventListener('keydown', (e) => {
    processInput(e);
});

hero.addEventListener('transitionend', function() {
  heroTransState = "idle";
});

function registerTimeout(id) {
    timeoutIds.push(id);
}

function triggerAlarm(mode) {

    if (mode === "dead") {

        showFlash("red", 8);

        // play animation
        hero.style.transform = "rotate(-140deg)";
        hero.classList.add("dead");

        // reset collision candidates
        collisionCandidates = [];

        // fade out
        sceneBlocker.classList.add("fade-in");
        // fade back in
        window.setTimeout(function() {
            sceneBlocker.classList.remove("fade-in");
            sceneBlocker.classList.add("fade-out");
        }, 1500);

        window.setTimeout(function() {

            hero.style.transform = "";
            hero.classList.remove("dead");

            // restore meters
            excitement = saveExcitement;
            heat = saveHeat;
            wetness = saveWetness;
            updateHeat();
            updateWetness();
            updateExcitement();

            // reset all registered timeouts
        
            for (let i = 0; i < timeoutIds.length; i += 1) {
                window.clearTimeout(timeoutIds[i]);
            }

            timeoutIds = [];

            // remove all active objects
            objectStrip.innerHTML = "";
            storyStrip.innerHTML = "";

            // reset collision candidates
            collisionCandidates = [];

            restartCurrentStory();

        }, 1100);

    } else {

        alarmTriggers += 1;

        if (alarmTriggers >= 10) {
            triggerAlarm("dead");
        }

        if (heat === 100) {
            showFlash("orange", alarmTriggers);
        } else if (wetness === 100) {
            showFlash("lightseagreen", alarmTriggers);
        } else if (excitement === 100) {
            showFlash("purple", alarmTriggers);
        }
    }
}

function showFlash(color, intensity) {

    alarmIndicator.style.boxShadow = "inset 0 0 20vw " + color;
    alarmIndicator.style.zIndex = 35;
    alarmIndicator.style.opacity = 0.1 * intensity;

    window.setTimeout(function() {
        alarmIndicator.style.opacity = 0;
    }, 250);

    window.setTimeout(function() {
        alarmIndicator.style.zIndex = 0;
    }, 500);
}

function monitorHero() {
    heroBoundingRect = hero.getBoundingClientRect();
    viewportHeight = window.innerHeight;
}

function checkStates() {

    if (weatherCondition === "normal") {

        if (heroBoundingRect.y < viewportHeight / 3.8) {
            raiseHeat(2);
            lowerWetness(1);
        } else if (heroBoundingRect.y < viewportHeight / 3.2) {
            raiseHeat(1);
            lowerWetness(0.5);
        } else if (heroBoundingRect.y + heroHeight  > viewportHeight / 1.3) {
            raiseWetness(2);
            lowerHeat(1);
        } else if (heroBoundingRect.y + heroHeight  > viewportHeight / 1.4) {
            raiseWetness(1);
            lowerHeat(0.5);
        } else {
            resetStates();
        }

    } else if (weatherCondition === "storm") {

        if (heroBoundingRect.y + heroHeight  > viewportHeight / 1.3) {
            raiseWetness(2);
            lowerHeat(1);
        } else {
            raiseWetness(1);
            lowerHeat(0.5);
        }

    } else if (weatherCondition === "hot") {

        if (heroBoundingRect.y < viewportHeight / 3.2) {
            raiseHeat(2);
            lowerWetness(1);
        } else {
            raiseHeat(1);
            lowerWetness(0.5);
        }

    } 

    if (heat === 100 || wetness === 100 || excitement === 100) {
        triggerAlarm();
    } else {
        if (alarmTriggers > 0) {
          alarmTriggers -= 1;
        }
    }

}

function adjustHero() {

    if (heroTransState === "up") {
        if (cmd === "down") {
            hero.style.transform = "translateY(" + (heroBoundingRect.y) + "px)";
            heroTransState = "idle";
            cmd = "-";
        }
    }
    if (heroTransState === "down") {
        if (cmd === "up") {
            hero.style.transform = "translateY(" + (heroBoundingRect.y) + "px)";
            heroTransState = "idle";
            cmd = "-";
        }
    }
    if (heroTransState === "idle") {
        if (cmd === "up") {
            flap.play();
            let heroTransitionDuration = 3 - (Math.floor(wind / 33 * 10) / 10) + (Math.floor(wetness / 44 * 10) / 10);

            if (heroTransitionDuration < 1.4) { heroTransitionDuration = 1.4; }
            if (playMode === "normal" && heroTransitionDuration < 3) { heroTransitionDuration = 3; }

            //debugThis("tra: " + heroTransitionDuration + " win: " + wind + " hot: " + heat + " wet: " + wetness + " exc: " + excitement);

            hero.style.transitionDuration = heroTransitionDuration + "s";
            hero.style.transform = "translateY(25vh)";
            heroTransState = "up";
            raiseExcitement(1);
            cmd = "-";

        } else if (cmd === "down") {
            flap.play();
            let heroTransitionDuration = 3 + (Math.floor(wind / 22 * 10) / 10) - (Math.floor(wetness / 33 * 10) / 10);

            if (heroTransitionDuration < 1.4) { heroTransitionDuration = 1.4; }
            if (playMode === "normal" && heroTransitionDuration < 3) { heroTransitionDuration = 3; }

            debugThis("tra: " + heroTransitionDuration + " win: " + wind + " hot: " + heat + " wet: " + wetness + " exc: " + excitement);

            hero.style.transitionDuration = heroTransitionDuration + "s";
            hero.style.transform = "translateY(75vh)";
            heroTransState = "down";
            raiseExcitement(1);
            cmd = "-";
        }
    }
}

function adjustWind() {
    // 1) decide if wind changes
    let rollChange = Math.floor(Math.random() * 10); // 0-9
    rollChange *= windProp; // 0-9 / 0-18
    if (rollChange >= 5) {
        // wind changes
        let rollAmount = Math.floor(Math.random() * 10 + 5); // 10-24
        rollAmount =  Math.floor(rollAmount * windy); // 10-24 / 20-48

        let rollDirection = Math.floor(Math.random() * 10);

        // make opposite direction more likely
        rollDirection += Math.floor(wind / 10);

        if (rollDirection >= 5) {
            wind -= rollAmount;
        } else {
            wind += rollAmount;
        }

        updateWind();
    }
}

function updateWind() {
  windDirection.style.transform = "rotate(" + (-1*wind) + "deg)";
}

function processInput(e) {
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        cmd = "up";
    } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        cmd = "down";
    }
    if (e.key === "Escape" || e.key === "q" || e.key === "Q") {
        if (playMode && playMode !== undefined) {
            toggleUIGameMenu();
        }
    } else if (e.key === "F8") {
        showIndicators = !showIndicators;
    }
}

function raiseExcitement(factor) {
  excitement += (1 * factor);
  updateExcitement();
  excitementMeter.classList.add("rising");
  window.setTimeout(function() {
    excitementMeter.classList.remove("rising");
  }, 1000);
}

function raiseHeat(factor) {
  if (wetness > 0) { factor = factor / 1.5; }
  heat += (1 * factor);
  updateHeat();
  heatMeter.classList.remove("falling");
  heatMeter.classList.add("rising");
        //debugThis("heat +" + (1 * factor) + " // heat: " + heat);
  if (heat > 100) {
    heat = 100;
  }
}

function raiseWetness(factor) {
  if (heat > 0) { factor = factor / 1.5; }
  wetness += (1 * factor);
  updateWetness();
  wetnessMeter.classList.remove("falling");
  wetnessMeter.classList.add("rising");
  if (wetness > 100) {
    wetness = 100;
  }
        //debugThis("wet +" + (1 * factor) + " // wet: " + wetness);
}

function lowerHeat(factor) {
  heat -= factor;
  heatMeter.classList.remove("rising")
  if (heat > 0) {
      updateHeat();
      heatMeter.classList.add("falling");
  } else {
        heat = 0;
  }
        //debugThis("heat -" + factor);
}

function lowerWetness(factor) {
  wetness -= factor;
  wetnessMeter.classList.remove("rising");
  if (wetness > 0) {
      updateWetness();
      wetnessMeter.classList.add("falling");
  } else {
        wetness = 0;
  }
        //debugThis("wet -" + factor);
}

function updateExcitement() {
  if (65 - excitement > 0) {
      excitementMeterState.style.height = (65 - Math.floor(excitement)) + "%";
  } else {
      excitementMeterState.style.height = 0;
  }
}

function updateHeat() {
  if (68 - Math.floor(heat / 2) > 0) {
      heatMeterState.style.height = (68 - Math.floor(heat / 2)) + "%";
  } else {
      heatMeterState.style.height = 0;
  }
}

function updateWetness() {
  if (70 - Math.floor(wetness / 2) > 0) {
      wetnessMeterState.style.height = (70 - Math.floor(wetness / 2)) + "%";
  } else {
      wetnessMeterState.style.height = 0;
  }
}

function resetStates() {
  wetnessMeter.classList.remove("falling");
  wetnessMeter.classList.remove("rising");
  heatMeter.classList.remove("falling");
  heatMeter.classList.remove("rising");
}