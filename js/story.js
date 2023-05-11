var storyStrip = document.querySelector("main .story-strip"),
    protoStory = document.querySelector("main .story");

var rainDrop = document.querySelector("main .rain-drop"), drops = 0;
var thunderInterval;
var allAudio = document.getElementById("all-audio");

var currentStory;
var allStories = [];
var storyIndex = 0;
var storyInterval;


function addStory() {

    if (allStories[storyIndex] !== undefined) {

        let newStory = storyStrip.appendChild(protoStory.cloneNode(true));
        let story1 = allStories[storyIndex][0],
            story2 = allStories[storyIndex][1];

        let paragraph1, paragraph2;

        paragraph1 = "<p class=\"golden\" data-heading=\"" + story1 + "\">" + story1 + "</p>";

        if (story2) {
            paragraph2 = "<p class=\"golden\" data-heading=\"" + story2 + "\">" + story2 + "</p>";
        }

        newStory.innerHTML = paragraph1;

        if (paragraph2) {
            newStory.innerHTML += paragraph2;
        }
    
        newStory.classList.remove("hidden")

        timeoutId = window.setTimeout(function() {
            newStory.classList.add("go");
        }, 100);
        registerTimeout(timeoutId);
    
        if (storyIndex % 3 === 0) {
            newStory.style.top = "32vh";
        } else if (storyIndex % 3 === 1) {
            newStory.style.top = "46vh";
        } else {
            newStory.style.bottom = "27vh";
        }

        storyIndex += 1;

    } else {

        window.clearInterval(storyInterval);

    }

}

function pushStory(story1, story2) {

    allStories.push([story1, story2]);

};

function resetStories() {

    allStories = [];
    storyIndex = 0;
    window.clearInterval(storyInterval);
    storyStrip.innerHTML = "";

};

function itsHammerTime(extraTime) {
    
    extraTime = extraTime || 0;

    timeoutId = window.setTimeout(function() {

        addStory();

        storyInterval = window.setInterval(function() {
            addStory();
        }, 10000);

    }, 2000 + extraTime);
    registerTimeout(timeoutId);

}

function restartCurrentStory() {

    resetStories();
    addingObjectDelay = startDelay;

    if (currentStory === "beginning") {
        startChapterTheBeginning();
    } else if (currentStory === "deadly-cliffs") {
        startChapterShoreOfTheDeadlyCliffs();
    } else if (currentStory === "wrath-of-gods") {
        startChapterTheWrathOfTheGods();
    } else if (currentStory === "scorching-suns") {
        stopStorm();
        startChapterLandOfTheScorchingSuns();
    }

}

function triggerNextStory() {

    resetStories();
    addingObjectDelay = startDelay;

    saveExcitement = excitement;
    saveHeat = heat;
    saveWetness = wetness;

    if (currentStory === "beginning") {
        startChapterShoreOfTheDeadlyCliffs();
    } else if (currentStory === "deadly-cliffs") {
        startChapterTheWrathOfTheGods();
    } else if (currentStory === "wrath-of-gods") {
        stopStorm();
        startChapterLandOfTheScorchingSuns();
    } else if (currentStory === "scorching-suns") {
        startChapterTheEnd();
    }

}

function showSceneName(name, longer) {

    let scene = document.getElementById("scene-name");

    longer = longer || 1;

    scene.querySelector(".inner").innerHTML = "<p class=\"golden\" data-heading=\"" + name + "\">" + name + "</p>";
    scene.classList.remove("hidden");

    window.setTimeout(function() {
        scene.classList.add("show");
    }, 100);
    window.setTimeout(function() {
        scene.classList.remove("show");
    }, 2500 * longer);
    window.setTimeout(function() {
        scene.classList.add("hidden");
    }, 3500 * longer);
    if (name === "The End") {
        window.setTimeout(function() {
            document.querySelector(".thank-you").style.opacity = "1";
        }, 3000);
    }
}

function addTower() {
    let tower = document.querySelector("main .tower");
    tower.classList.remove("hidden");
    window.setTimeout(function() {
        tower.classList.add("go");
    }, 2500);
}

function startChapterTheBeginning() {

    addTower();

    currentStory = "beginning";
    showSceneName("The Beginning");

    audioVolumeIn(allAudio.querySelector(".enigmatic"));

    addObject(protoGull1.cloneNode(true), 20000);
    addObject(protoGull2.cloneNode(true), 2500);
    addObject(protoCliff2.cloneNode(true), 9000);
    addObject(protoShippy.cloneNode(true), 4000);
    addObject(protoShippy.cloneNode(true), 55000, true);

    pushStory("You leap from the tower. Your father is somewhere",
              "behind you, not too far, but out of your sight.");
    pushStory("With your wings, you are gliding through the air.",
              "Like a majestic eagle, not like these flappy birdies!");

    pushStory("Press S or ⬇ to descend towards the sea.",
              "Press W or ⬆ to stop decending.");
    pushStory("Press W or ⬆ to rise up towards the sun.",
              "Press S or ⬇ to stop rising.");

    pushStory("You are the first mortal ever to fly! Now the",
              "warnings of your father come to your mind...");

    pushStory("Flying near the ocean will 💧 dampen your",
              "wings and make them too heavy to use.");
    pushStory("Flying too near the sun, the 🔥 heat will melt",
              "the wax and your wings will disintegrate.");
    pushStory("Therefore, the key to your escape will be in",
              "keeping to the middle and to balance things out.");
              
    pushStory("The ⚡ ecstasy of flight will slowly raise, until",
              "you are overwhelmed by the feeling of divine power.");

    pushStory("Icarus, you are ready now. Time to face your faith.",
              "Good luck and remember the warnings of your father!");

    itsHammerTime();

}

function startChapterShoreOfTheDeadlyCliffs(firstScene) {

    currentStory = "deadly-cliffs";
    showSceneName("Shore Of The Deadly Cliffs");

    if (firstScene) {
        addTower();
        audioVolumeIn(allAudio.querySelector(".enigmatic"));
    }
    
    addObject(protoCliff1.cloneNode(true), 2500);
    addObject(protoCliff2.cloneNode(true), 1200);
    addObject(protoGull1.cloneNode(true), 2000);
    addObject(protoCliff2.cloneNode(true), 0);
    addObject(protoGull2.cloneNode(true), 2500);
    addObject(protoShippy.cloneNode(true), 2400);
    addObject(protoGull1.cloneNode(true), 1800);
    addObject(protoCliff2.cloneNode(true), 1000);
    addObject(protoCliff3.cloneNode(true), 1000);
    addObject(protoGull2.cloneNode(true), 5000);
    addObject(protoGull1.cloneNode(true), 600);
    addObject(protoCliff4.cloneNode(true), 2000);
    addObject(protoGull2.cloneNode(true), 2500);
    addObject(protoGull1.cloneNode(true), 1500);
    addObject(protoGull3.cloneNode(true), 800);
    addObject(protoShippy.cloneNode(true), 1500); /* 1000 */
    addObject(protoGull2.cloneNode(true), 1500);
    addObject(protoCliff1.cloneNode(true), 2500, true);

    addObject(protoGull1.cloneNode(true), 1800);
    addObject(protoCliff2.cloneNode(true), 1000);
    addObject(protoCliff3.cloneNode(true), 1000);
    addObject(protoGull1.cloneNode(true), 5000);
    addObject(protoShippy.cloneNode(true), 0);

    pushStory("King and Gods haven't noticed your escape for now.",
              "But the region ahead is dangerous nevertheless.");

    itsHammerTime();

}

function startChapterTheWrathOfTheGods() {

    currentStory = "wrath-of-gods";

    audioVolumeOut(allAudio.querySelector(".enigmatic"));
    audioVolumeIn(allAudio.querySelector(".instinct"));

    showSceneName("The Wrath Of The Gods");

    timeoutId = window.setTimeout(function() { startStorm(); }, 24000);
    registerTimeout(timeoutId);

    addObject(protoCliff4.cloneNode(true), 2500);
    addObject(protoGull2.cloneNode(true), 2300);
    addObject(protoCliff3.cloneNode(true), 1000);
    addObject(protoGull1.cloneNode(true), 5000);
    addObject(protoGull3.cloneNode(true), 600);
    addObject(protoGull1.cloneNode(true), 500);
    addObject(protoCliff2.cloneNode(true), 3200);
    addObject(protoGull2.cloneNode(true), 1900);
    addObject(protoGull1.cloneNode(true), 700);
    addObject(protoShippy.cloneNode(true), 1300);
    
    // storm starts here
    addObject(protoGull1.cloneNode(true), 4500);
    addObject(protoGull3.cloneNode(true), 300);
    addObject(protoGull1.cloneNode(true), 400);
    addObject(protoCliff1.cloneNode(true), 2000);
    addObject(protoGull3.cloneNode(true), 2300);
    addObject(protoShippy.cloneNode(true), 100);
    addObject(protoGull2.cloneNode(true), 600);
    addObject(protoCliff2.cloneNode(true), 2500);
    addObject(protoGull2.cloneNode(true), 3600);

    addObject(protoGull1.cloneNode(true), 2300);
    addObject(protoGull3.cloneNode(true), 800);

    /* octopus time! */
    addOctopus(1500); //4600

    addObject(protoGull2.cloneNode(true), 2500);
    addObject(protoGull1.cloneNode(true), 1300);

    addObject(protoGull3.cloneNode(true), 4500);
    addObject(protoGull1.cloneNode(true), 500);

    addObject(protoCliff3.cloneNode(true), 5200); //14000

    addObject(protoShippy.cloneNode(true), 3400);
    addObject(protoCliff4.cloneNode(true), 4000);

    addObject(protoGull3.cloneNode(true), 5200);
    addObject(protoGull1.cloneNode(true), 1300);
    addObject(protoGull2.cloneNode(true), 2800);
    addObject(protoCliff2.cloneNode(true), 1200);

    addOctopus(100); // 18000

    addObject(protoGull2.cloneNode(true), 2500);
    addObject(protoGull1.cloneNode(true), 300);
    addObject(protoGull3.cloneNode(true), 500);

    addObject(protoShippy.cloneNode(true), 2800);
    addObject(protoGull1.cloneNode(true), 1700);

    addObject(protoCliff1.cloneNode(true), 6200); //14000

    addObject(protoCliff4.cloneNode(true), 2000);
    addObject(protoGull2.cloneNode(true), 2500);
    addObject(protoGull2.cloneNode(true), 1500);
    addObject(protoShippy.cloneNode(true), 1800);
    addObject(protoGull1.cloneNode(true), 2300);
    addObject(protoCliff2.cloneNode(true), 1000);
    addObject(protoCliff3.cloneNode(true), 1800);
    addObject(protoGull1.cloneNode(true), 5000, true);

    pushStory("Suddenly you hear a roaring voice",
              "from far above the sky...");
    pushStory("'This man is defying the natural laws! No mortal",
              "does so without consequences!', the Gods shout.");
    pushStory("You provoked the gods... The sky turns dark.",
              "Lightnings struck and thunders rumble.");
    pushStory("As you look down, you see something big and",
              "truly scary climbing up from the depths of of sea.");
    pushStory("'Oh no!' — you say, when you realize, what an",
              "aweful beast the Gods summoned in their rage.");
    pushStory("It is ... a giant Octopus!");
    pushStory("The wings are soaked with rain and seawater.",
              "You decent like a stone, and also rise like one.");
    pushStory("'This thing better doesn't come back!' you think.",
              "But speaking of the devil...");
    pushStory("");
    pushStory("The wings now sound like two sacks filled with water.",
              "If the sun doesn't come back, you will be dead soon.");
    pushStory("Finally there is land in sight. And with it,",
              "the storm subsides and the sun comes out again.");

    itsHammerTime(3000);

}

function startChapterLandOfTheScorchingSuns() {

    currentStory = "scorching-suns";
    weatherCondition = "hot";
    document.body.classList.add("weather-hot");

    audioVolumeOut(allAudio.querySelector(".waves"));
    audioVolumeOut(allAudio.querySelector(".instinct"));
    
    window.setTimeout(function() {
        audioVolumeIn(allAudio.querySelector(".enigmatic"), 0.5);
        audioVolumeIn(allAudio.querySelector(".desert"), 0.7);
    }, 500);

    showSceneName("Land Of The Scorching Suns");

    pushStory("Leaving the raging sea and frightfully monsters",
              "behind, you now fly over bone-dry land.");
    pushStory("The heat from above becomes almost instantly",
              "unbearable, but at least your wings start to dry.");
    pushStory("A small Oasis is coming into view. 'A save place",
              "for starting a new life', you think.");
    pushStory("You successfully escaped!");

    timeoutId = window.setTimeout(function() {
        triggerNextStory();
    }, 37000);
    registerTimeout(timeoutId);

    addObject(goal.cloneNode(true), 32000, true);

    itsHammerTime();

}

function startChapterTheEnd() {

    currentStory = "the-end";
    collisionCandidates = [];

    sceneBlocker.classList.add("the-end");

    window.setTimeout(function() {
        sceneBlocker.classList.add("fade-in");        
    }, 3000);
    window.setTimeout(function() {
        showSceneName("The End", 3);
        window.setTimeout(function() {
            document.location.reload();
        }, 10000);
    }, 6000);

}

function startStorm() {
    timeoutId = window.setTimeout(function() {
        startRain();
    }, 4000);
    registerTimeout(timeoutId);
    
    window.clearInterval(thunderInterval);

    thunderInterval = window.setInterval(function() {
        if (Math.random() > 0.5) {
            let audio = allAudio.querySelector(".thunder");
            audio.volume = 0.6; audio.play();
            thunder1.classList.add("play");
            thunder2.classList.add("play");
            window.setTimeout(function() {
                thunder1.classList.remove("play");
                thunder2.classList.remove("play");
            }, 1500);
        }
    }, 6000);

    document.body.classList.add("weather-storm");

    weatherCondition = "storm";
}

function startRain() {
    
    audioVolumeIn(allAudio.querySelector(".rain-thunder"), 0.8);

    let rainInterval = window.setInterval(function() {
        let drop = document.querySelector("main .rain-container").appendChild(rainDrop.cloneNode());
        drop.style.left = Math.floor(Math.random() * 100) + "vw";
        drops++;
        if (drops >= 50) {
            window.clearInterval(rainInterval);
        }
    }, 200);
}

function stopStorm() {
    window.clearInterval(thunderInterval);
    document.body.classList.remove("weather-storm");
    stopRain();
}

function stopRain() {
    audioVolumeOut(allAudio.querySelector(".rain-thunder"));
    document.querySelector("main .rain-container").classList.add("hidden");
}

/*
When the heat from the sun melted the wax on his wings,
Icarus fell from the sky.

both men paid for their departure from the path of moderation dearly,
Icarus with his life

*/

function audioVolumeIn(q, iVolume) {
    if(q.volume){
        var InT = 0;
        var setVolume = iVolume || 0.6; // Target volume level for new song
        var speed = 0.002; // Rate of increase
        q.volume = InT;
        q.play();
        var eAudio = setInterval(function(){
            InT += speed;
            q.volume = InT.toFixed(1);
            if(InT.toFixed(1) >= setVolume){
                clearInterval(eAudio);
            };
        },50);
    };
};

function audioVolumeOut(q, iVolume) {
    if(q.volume){
        var InT = iVolume || 0.6;
        var setVolume = 0;  // Target volume level for old song 
        var speed = 0.01;  // Rate of volume decrease
        q.volume = InT;
        var fAudio = setInterval(function(){
            InT -= speed;
            q.volume = InT.toFixed(1);
            if(InT.toFixed(1) <= setVolume){
                q.pause();
                q.currentTime = 0;
                clearInterval(fAudio);
            };
        },50);
    };
};