const episodes_list = [];
const start = parseInt(epSet[1]);
let player = epSet[0];
let btnClick = 1;
let prevBtnArr = 0;

createDiv(player);
createButton();
vidLinkFormat();
openStart();
postStatusInfo();

function openStart() {
    if (player === "i") {
        forIframePlayer(0);
        $("#playerType").text("External Player");
        let source = $("#iframePlayer").attr("src");
        let result = source.slice(8, 13);
        if (result === "docs." || result === "drive") {
            $(".pframe iframe").after('<div id="fpopt"></div>');
            const z = document.getElementById("fpopt");
            z.addEventListener("click", (e) => {
                e.preventDefault();
            });
        }
    } else if (player === "j") {
        forJwPlayer(0);
    } else if (player === "p") {
        forPlayerIo(0);
        playerIoSetup();
    } else if (player === "cf") {
        forCustomPlayer(0);
    }

    if (player !== "cf") {
        $("#eptotal").text(`Ep total : ${epSet[1]}`);
    } else {
        $("#eptotal").text(`Ep total : ${epSet[5]}`);
    }
    
    if (epSet[3] === "g") {
        $(".stream-server").text("GDrive Stream")
    }

    $("#animetitle").text(document.title);
}

function playButton() {
    const userClick = parseInt(event.target.textContent);
    btnClick = userClick;
    playerSwitcher(userClick)
}

function playerSwitcher(input) {
    const arrInput = input - 1;
    const cfArrInput = Math.abs(start - input);
    switch (player) {
        case "j":
            forJwPlayer(arrInput);
            disableButton(arrInput);
            break;
        case "i":
            forIframePlayer(arrInput);
            disableButton(arrInput);
            break;
        case "p":
            forPlayerIo(arrInput);
            disableButton(arrInput);
            break;
        case "cf":
            forCustomPlayer(cfArrInput);
            disableButton(cfArrInput);
            break;
        default:
            console.log("No Player Identify")
    }  
    $("#countEp").text(`EP ${input}`);
}

function forJwPlayer(input) {
    let link = episodes_list[input];
    let title = getTitle();
    title = `${title} : EP ${input + 1}`;

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

    function getTitle() {
        let title;
        try {
            title = jwTitle;
        } catch (e) {
            e instanceof ReferenceError ? (title = document.title) : (title = jwTitle);
        }
        return title;
    }
}

function forIframePlayer(input) {
    const link = episodes_list[input];
    document.querySelector("#iframePlayer").src = link;
}

function forPlayerIo(input) {
    let link = episodes_list[input];
    let source = document.querySelector(".vid1 source");
    let video = document.querySelector("#container video");
    source.setAttribute("src", link);
    video.load();
    video.play();
}

function playerIoSetup() {
    const controls = [
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

function forCustomPlayer(input) {
    const link = episodes_list[input];
    document.querySelector("#iframePlayer").src = link;
    $("#countEp").text(`EP ${start + input}`);
}

function disableButton(input) {
    let btnContainer = document.getElementById("episodes-list");
    let btns = btnContainer.getElementsByClassName("play-button");
    let BtnArrPos = input;

    btns[BtnArrPos].disabled = true;
    btns[BtnArrPos].classList.add("play-button-disabled");
    if (BtnArrPos != prevBtnArr) {
        btns[prevBtnArr].disabled = false;
        btns[prevBtnArr].classList.remove("play-button-disabled");
        prevBtnArr = BtnArrPos;
    }
}

function createButton() {
    const btnContainer = document.getElementById("episodes-list");
    const btns = btnContainer.getElementsByClassName("play-button");
    let numberBtn;

    if (player === "cf") {
        cstart = 0;
        numberBtn = epSet[5] - 1;
    } else {
        cstart = 1;
        numberBtn = start;
    }

    for (let i = cstart; i <= numberBtn; i++) {
        player === "cf" ? epNumber = start + i : epNumber = i;
        const element = document.createElement("button");
        element.classList.add("play-button");
        element.setAttribute("onclick", "playButton()");
        element.innerHTML = epNumber;
        btnContainer.appendChild(element);
    }
    btns[0].classList.add("play-button-disabled");
    btns[0].disabled = true;
}

function vidLinkFormat() {
    const srcType = epSet[3];
    let numberEp;

    const linkFormat = {
        vids: (i) => `https://cdn8.vidstreamjp.cloud/animix/watch/${keyEp}-episode-${i}`,
        a: (i) => `https://archive.org/download/${keyEp}${i}.mp4`,
        yt: (i) => `https://www.youtube.com/embed/${episodes[i - 1]}`,
        g: (i) => `https://drive.google.com/file/d/${episodes[i - 1]}/preview`,
        n: (i) => episodes[i - 1]
    }

    player === "cf" ? numberEp = epSet[5] : numberEp = start;
    for (let i = 1; i <= numberEp; i++) {
        const link = linkFormat[srcType](i);
        episodes_list.push(link);
    }
}

document.getElementById("nextEp").addEventListener("click", () => {
    nextVideo();
});

// NextVideo Btn
let nextVideoSpam = false;
let nextVideoCount = 0;
function nextVideo() {
    let arrEp = getNextVideo();

    if (!nextVideoSpam) {
        if (player !== "cf" && nextVideoCount <= start) {
            playerSwitcher(arrEp);
            btnClick = arrEp;
            nextVideoCount = arrEp - 1;
        } else if (player === "cf" && nextVideoCount < epSet[5]) {
            forCustomPlayer(arrEp);
            disableButton(arrEp);
            btnClick = start + arrEp;
            nextVideoCount = arrEp;
        }
        if (nextVideoCount <= start || nextVideoCount < epSet[5]) {
            nextVideoSpam = true;
            reset();
        }
    } else {
        if ((player !== "cf" && nextVideoCount <= start) || (player === "cf" && nextVideoCount <= epSet[5] - 1)) {
            notifAction("Don't Spam");
        }
    }

    function reset() {
        setTimeout(function () {
            nextVideoSpam = false;
        }, 1600)
    }
}

// getNextVideo Episode
let cf_first = false;
function getNextVideo() {
    let epNumClicked = btnClick;
    const epNumArr = Math.abs(start - epNumClicked);

    if (player !== "cf" && nextVideoCount !== start) {
        return nextVideoCount = epNumClicked + 1;
    } else if (player === "cf" && epNumArr !== epSet[5]) {
        if (epNumClicked === 1 && !cf_first) {
            cf_first = true;
            return epNumClicked;
        } else {
            return nextVideoCount = epNumArr + 1;
        }
    }
    return nextVideoCount;
}

// VideoReload Btn
let videoReloadSpam = false;
document.getElementById("btn-reload").addEventListener("click", () => {
    if (!videoReloadSpam) {
        playerSwitcher(btnClick);
        notifAction("Reloading video");
        videoReloadSpam = true;

        setTimeout(() => {
            videoReloadSpam = false;
        }, 12000);
    } else {
        notifAction("Don't Spam");
    }
})
// VideoDownload Btn
let videoDownloadSpam = false;
document.getElementById("download").addEventListener("click", () => {
    const confirmDL = epSet[2];
    if (confirmDL === "y" && !videoDownloadSpam) {
        let seconds = 10;
        videoDownloadSpam = true;
        const timer = setInterval(() => {
            $("#notifprompt").text(`Please wait... ${seconds -= 1}`);
            $("#notifprompt").fadeIn(400);

            if (seconds === 0) {
                clearInterval(timer);
                $("#notifprompt").fadeOut(400);
                downloadVideo();
                videoDownloadSpam = false;
            }
        }, 1000)
    } else {
        notifAction("No Download Available");
    }
})
// Download video
function downloadVideo() {
    const videoType = epSet[3];
    const epNumber = episodes[btnClick - 1];

    if (videoType === "g") {
        location.href = `https://drive.google.com/u/0/uc?id=${epNumber}&export=download`;
    } else {
        location.href = epNumber;
    }
}
// Notif Prompt
function notifAction(message) {
    let notifprompt = $("#notifprompt");
    notifprompt.text(message);
    notifprompt.fadeIn(400);

    setTimeout(() => {
        notifprompt.fadeOut(400);
    }, 1600);
}

function createDiv(playerType) {
    if (playerType == "i" || playerType == "cf") {
        cplayer = `<iframe allowfullscreen frameborder="0" height="100%" loading="lazy" marginheight="0"  marginwidth="0" mozallowfullscreen="true" scrolling="NO" src="" webkitallowfullscreen="true" width="100%" id="iframePlayer"></iframe>`;
    }
    if (playerType == "j") {
        cplayer = `<div id="#spt_holder_vdbox"><div id="ahesuifu"></div></div>`;
    }
    if (playerType == "p") {
        cplayer = `<div id="container"><video controls poster=""class="vid1"><source src="" type="video/mp4"></video></div>`;
    }
    let fcode = `<div id="shadow"></div><div class="stream-navbar"><div class="stream-pinfo"><span id="countEp">EP 1</span><span id="playerType">Internal Player</span></div><div class="navbar-right"><i class="bi bi-arrow-left-right" id="switchP"></i><i class="bi bi-lightbulb-fill" id="lightOn"></i><i class="bi bi-download" id="download"></i><i class="bi bi-magic" id="autoplay"></i><i class="bi bi-fast-forward-fill" id="nextEp"></i></div></div><div class="DagPlaArea DagTo"><div class="video-content" id="PlayVideo"><div id="embed_holder"><div class="player-embed" id="pembed"><div class="playerload"></div><div id="player_embed"><div class="pframe">${cplayer}</div><div id="notifprompt">Don't Spam</div></div></div></div></div></div><div class="stream-nav"><div><div class="stream-server">External Stream</div><div id="change-server"><i class="stnav-gin fa fa-cog" aria-hidden="true"></i><span class="txtServer">Server</span></div><div id="btn-share"><i class="stnav-gin fas fa-share"></i><span class="txtShare">Share</span></div><div id="btn-report"><i class="stnav-gin fas fa-exclamation-circle stnav-gin"></i><span class="txtReport">Report</span></div><div id="btn-reload"><i class="stnav-gin fas fa-redo"></i><span class="txtReload">Reload</span></div><div id="btn-fullscreen"><i class="stnav-gin fas fa-expand"></i><span class="txtFull">Full Screen</span></div></div><div class="animetitle"><a id="animebtn"><svg stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="25" width="25" id="foldersvg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg></a><span id="animetitle"></span></div><div id="episodes-list"></div><div class="s-navbottom"><div class="navbottom-left"><span id="genres"></span><br><span id="status"></span><span id="moreinfo"><a id="morebtn">More Info</a></span></div><div class="navbottom-right"><span id="eptotal"></span></div></div></div>`
    $("#extra-info").after(fcode);
}

function postStatusInfo() {
    let genreList = [];
    let genres = $("#genresTarget a").text();
    let genre = genres.replace(/\s+/g, ' ');
    genre = genre.split(',');

    for (let i = 0; i <= genre.length - 2; i++) {
        if (i != genre.length - 2) {
            genreList.push(`<a href="https://www.rioanimeplay.xyz/search/label/${genre[i].trim()}" rel="tag">${genre[i].trim()}, </a>`);
        } else {
            genreList.push(`<a href="https://www.rioanimeplay.xyz/search/label/${genre[i].trim()}" rel="tag">${genre[i].trim()} </a>`);
        }
    }

    genre = genreList.join('');
    genre = genre.substring(0, genre.length - 1);
    $("#genres").append(`Genres : ${genre}`);
    let status = $("#statusTarget a").text();

    if (status.trim() == "Finished Airing") {
        $("#status").text("Status : Completed");
    } else {
        $("#status").text(`Status : ${status.trim()}`);
    }
}

document.getElementById("lightOn").addEventListener("click", () => {
    toggleLight();
})

let lighton = false;
function toggleLight() {
    let streamCplayer = document.getElementById("PlayVideo"),
        light = document.getElementById("lightOn"),
        shadow = document.getElementById("shadow"),
        navPright = document.querySelector(".navbar-right");

    if (!lighton) {
        shadow.style.height = document.body.scrollHeight;
        shadow.style.display = "block";
        navPright.style.position = "relative";
        navPright.style.zIndex = "10";
        streamCplayer.style.zIndex = "11"
        lighton = true;
    } else {
        shadow.style.display = "none";
        shadow.style.height = "none";
        navPright.style.position = "";
        navPright.style.zIndex = "";
        streamCplayer.style.zIndex = "";
        lighton = false;
    }
}

// switch player
let switchSpam = false;
document.getElementById("switchP").addEventListener("click", switchPlayer);
function switchPlayer() {
    if (!switchSpam) {
        if (epSet[0] === "j") {
            if (player === "j") {
                let jwContainer = document.getElementById("ahesuifu");
                let playerInstance = jwplayer(jwContainer);
                let src = playerInstance.getPlaylistItem()['file'];

                if (src.includes("https://archive.org/")) {
                    let fcode = `<iframe allowfullscreen frameborder="0" height="100%" loading="lazy" marginheight="0" marginwidth="0" mozallowfullscreen="true" scrolling="NO" src="" webkitallowfullscreen="true" width="100%" id="iframePlayer"></iframe>`;
                    playerDivChanger(fcode, "i", "External");
                }

            } else if (player === "i") {
                let iframe = document.getElementById("iframePlayer");
                let src = iframe.getAttribute("src");

                if (src.includes("https://archive.org/")) {
                    let fcode = `<div id="#spt_holder_vdbox"><div id="ahesuifu"></div></div>`;
                    playerDivChanger(fcode, "j", "Internal");
                }
            }
        }
        if (epSet[0] === "p") {
            if (player === "p") {
                let container = document.getElementById("container");
                let source = container.getElementsByTagName("source")[0];
                let link = source.getAttribute("src");

                if (link.includes("https://archive.org/")) {
                    let fcode = `<iframe allowfullscreen frameborder="0" height="100%" loading="lazy" marginheight="0" marginwidth="0" mozallowfullscreen="true" scrolling="NO" src="" webkitallowfullscreen="true" width="100%" id="iframePlayer"></iframe>`;
                    playerDivChanger(fcode, "i", "External");
                }
            } else if (player === "i") {
                let iframe = document.getElementById("iframePlayer");
                let src = iframe.getAttribute("src");

                if (src.includes("https://archive.org/")) {
                    let fcode = `<div id="container"><video controls poster=""class="vid1"><source src="" type="video/mp4"></video></div>`;
                    playerDivChanger(fcode, "p", "Internal");
                }
            }
        }
        if (epSet[0] === "cf" || epSet[0] === "i") {
            notifAction("No Other Player Available");
        }

        playerInfoUpdater()
        switchSpam = true;
        setTimeout(() => {
            switchSpam = false;
        }, 8000);
    } else {
        notifAction("Don't Spam");
    }

    function playerDivChanger (formatCode, inputPlayer, sourcePlayer) {
        $('.pframe').empty();
        $('.pframe').append(formatCode);
        player = inputPlayer;
        playerSwitcher(btnClick);
        notifAction(`Switching To ${sourcePlayer} Player`)
    }
}
//update the Player internal or external
function playerInfoUpdater() {
    const playerType = document.getElementById("playerType");
    if (player === "i" || player === "cf") {
        playerType.textContent = "External Player";
    } else if (player === "j" || player === "p") {
        playerType.textContent = "Internal Player";
    }
}
//share btn
const shareBtn = document.getElementById("btn-share");
shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: `${document.title}`,
                url: window.location.href,
            });
            console.log("Post was shared successfully");
        } catch (error) {
            console.error("Error sharing post:", error);
        }
    } else {
        console.log("Web Share API is not supported");
    }
});
