let PrevBtnPos = 0;
let btnClick = 1;
let episodes_list = [];
let count = epSet[1];

createDiv(epSet[0]);
createButton();
vidStream();
openStart();
postStatusInfo();

function openStart() {
    let plyr = epSet[0];

    $("#animetitle").text(document.title)
    $("#iframePlayer").attr("src", episodes_list[0]);
    $(".vid1 source").attr("src", episodes_list[0]);
    $("#eptotal").text(`Ep total : ${epSet[1]}`)

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
    let btnContainer = document.getElementById("episodes-list");
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


function createButton() {
    let btnContainer = document.getElementById('episodes-list');
    let btns = btnContainer.getElementsByClassName("play-button");

    for (let i = 1; i <= count; i++) {
        let element = document.createElement("button");
        element.setAttribute("class", "play-button");
        element.setAttribute("onclick", "playButton()");
        element.appendChild(document.createTextNode(`${i}`));
        $("#episodes-list").append(element);
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
                $(".stream-server").text("YouTube Stream")
                break;
            case "g":
                link = `https://drive.google.com/file/d/${episodes[i - 1]}/preview`;
                episodes_list.push(link);
                $(".stream-server").text("GDrive Stream");
                break;
            case "n":
                episodes_list = episodes;
                break;
        }
    }
}

// reload button
document.getElementById("btn-reload").addEventListener("click", () => {
    videoReload();
})

let btnReloadCount = 0;
function videoReload() {
    if (btnReloadCount == 0) {
        btnEpisodeClick(btnClick);
        btnReloadCount = 1;
        notifAction("Reloading Video");
        reset();
    } else {
        notifAction("Don't Spam")
    }

    function reset() {
        setTimeout(() => {
            btnReloadCount = 0;
        }, 12000);
    }
}

// next button
let btnNextSpamCount = 0;
let btnNextEpCount = 1;
document.getElementById("nextEp").addEventListener("click", () => {
    let totalEp = epSet[1], nextEp = getNextEp();

    if (btnNextSpamCount == 0) {
        if (nextEp <= totalEp) {
            btnEpisodeClick(nextEp);
            disableButton(nextEp);
            btnClick = nextEp;
            btnNextEpCount = nextEp;
            $("#countEp").text(`EP ${nextEp}`);
        }
        btnNextSpamCount = 1;
        reset();
    } else {
        nextEp <= totalEp ? notifAction("Please wait!!!") : null;
    }

    function reset() {
        setTimeout(() => {
            btnNextSpamCount = 0;
        }, 1600);
    }
})


// download button
function getNextEp() {
    let totalEp = epSet[1];
    let clicked = btnClick;

    if (btnNextEpCount != totalEp + 1) {
        return btnNextEpCount = clicked + 1;
    } else {
        return clicked;
    }
}

let btnDownloadSpamCount = 0;
document.getElementById("download").addEventListener("click", () => {
    let downloadConfirm = epSet[2];

    if (downloadConfirm == "y" && btnDownloadSpamCount == 0) {
        let second = 1, seconds = 10;
        btnDownloadSpamCount = 1;

        let timer = setInterval(() => {
            $("#notifprompt").text(`Please wait... ${seconds - second}`);
            $("#notifprompt").show()

            if (second > seconds) {
                clearInterval(timer);
                $("#notifprompt").hide();
                downloaderVideo();
            }
        }, 1000);
    }
    if (downloadConfirm == "n") {
        notifAction("No Download Availble :(")
    }
})

function downloaderVideo() {
    let videoType = epSet[3], epNumber = episodes[btnClick - 1];

    if (videoType == "g") {
        location.href = `https://drive.google.com/u/0/uc?id=${epNumber}&export=download`
    } else {
        location.href = epNumber;
    }
}


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
        default:
            console.log("Error no player Identify")
    }
}

function notifAction(message) {
    $("#notifprompt").text(message);
    $("#notifprompt").fadeIn();
    $("#notifprompt").show();

    setTimeout(() => {
        $("#notifprompt").hide()
    }, 1600);
}

function createDiv(playerType) {
    if (playerType == "i") {
        player = `<iframe allowfullscreen frameborder="0" height="100%" loading="lazy" marginheight="0"  marginwidth="0" mozallowfullscreen="true" scrolling="NO" src="" webkitallowfullscreen="true" width="100%" id="iframePlayer"></iframe>`;
    }
    if (playerType == "j") {
        player = `<div id="#spt_holder_vdbox"><div id="ahesuifu"></div></div>`;
    }
    if (playerType == "p") {
        player = `<div id="container"><video controls poster=""class="vid1"><source src="" type="video/mp4"></video></div>`;
    }

    let fcode = `<div id="shadow"></div><div class="stream-navbar"><div class="stream-pinfo"><span id="countEp">EP 1</span><span id="playerType">External Player</span></div><div class="navbar-right"><i class="bi bi-arrow-left-right" id="switchP"></i><i class="bi bi-lightbulb-fill" id="lightOn"></i><i class="bi bi-download" id="download"></i><i class="bi bi-magic" id="autoplay"></i><i class="bi bi-fast-forward-fill" id="nextEp"></i></div></div><div class="DagPlaArea DagTo"><div class="video-content" id="PlayVideo"><div id="embed_holder"><div class="player-embed" id="pembed"><div class="playerload"></div><div id="player_embed"><div class="pframe">${player}</div><div id="notifprompt">Don't Spam</div></div></div></div></div></div><div class="stream-nav"><div><div class="stream-server">GoGo Stream</div><div id="change-server"><i class="stnav-gin fa fa-cog" aria-hidden="true"></i><span class="txtServer">Server</span></div><div id="btn-share"><i class="stnav-gin fas fa-share"></i><span class="txtShare">Share</span></div><div id="btn-report"><i class="stnav-gin fas fa-exclamation-circle stnav-gin"></i><span class="txtReport">Report</span></div><div id="btn-reload"><i class="stnav-gin fas fa-redo"></i><span class="txtReload">Reload</span></div><div id="btn-fullscreen"><i class="stnav-gin fas fa-expand"></i><span class="txtFull">Full Screen</span></div></div><div class="animetitle"><a id="animebtn"><svg stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="25" width="25" id="foldersvg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg></a><span id="animetitle"></span></div><div id="episodes-list"></div><div class="s-navbottom"><div class="navbottom-left"><span id="genres"></span><br><span id="status"></span><span id="moreinfo"><a id="morebtn">More Info</a></span></div><div class="navbottom-right"><span id="eptotal"></span></div></div></div>`

    $(".extra-info").after(fcode);
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
