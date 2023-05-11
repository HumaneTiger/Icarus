var protoSuns = document.querySelectorAll("main .sun");
var protoWaves = document.querySelectorAll("main .wave");
var protoCurlWaves = document.querySelectorAll("main .curl-wave");
var protoClouds = document.querySelectorAll("main div.cloud");
var protoDesert = document.querySelectorAll("main div.desert");
var sunIndex = 0;
var waveIndex = 0, curlWaveIndex = 0;
var desertIndex = 0;
var startDelay = 2500;
var weatherCondition = "normal";

var sunPosition = 100;
var sunStrip1 = document.querySelector("main .sun-strip-1"),
    sunStrip2 = document.querySelector("main .sun-strip-2");
var thunder1 = document.querySelector("main .thunder-1"),
    thunder2 = document.querySelector("main .thunder-2");
var waveStrip = document.querySelector("main .wave-strip"),
    curlWaveStrip = document.querySelector("main .curl-wave-strip");
var desertStrip = document.querySelector("main .desert-strip");
var timeoutIds = [];
var playMode;

function debugThis(msg) {
  let debug = document.getElementById("debug");
  //debug.classList.remove("hidden");
  if (msg === "clear") {
    debug.innerHTML = "";
  } else {
    debug.innerHTML = msg + "<br>" + debug.innerHTML;
  }
}

function initSunnySky() {

    for (i = -7; i <= 100; i += 15) {

        let newSun = sunStrip1.appendChild(protoSuns.item(sunIndex).cloneNode(true));

        newSun.classList.remove("hidden")
        newSun.classList.add("go");
        newSun.style.left = (i + "vw");
        newSun.style.marginLeft = (Math.floor(Math.random() * 15) - 8) + "px";
        newSun.style.marginTop = (Math.floor(Math.random() * 15) - 8) + "px";
        newSun.firstChild.style.animationDelay = (Math.floor(Math.random() * 750)) + "ms";

        if (sunIndex < protoSuns.length - 1) {
            sunIndex++;
        } else {
            sunIndex = 0;
        }
    }

    for (i = 0; i <= 100; i+= 12) {

        let newSun = sunStrip2.appendChild(protoSuns.item(sunIndex).cloneNode(true));

        newSun.classList.remove("hidden");
        newSun.classList.add("go");
        newSun.style.left = (i + "vw");
        newSun.style.marginLeft = (Math.floor(Math.random() * 15) - 8) + "px";
        newSun.style.marginTop = (Math.floor(Math.random() * 15) - 8) + "px";
        newSun.firstChild.style.animationDelay = (Math.floor(Math.random() * 750)) + "ms";

        if (sunIndex < protoSuns.length - 1) {
            sunIndex++;
        } else {
            sunIndex = 0;
        }
    }
}

function initWaves() {

    for (i = 0; i <= 100; i += 15) {

        let newWave = waveStrip.appendChild(protoWaves.item(waveIndex).cloneNode(true));

        newWave.classList.remove("hidden");
        newWave.classList.add("go");
        newWave.style.left = (i + "vw");
        newWave.style.marginLeft = (Math.floor(Math.random() * 15) - 8) + "px";
        newWave.style.marginBottom = (Math.floor(Math.random() * 10) - 5) + "px";

        if (i === 0) {
            newWave.style.marginTop = "10vh";
        }

        if (waveIndex < protoWaves.length - 1) {
            waveIndex++;
        } else {
            waveIndex = 0;
        }

    }

    for (i = 15; i <= 100; i += 7) {

        let newCurlWave = curlWaveStrip.appendChild(protoCurlWaves.item(curlWaveIndex).cloneNode(true));

        newCurlWave.classList.remove("hidden");
        newCurlWave.classList.add("go");
        newCurlWave.style.left = (i + "vw");
        newCurlWave.style.marginLeft = (Math.floor(Math.random() * 10) - 5) + "px";
        newCurlWave.style.marginTop = (Math.floor(Math.random() * 30) - 22) + "px";
        newCurlWave.style.animationDelay = (Math.floor(Math.random() * 750)) + "ms";

        if (curlWaveIndex < protoCurlWaves.length - 1) {
            curlWaveIndex++;
        } else {
            curlWaveIndex = 0;
        }

    }

}

function startFlying() {
    document.body.classList.add("flying");
}

function addingSunStrip1() {

    let newSun;
    
    if (weatherCondition === "normal" || weatherCondition === "hot") {
        newSun = sunStrip1.appendChild(protoSuns.item(sunIndex).cloneNode(true));
    } else if (weatherCondition === "storm") {
        newSun = sunStrip1.appendChild(protoClouds.item(sunIndex).cloneNode(true));
    }

    newSun.classList.remove("hidden");
    window.setTimeout(function() { newSun.classList.add("go"); }, 50);
    newSun.style.marginLeft = (Math.floor(Math.random() * 15) - 8) + "px";
    newSun.style.marginTop = (Math.floor(Math.random() * 15) - 8) + "px";
    newSun.firstChild.style.animationDelay = (Math.floor(Math.random() * 750)) + "ms";
    window.getComputedStyle(newSun);

    window.setTimeout(function() {
        sunStrip1.removeChild(sunStrip1.firstChild);
    }, 2000);

    if (sunIndex < protoSuns.length - 1) {
        sunIndex++;
    } else {
        sunIndex = 0;
    }

}

function addingSunStrip2() {

    let newSun;

    if (weatherCondition === "normal" || weatherCondition === "hot") {
        newSun = sunStrip2.appendChild(protoSuns.item(sunIndex).cloneNode(true));
    } else if (weatherCondition === "storm") {
        newSun = sunStrip2.appendChild(protoClouds.item(sunIndex).cloneNode(true));
    }

    newSun.classList.remove("hidden");
    window.setTimeout(function() { newSun.classList.add("go"); }, 50);
    newSun.style.marginLeft = (Math.floor(Math.random() * 15) - 8) + "px";
    newSun.style.marginTop = (Math.floor(Math.random() * 15) - 8) + "px";
    newSun.firstChild.style.animationDelay = (Math.floor(Math.random() * 750)) + "ms";
    window.getComputedStyle(newSun);

    window.setTimeout(function() {
        sunStrip2.removeChild(sunStrip2.firstChild);
    }, 1800);

    if (sunIndex < protoSuns.length - 1) {
        sunIndex++;
    } else {
        sunIndex = 0;
    }

}

function addingWaves() {

    if (weatherCondition === "normal" || weatherCondition === "storm") {
        let newWave = waveStrip.appendChild(protoWaves.item(waveIndex).cloneNode(true));

        newWave.classList.remove("hidden");
        window.setTimeout(function() { newWave.classList.add("go"); }, 50);
        newWave.style.marginLeft = (Math.floor(Math.random() * 15) - 8) + "px";
        newWave.style.marginBottom = (Math.floor(Math.random() * 10) - 5) + "px";

        window.setTimeout(function() {
            waveStrip.removeChild(waveStrip.firstChild);
        }, 4400);

        if (waveIndex < protoWaves.length - 1) {
            waveIndex++;
        } else {
            waveIndex = 0;
        }
    }
}

function addingCurlWaves() {

    if (weatherCondition === "normal" || weatherCondition === "storm") {
        let newCurlWave = curlWaveStrip.appendChild(protoCurlWaves.item(curlWaveIndex).cloneNode(true));

        newCurlWave.classList.remove("hidden");
        window.setTimeout(function() { newCurlWave.classList.add("go"); }, 50);
        newCurlWave.style.marginLeft = (Math.floor(Math.random() * 10) - 5) + "px";
        newCurlWave.style.marginTop = (Math.floor(Math.random() * 30) - 22) + "px";
        newCurlWave.style.animationDelay = (Math.floor(Math.random() * 750)) + "ms";
    
        window.setTimeout(function() {
            curlWaveStrip.removeChild(curlWaveStrip.firstChild);
        }, 2500);

        if (curlWaveIndex < protoCurlWaves.length - 1) {
            curlWaveIndex++;
        } else {
            curlWaveIndex = 0;
        }
    }
}

function addingDesert() {

    if (weatherCondition === "hot") {
        let newDesert = desertStrip.appendChild(protoDesert.item(desertIndex).cloneNode(true));

        newDesert.classList.remove("hidden");
        window.setTimeout(function() { newDesert.classList.add("go"); }, 50);
        newDesert.style.marginLeft = (Math.floor(Math.random() * 10) - 5) + "px";
        newDesert.style.marginTop = (Math.floor(Math.random() * 30) - 22) + "px";
        newDesert.style.animationDelay = (Math.floor(Math.random() * 750)) + "ms";
    
        window.setTimeout(function() {
            desertStrip.removeChild(desertStrip.firstChild);
        }, 11000);

        if (desertIndex < protoDesert.length - 1) {
            desertIndex++;
        } else {
            desertIndex = 0;
        }
    }
}

function addingSunsInterval() {
    window.setInterval(function() {
        addingSunStrip1();
    }, 1000);
    window.setInterval(function() {
        addingSunStrip2();
    }, 900);
}

function addingWavesInterval() {
    window.setInterval(function() {
        addingWaves();
    }, 1000);
    window.setInterval(function() {
        addingCurlWaves();
    }, 500);
}

function addingDesertInterval() {
    window.setInterval(function() {
        addingDesert();
    }, 2300);
}
