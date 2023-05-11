var objectStrip = document.querySelector("main .object-strip");

var protoCliff1 = document.querySelector(".cliff.cliff-1"),
    protoCliff2 = document.querySelector(".cliff.cliff-2"),
    protoCliff3 = document.querySelector(".cliff.cliff-3"),
    protoCliff4 = document.querySelector(".cliff.cliff-4");

var protoShippy = document.querySelector(".shippy");

var protoGull1 = document.querySelector(".gull.gull-1"),
    protoGull2 = document.querySelector(".gull.gull-2"),
    protoGull3 = document.querySelector(".gull.gull-3");

var procto1 = document.querySelector(".tentacle.tentacle-1"),
    procto2 = document.querySelector(".tentacle.tentacle-2"),
    procto3 = document.querySelector(".tentacle.tentacle-3"),
    procto4 = document.querySelector(".tentacle.tentacle-4"),
    procto5 = document.querySelector(".tentacle.tentacle-5");

var heroIndicator = document.getElementById("hero-indicator");
var indicators = document.querySelector("main .indicators");
var goal = document.querySelector("main div.goal");

var collisionCandidates = [];
var showIndicators = false;

var addingObjectDelay = startDelay;

function checkForCollisions() {
    if (heroBoundingRect) {

        let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        let heroLeft = heroBoundingRect.left * 1.05,
            heroHeight = heroBoundingRect.height / 1.67,
            heroWidth = heroBoundingRect.width / 1.25,
            heroTop = heroBoundingRect.top;

        if (showIndicators) {
            heroIndicator.style.left = Math.floor(heroLeft) + "px";
            heroIndicator.style.width = Math.floor(heroWidth) + "px";
            heroIndicator.style.height = Math.floor(heroHeight) + "px";
            heroIndicator.style.top = Math.floor(heroTop) + "px";
        }

        for (let i = 0; i < collisionCandidates.length; i += 1) {

            if (collisionCandidates[i]) {

                let canditBoundingRect = collisionCandidates[i].getBoundingClientRect();

                let width = canditBoundingRect.width / 1.4;
                let height = canditBoundingRect.height / 1.1;
                let left = canditBoundingRect.left + (width / 10);
                let top = canditBoundingRect.top + (height / 10);

                if (collisionCandidates[i].classList.contains("shippy")) {
                    // let's be even more generous
                    top += 40;
                    left += 60;
                }
            
                if (collisionCandidates[i].classList.contains("cliff-1") || collisionCandidates[i].classList.contains("cliff-2")) {
                    width = width / 1.5;
                }
            
                if (collisionCandidates[i].classList.contains("gull")) {
                    left += 10;
                    top += 10;
                    width -= 20;
                    height -= 20;
                }
            
                if (collisionCandidates[i].classList.contains("tentacle")) {
                    top += 28;
                }
            
                if (left + width < - 50 || left < (vw * -0.40)) {
                    if (collisionCandidates[i].classList.contains("trigger-next-story")) {
                        triggerNextStory();
                    }
                    objectStrip.removeChild(collisionCandidates[i]);
                    collisionCandidates[i] = false;
                } else {
            
                    if (showIndicators) {
                       let indi = indicators.querySelector(".indi-" + (i%5));
                       indi.style.left = Math.floor(left) + "px";
                       indi.style.top = Math.floor(top) + "px";
                       indi.style.width = Math.floor(width) + "px";
                       indi.style.height = Math.floor(height) + "px";
                    }

                    if (heroLeft < left + width &&
                        heroLeft + heroWidth > left &&
                        heroTop < top + height &&
                        heroTop + heroHeight > top) {

                        let audio = allAudio.querySelector(".hit");
                        audio.volume = 1; audio.play();

                        triggerAlarm("dead");
                    }
                }
            }
        }
    }
}

function registerCollisionCandidate(obj) {
    collisionCandidates.push(obj);
}

function startObject(clone) {
    let newObject = objectStrip.appendChild(clone);
    
    newObject.classList.remove("hidden")
    registerCollisionCandidate(newObject);

    timeoutId = window.setTimeout(function() {
        newObject.classList.add("go");
    }, 100);
    registerTimeout(timeoutId);

}

function addOctopus(delay) {
    addObject(procto1.cloneNode(true), delay);
    addObject(procto2.cloneNode(true), 0);
    addObject(procto3.cloneNode(true), 0);
    addObject(procto4.cloneNode(true), 0);
    addObject(procto5.cloneNode(true), 0);
    timeoutId = window.setTimeout(function() {
        document.querySelectorAll(".object-strip .tentacle").forEach((el) => { el.classList.add("attack")});
    }, addingObjectDelay + 15000);
    registerTimeout(timeoutId);
    timeoutId = window.setTimeout(function() {
        document.querySelectorAll(".object-strip .tentacle").forEach((el) => { el.classList.add("retreat")});
    }, addingObjectDelay + 20000);
    registerTimeout(timeoutId);
}

function addObject(clone, delay, triggerNextStory) {

    addingObjectDelay += delay;

    if (triggerNextStory) {
        clone.classList.add("trigger-next-story");
    }
    
    timeoutId = window.setTimeout(function() {
        startObject(this);
        
        if (this.classList.contains("gull")) {
            if (Math.random() > 0.6) {
                let audio = allAudio.querySelector(".seagull");
                audio.volume = 0.5;
                audio.play();
            }
        }
    }.bind(clone), addingObjectDelay);
    registerTimeout(timeoutId);
    
}
