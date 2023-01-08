import { createDiv } from "./createDiv.js";

let PrevBtnPos = 0;
let btnClick = 1;
let episodes_list = [];
let count;

$(createDiv(epSet[0])).insertAfter("#extra-info");
createButton();
vidStream();
epCountDown();
openStart();

function openStart() {
    let plyr = epSet[0];

    $(`<h1>${document.title}</h1>`).insertAfter(".server_option .fl-space");
    $("#reportTitle").text(document.title);
    $("#iframePlayer").attr("src", episodes_list[0]);
    $(".vid1 source").attr("src", episodes_list[0]);
    $(`<span>Ep total : ${count}</span>`).insertBefore("#epcountdown");

    if (plyr == "i") {
        let source = $("#iframePlayer").attr("src"),
            result = source.slice(8, 13),
            z = document.getElementById("fpopt");

        if (result == "docs." || result == "drive") {
            $(".pframe iframe").after('<div id="fpopt"></div>');
            z.addEventListener("click", (e) => {
                e.preventDefault();
            });
        }
    }

    plyr == "j" ? jwPlayerSetup() : null;
    plyr == "p" ? playerIoSetup() : null;
}

function playButton() {
    let element = event.target;
    let btnClicked = parseInt(element.textContent);
    let tagType = epSet[0];

    $("#ep_count").text(`EP ${btnClicked}`);
    $("#rprt-cnt-ep").text(btnClicked);
    btnClick = btnClicked;
    disableButton(btnClicked);
    switch (tagType) {
        case "i":
            forFrame(btnClicked);
            break;
        case "j":
            forJwPlayer(btnClicked);
            break;
        case "p":
            forPlayerIo(btnClicked);
            break;
        default:
            console.log("No source identify");
            break;
    }
}

function forFrame(input) {
    let BtnArrPos = input - 1;
    let link = episodes_list[BtnArrPos];
    document.querySelector("#iframePlayer").src = link;
}

function forJwPlayer(input) {
    let BtnArrPos = input - 1;
    let link = episodes_list[BtnArrPos];
    let title = checkjwTitle();
    title = `${title} : EP ${input}`;

    (jwplayer.key = "ITWMv7t88JGzI0xPwW8I0+LveiXX9SWbfdmt0ArUSyc="),
        jwplayer("ahesuifu").setup({
            image: jwImage,
            aspectratio: "16:9",
            width: "100%",
            height: window.innerHeight,
            autostart: true,
            file: link,
            title: title,
        });
}

function jwPlayerSetup() {
    let title = checkjwTitle();
    title = `${title} : EP ${btnClick}`;

    (jwplayer.key = "ITWMv7t88JGzI0xPwW8I0+LveiXX9SWbfdmt0ArUSyc="),
        jwplayer("ahesuifu").setup({
            image: jwImage,
            aspectratio: "16:9",
            width: "100%",
            height: window.innerHeight,
            autostart: true,
            file: episodes_list[0],
            title: title,
        });
}

function forPlayerIo(input) {
    let BtnArrPos = input - 1;
    let link = episodes_list[BtnArrPos];

    $(".vid1 source").attr("src", link);
    $("#container video")[0].load();
    $("#container video")[0].play();
}

function playerIoSetup() {
    let controls = [
        "play-large", // The large play button in the center
        // 'restart', // Restart playback
        "rewind", // Rewind by the seek time (default 10 seconds)
        "play", // Play/pause playback
        "fast-forward", // Fast forward by the seek time (default 10 seconds)
        "progress", // The progress bar and scrubber for playback and buffering
        "current-time", // The current time of playback
        "duration", // The full duration of the media
        "mute", // Toggle mute
        "volume", // Volume control
        //'captions', // Toggle captions
        //'settings', // Settings menu
        "pip", // Picture-in-picture (currently Safari only)
        "airplay", // Airplay (currently Safari only)
        //'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
        "fullscreen", // Toggle fullscreen
    ];

    const player = new Plyr(".vid1", { controls });
    document.querySelector(".vid1").setAttribute("poster", pImage);
}

function checkjwTitle() {
    let title;
    try {
        title = jwTitle;
    } catch (e) {
        e instanceof ReferenceError ? (title = document.title) : (title = jwTitle);
    }

    return title;
}

function disableButton(input) {
    let btnContainer = document.getElementById("dis_ep");
    let btns = btnContainer.getElementsByClassName("play-button");
    let BtnArrPos = input - 1;

    $(btns[BtnArrPos]).prop("disabled", true);
    $(btns[BtnArrPos]).addClass("play-button-disabled");
    if (BtnArrPos != PrevBtnPos) {
        $(btns[PrevBtnPos]).prop("disabled", false);
        $(btns[PrevBtnPos]).removeClass("play-button-disabled");
        PrevBtnPos = BtnArrPos;
    }
}

function epCountDown() {
    let day = epSet[4];
    switch (day) {
        case "m":
            message = "Next : Monday";
            break;
        case "t":
            message = "Next : Tuesday";
            break;
        case "w":
            message = "Next : Wednesday";
            break;
        case "th":
            message = "Next : Thursday";
            break;
        case "f":
            message = "Next : Friday";
            break;
        case "st":
            message = "Next : Saturday";
            break;
        case "s":
            message = "Next : Sunday";
            break;
        case "c":
            message = "Complete";
            break;
    }
    day != "n" ? $("#epcountdown").text(`${message}`) : null;
}

function createButton() {
    let btnContainer = document.getElementById("dis_ep");
    let btns = btnContainer.getElementsByClassName("play-button");

    for (let i = 1; i <= count; i++) {
        let element = document.createElement("button");
        element.setAttribute("class", "play-button");
        element.setAttribute("onclick", "playButton()");
        element.appendChild(document.createTextNode(`${i}`));
        $("#dis_ep").append(element);
    }

    $(btns[0]).addClass("play-button-disabled");
}

function vidStream() {
    let srcType = epSet[3];

    for (let i = 1; i <= count; i++) {
        switch (srcType) {
            case "vids":
                link = `https://cdn8.vidstreamjp.cloud/animix/watch/${keyEp}-episode-${i}`;
                episodes_list.push(link);
                break;
            case "a":
                link = `https://archive.org/download/${keyEp}${i}.mp4`;
                episodes_list.push(link);
                break;
            case "yt":
                link = `https://www.youtube.com/embed/${episodes[i - 1]}`;
                episodes_list.push(link);
                $(".e_server").text("YouTube Stream")
                break;
            case "g":
                link = `https://drive.google.com/file/d/${episodes[i - 1]}/preview`;
                episodes_list.push(link);
                $(".e_server").text("GDrive Server");
                break;
            case "n":
                episodes_list = episodes;
                break;
        }
    }
}

// Bar Refresh Button
let barRefreshSpamClick = 0;
$("#bar_refresh").click(function () {
    if (barRefreshSpamClick == 0) {
        distributeEp(btnClick);
        barNotifPrompt("Reoloading Video");
        barRefreshSpamClick = 1;
        barRefresh_Unlock();
    } else {
        barNotifPrompt("Don't Spam");
    }
});

function barRefresh_Unlock() {
    setTimeout(() => {
        barRefreshSpamClick -= barRefreshSpamClick;
    }, 11000);
}

// Bar Next Button
let barNextSpamClick = 0;
let barNextCount = 1;
$("#bar_next").click(function () {
    let lastNum = epSet[1];
    let num = barNext();

    if (barNextSpamClick == 0) {
        if (num <= lastNum) {
            distributeEp(num);
            disableButton(num);
            $("#ep_count").text(`EP ${num}`);
            $("#rprt-cnt-ep").text(num);
            btnClick = num;
            barNextCount = num;
        }
        barNextSpamClick = 1;
        barNextSpam();
    } else {
        num <= lastNum ? barNotifPrompt("Please wait. . .") : null;
    }
});

function distributeEp(num) {
    let tagType = epSet[0];
    if (tagType == "i") {
        forFrame(num);
    } else if (tagType == "j") {
        forJwPlayer(num);
    } else if (tagType == "p") {
        forPlayerIo(num);
    }
}

function barNext() {
    let lastNum = epSet[1];
    let click = btnClick;

    if (barNextCount != lastNum + 1) {
        return (barNextCount = click + 1);
    } else {
        return click;
    }
}

function barNextSpam() {
    setTimeout(() => {
        barNextSpamClick = 0;
    }, 3400);
}

// Bar Download Button
let dl46 = 0;
$(document).ready(
    $("#bar_dl").on("click", function () {
        let download = epSet[2];

        if (download === "y" && dl46 == 0) {
            let second = 1,
                seconds = 10;
            dl46 = 1;
            let timer = setInterval(function () {
                $("#notifPrompt").text(`Please wait. . . ${seconds - second}`);
                $("#notifPrompt").show();
                if (second > seconds) {
                    clearInterval(timer);
                    dl46 = 0;
                    $("#notifPrompt").hide();
                    downloadEp();
                }

                second++;
            }, 1000);
        }
        if (download === "n") {
            barNotifPrompt("No Download Avaible");
        }
    })
);

function downloadEp() {
    let trgt = epSet[3];

    if (trgt == "g") {
        location.href = `https://drive.google.com/u/0/uc?id=${episodes[btnClick - 1]
            }&export=download`;
    } else {
        location.href = episodes_list[btnClick - 1];
    }
}

//bar Notif
function barNotifPrompt(message) {
    $("#notifPrompt").text(message);
    $("#notifPrompt").show();
    setTimeout(function () {
        $("#notifPrompt").text("");
        $("#notifPrompt").hide();
    }, 1800);
}
