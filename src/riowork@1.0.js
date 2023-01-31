const episodes_list = [];
const count = epSet[1];
let btnClick = 1;
let PrevBtnPos = 0;

createDiv(epSet[0]);
createButton();
vidStream();
openStart();
postStatusInfo();

function openStart() {
    let player = epSet[0];

    $("#animetitle").text(document.title)
    $("#iframePlayer").attr("src", episodes_list[0]);
    $(".vid1 source").attr("src", episodes_list[0]);
    $("#eptotal").text(`Ep total : ${epSet[1]}`)

    if (player === "i") {
        let source = $("#iframePlayer").attr("src"),
            result = source.slice(8, 13);
        $("#playerType").text("External Player");

        if (result === "docs." || result === "drive") {
            $(".pframe iframe").after('<div id="fpopt"></div>');
            z = document.getElementById("fpopt");
            z.addEventListener("click", (e) => {
                e.preventDefault();
            });
        }
    }
    player === "j" ? forJwPlayer(1) : null;
    player == "cf" ? forcustomPlayer(epSet[1]) : null
    player === "p" ? playerIoSetup() : null;
}

function playButton() {
    let btnClicked = parseInt(event.target.textContent);
    let tagType = epSet[0];

    $("#countEp").text(`EP ${btnClicked}`);
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
        case "cf":
            forcustomPlayer(btnClicked);
            break;
        default:
            console.log("No source identified");
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

    function checkjwTitle() {
        let title;
        try {
            title = jwTitle;
        } catch (e) {
            e instanceof ReferenceError ? (title = document.title) : (title = jwTitle);
        }

        return title;
    }
}

function forPlayerIo(input) {
    let BtnArrPos = input - 1;
    let link = episodes_list[BtnArrPos];

    let source = document.querySelector(".vid1 source");
    source.setAttribute("src", link);
    let video = document.querySelector("#container video");
    video.load();
    video.play();
}

function forcustomPlayer(input) {
    let BtnArrPos = Math.abs(epSet[1] - input);

    let countEp = document.querySelector("#countEp");
    countEp.textContent = `EP ${input}`;
    let iframePlayer = document.querySelector("#iframePlayer");
    iframePlayer.src = episodes_list[BtnArrPos];
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

function disableButton(input) {
    let btnContainer = document.getElementById("episodes-list");
    let btns = btnContainer.getElementsByClassName("play-button");
    let BtnArrPos;

    if (epSet[0] === "cf") {
        BtnArrPos = Math.abs(epSet[1] - input);
    } else {
        BtnArrPos = input - 1;
    }

    btns[BtnArrPos].disabled = true;
    btns[BtnArrPos].classList.add("play-button-disabled");
    if (BtnArrPos != PrevBtnPos) {
        btns[PrevBtnPos].disabled = false;
        btns[PrevBtnPos].classList.remove("play-button-disabled");
        PrevBtnPos = BtnArrPos;
    }
}


function createButton() {
    const btnContainer = document.getElementById("episodes-list");
    const btns = btnContainer.getElementsByClassName("play-button");
    const player = epSet[0];
    let start, numberBtn;

    if (player === "cf") {
        start = epSet[1];
        numberBtn = epSet[5] + 1;
    } else if (player !== "cf") {
        start = 1;
        numberBtn = count;
    }

    for (let i = start; i <= numberBtn; i++) {
        const element = document.createElement("button");
        element.classList.add("play-button");
        element.setAttribute("onclick", "playButton()");
        element.innerHTML = i;
        btnContainer.appendChild(element);
    }

    btns[0].classList.add("play-button-disabled");
}


function vidStream() {
    let srcType = epSet[3];
    const player = epSet[0];
    let start, numberEp;

    const linkFormat = {
        vids: (i) => `https://cdn8.vidstreamjp.cloud/animix/watch/${keyEp}-episode-${i}`,
        a: (i) => `https://archive.org/download/${keyEp}${i}.mp4`,
        yt: (i) => `https://www.youtube.com/embed/${episodes[i - 1]}`,
        g: (i) => `https://drive.google.com/file/d/${episodes[i - 1]}/preview`,
        n: (i) => episodes[i - 1]
    }

    if (player === "cf") {
        start = epSet[1];
        numberEp = epSet[5] + 1;
    } else if (player !== "cf") {
        start = 1;
        numberEp = count;
    }

    for (let i = start; i <= numberEp; i++) {
        let result;
        if (player === "cf") {
            result = i - start + 1;
        } else {
            result = i;
        }
        const link = linkFormat[srcType](result);
        episodes_list.push(link);
    }
}

// Reload btn
let btnReloadCount = 0;
document.getElementById("btn-reload").addEventListener("click", () => {
    if (btnReloadCount === 0) {
        btnEpisodeClick(btnClick);
        btnReloadCount = 1;
        notifAction("Reloading Video");
        setTimeout(() => {
            btnReloadCount = 0;
        }, 12000);
    } else {
        notifAction("Don't Spam");
    }
});

// next button
let btnNextSpamCount = 0;
let btnNextEpCount = 1;

document.getElementById("nextEp").addEventListener("click", () => {
    btnNext();
});

function btnNext() {
    const episodeNum = getNextEp();
    const end = epSet[5];

    if (btnNextSpamCount === 0) {
        if (epSet[0] !== "cf" && btnNextEpCount <= epSet[1]) {
            btnEpisodeClick(episodeNum);
            disableButton(episodeNum);
            btnClick = btnNextEpCount;
            btnNextEpCount = btnClick;
            $("#countEp").text(`EP ${btnNextEpCount}`);

        } else if (epSet[0] === "cf" && btnNextEpCount < end) {
            const result = parseInt(epSet[1]) + episodeNum;
            btnEpisodeClick(result);
            disableButton(result);
            btnClick = result;
            btnNextEpCount = episodeNum;
            $("#countEp").text(`EP ${result}`);
        }
        btnNextSpamCount = 1;
        reset();
    } else {
        if ((epSet[0] === "cf" && btnNextEpCount < end) || (epSet[0] !== "cf" && btnNextEpCount <= epSet[1])) {
            notifAction("Please wait!!!");
        }
    }

    function reset() {
        setTimeout(() => {
            btnNextSpamCount = 0;
        }, 1600);
    }
}

let firstTry_Cf = true;
function getNextEp() {
    const player = epSet[0];
    const start = parseInt(epSet[1]);
    const number = epSet[5];
    const clicked = btnClick;

    if (player === "cf" && btnNextEpCount !== number) {
        if (firstTry_Cf) {
            isCf = false;
            return btnNextEpCount;
        } else {
            let arrClick = Math.abs(start - clicked);
            return btnNextEpCount = arrClick + 1;
        }

    } else if (player !== "cf" && btnNextEpCount !== start + 1) {
        return btnNextEpCount = clicked + 1;
    }
    return clicked;
}


// Download btn
let btnDownloadSpamCount = 0;
document.getElementById("download").addEventListener("click", () => {
    let downloadConfirm = epSet[2];

    if (downloadConfirm === "y" && btnDownloadSpamCount === 0) {
        btnDownloadSpamCount = 1;

        let timer = setInterval(() => {
            let seconds = 10;
            $("#notifprompt").text(`Please wait... ${seconds -= 1}`);
            $("#notifprompt").show();

            if (seconds === 0) {
                clearInterval(timer);
                $("#notifprompt").hide();
                btnDownloadSpamCount = 0;
                downloaderVideo();
            }
        }, 1000);
    } else if (downloadConfirm === "n") {
        notifAction("No Download Availble :(")
    }
    function downloaderVideo() {
        let videoType = epSet[3], epNumber = episodes[btnClick - 1];

        if (videoType === "g") {
            location.href = `https://drive.google.com/u/0/uc?id=${epNumber}&export=download`;
        } else {
            location.href = epNumber;
        }
    }
});


function btnEpisodeClick(number) {
    let sourceType = epSet[0];

    switch (sourceType) {
        case "i":
            forFrame(number);
            break;
        case "j":
            forJwPlayer(number);
            break;
        case "p":
            forPlayerIo(number);
            break;
        case "cf":
            forcustomPlayer(number);
            break;
        default:
            console.log("Error no player Identify")
    }
}

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
        player = `<iframe allowfullscreen frameborder="0" height="100%" loading="lazy" marginheight="0"  marginwidth="0" mozallowfullscreen="true" scrolling="NO" src="" webkitallowfullscreen="true" width="100%" id="iframePlayer"></iframe>`;
    }
    if (playerType == "j") {
        player = `<div id="#spt_holder_vdbox"><div id="ahesuifu"></div></div>`;
    }
    if (playerType == "p") {
        player = `<div id="container"><video controls poster=""class="vid1"><source src="" type="video/mp4"></video></div>`;
    }

    let fcode = `<div id="shadow"></div><div class="stream-navbar"><div class="stream-pinfo"><span id="countEp">EP 1</span><span id="playerType">Internal Player</span></div><div class="navbar-right"><i class="bi bi-arrow-left-right" id="switchP"></i><i class="bi bi-lightbulb-fill" id="lightOn"></i><i class="bi bi-download" id="download"></i><i class="bi bi-magic" id="autoplay"></i><i class="bi bi-fast-forward-fill" id="nextEp"></i></div></div><div class="DagPlaArea DagTo"><div class="video-content" id="PlayVideo"><div id="embed_holder"><div class="player-embed" id="pembed"><div class="playerload"></div><div id="player_embed"><div class="pframe">${player}</div><div id="notifprompt">Don't Spam</div></div></div></div></div></div><div class="stream-nav"><div><div class="stream-server">External Stream</div><div id="change-server"><i class="stnav-gin fa fa-cog" aria-hidden="true"></i><span class="txtServer">Server</span></div><div id="btn-share"><i class="stnav-gin fas fa-share"></i><span class="txtShare">Share</span></div><div id="btn-report"><i class="stnav-gin fas fa-exclamation-circle stnav-gin"></i><span class="txtReport">Report</span></div><div id="btn-reload"><i class="stnav-gin fas fa-redo"></i><span class="txtReload">Reload</span></div><div id="btn-fullscreen"><i class="stnav-gin fas fa-expand"></i><span class="txtFull">Full Screen</span></div></div><div class="animetitle"><a id="animebtn"><svg stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="25" width="25" id="foldersvg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg></a><span id="animetitle"></span></div><div id="episodes-list"></div><div class="s-navbottom"><div class="navbottom-left"><span id="genres"></span><br><span id="status"></span><span id="moreinfo"><a id="morebtn">More Info</a></span></div><div class="navbottom-right"><span id="eptotal"></span></div></div></div>`

    $("#extra-info").after(fcode);
}

function postStatusInfo() {
    const genres = $("#genresTarget a").text().split(',').map(g => g.trim());
    const genreLinks = genres.map(g => `<a href="https://www.rioanimeplay.xyz/search/label/${g}" rel="tag">${g}</a>`);
    const genre = genreLinks.join(', ');
    $("#genres").append(`Genres: ${genre}`);
    const status = $("#statusTarget a").text().trim();
    const statusText = status === 'Finished Airing' ? 'Completed' : status;
    $("#status").text(`Status: ${statusText}`);
}

document.getElementById("lightOn").addEventListener("click", () => {
    toggleLight();
})

let lighton = true;
function toggleLight() {
    let streamCplayer = document.getElementById("PlayVideo"),
        light = document.getElementById("lightOn"),
        shadow = document.getElementById("shadow"),
        navPright = document.querySelector(".navbar-right");

    if (lighton) {
        shadow.style.height = `${document.body.scrollHeight}px`;
        shadow.style.display = "block";
        navPright.style.position = "relative";
        navPright.style.zIndex = "10";
        streamCplayer.style.zIndex = "11";
        lighton = false;
    } else {
        shadow.style.display = "none";
        shadow.style.height = "0";
        navPright.style.position = "";
        navPright.style.zIndex = "";
        streamCplayer.style.zIndex = "";
        lighton = true;
    }
}
