episodes = [];
for (let i = 1; i <= 40; i++) {
    let fcode = "https://archive.org/download/";
    if (i < 21) {
        episodes.push(`${fcode}a-ar-1x-5_202206/%E2%82%B3%D1%B6A%E2%88%94A%C2%AE%201x${i}.mp4`)
    } else if (i > 20) {
        episodes.push(`${fcode}a-ar-1x-5_202206/%E2%82%B3%D1%B6A%E2%88%94A%C2%AE%202x${i - 20}.mp4`)
    }
}
