let PrevBtnPos = 0;
let btnClick = 1;
let episodes_list = [];
let count = epSet[1];

createDiv(epSet[0]);
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
            result = source.slice(8, 13);
            
        if (result == "docs." || result == "drive") {
            $(".pframe iframe").after('<div id="fpopt"></div>');
            z = document.getElementById("fpopt");
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

//create div
function createDiv(i){
    "i"==i?player='<iframe allowfullscreen frameborder="0" height="100%" loading="lazy" marginheight="0"  marginwidth="0" mozallowfullscreen="true" scrolling="NO" src="" webkitallowfullscreen="true" width="100%" id="iframePlayer"></iframe>':"j"==i?player='<div id="#spt_holder_vdbox"><script src="https://content.jwplatform.com/libraries/LJ361JYj.js"><\/script><div id="ahesuifu"></div></div>':"p"==i?player='<div id="container"><video controls poster=""class="vid1"><source src="" type="video/mp4"></video></div>':console.log("No Player Identify");let e=`<div id="shadow"></div><div class="nav_bar"><div class="ep_title"><span id="ep_count">EP 1</span><span class="e_server">External Server</span></div><div class="ep_menu_bar"><i class="bi bi-arrow-clockwise" id="bar_refresh"></i><i class="bi bi-hdd-stack" id="bar_server"></i><i class="bi bi-download" id="bar_dl"></i><i class="bi bi-fast-forward-fill" id="bar_next"></i></div></div><div class="DagPlaArea DagTo"><div class="video-content" id="PlayVideo"><div id="embed_holder"><div class="player-embed" id="pembed"><div class="playerload"></div><div id="player_embed"><div class="pframe">${player}</div></div></div></div></div><div class="video-nav"><div class="itemleft"><div class="icon DagLight"><svg viewBox="0 0 24 24"><path d="M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z" fill="currentColor"/></svg><span>Turn on Light</span></div><div class="icon DagShre"><svg viewBox="0 0 24 24" aria-hidden="true" height="1em" preserveAspectRatio="xMidYMid meet" role="img" width="1em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none"><path d="M3 3h6v2H5v4H3V3z" fill="currentColor"/><path d="M3 21h6v-2H5v-4H3v6z" fill="currentColor"/><path d="M15 21h6v-6h-2v4h-4v2z" fill="currentColor"/><path d="M21 3h-6v2h4v4h2V3z" fill="currentColor"/></g></svg><a href="#PlayVideo">Expand</a></div><div class="icon DagCom"><svg viewBox="0 0 24 24"><path d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z" fill="currentColor"/></svg><a href="#comments"><span>Comment</span></a></div></div><div class="itemright"><div class="icon Report"><svg viewBox="0 0 192 512" aria-hidden="true" height="1em" preserveAspectRatio="xMidYMid meet" role="img" width="0.38em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80s35.888-80 80-80s80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" fill="currentColor"/></svg><span>Report</span></div></div></div></div><div class="server_option"><span class="fl-space"><i class="bi bi-folder fl-edit"></i></span><div id="dis_ep"></div><div class="dis_bottom"><div class="epstatus"><div id="epcountdown"></div></div></div><div id="notifPrompt"></div></div>`;$(e).insertAfter("#extra-info");
}
