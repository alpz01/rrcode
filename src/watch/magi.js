episodes = [];
for (let i = 1; i <= 50; i++){
  let fcode = "https://archive.org/download/";
  if (i < 10) {
    episodes.push(`${fcode}noodols-25/Noodols-${i}.mp4`)
  } else if (i > 9) {
    episodes.push(`${fcode}noodols-25_202208/Noodols-${i}.mp4`)
  }
}
