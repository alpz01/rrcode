function createDiv(i){"i"==i?player='<iframe allowfullscreen frameborder="0" height="100%" loading="lazy" marginheight="0"  marginwidth="0" mozallowfullscreen="true" scrolling="NO" src="" webkitallowfullscreen="true" width="100%" id="iframePlayer"></iframe>':"j"==i?player='<div id="#spt_holder_vdbox"><script src="https://content.jwplatform.com/libraries/LJ361JYj.js"><\/script><div id="ahesuifu"></div></div>':"p"==i?player='<div id="container"><video controls poster=""class="vid1"><source src="" type="video/mp4"></video></div>':console.log("No Player Identify");let e=`<div id="shadow"></div><div class="nav_bar"><div class="ep_title"><span id="ep_count">EP 1</span><span class="e_server">External Server</span></div><div class="ep_menu_bar"><i class="bi bi-arrow-clockwise" id="bar_refresh"></i><i class="bi bi-hdd-stack" id="bar_server"></i><i class="bi bi-download" id="bar_dl"></i><i class="bi bi-fast-forward-fill" id="bar_next"></i></div></div><div class="DagPlaArea DagTo"><div class="video-content" id="PlayVideo"><div id="embed_holder"><div class="player-embed" id="pembed"><div class="playerload"></div><div id="player_embed"><div class="pframe">${player}</div></div></div></div></div><div class="video-nav"><div class="itemleft"><div class="icon DagLight"><svg viewBox="0 0 24 24"><path d="M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z" fill="currentColor"/></svg><span>Turn on Light</span></div><div class="icon DagShre"><svg viewBox="0 0 24 24" aria-hidden="true" height="1em" preserveAspectRatio="xMidYMid meet" role="img" width="1em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none"><path d="M3 3h6v2H5v4H3V3z" fill="currentColor"/><path d="M3 21h6v-2H5v-4H3v6z" fill="currentColor"/><path d="M15 21h6v-6h-2v4h-4v2z" fill="currentColor"/><path d="M21 3h-6v2h4v4h2V3z" fill="currentColor"/></g></svg><a href="#PlayVideo">Expand</a></div><div class="icon DagCom"><svg viewBox="0 0 24 24"><path d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z" fill="currentColor"/></svg><a href="#comments"><span>Comment</span></a></div></div><div class="itemright"><div class="icon Report"><svg viewBox="0 0 192 512" aria-hidden="true" height="1em" preserveAspectRatio="xMidYMid meet" role="img" width="0.38em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80s35.888-80 80-80s80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" fill="currentColor"/></svg><span>Report</span></div></div></div></div><div class="server_option"><span class="fl-space"><i class="bi bi-folder fl-edit"></i></span><div id="dis_ep"></div><div class="dis_bottom"><div class="epstatus"><div id="epcountdown"></div></div></div><div id="notifPrompt"></div></div>`;$(e).insertAfter("#extra-info")} export {createDiv}
