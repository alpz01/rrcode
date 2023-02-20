let episodes = [];
for (let i = 1; i <= 148; i++) {
  let fcode = "https://archive.org/download/";
  
  if (i < 61) {
      episodes.push(`${fcode}anime-2.0-5/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${i}.mp4`)
  } else if (i > 60 && i < 102) {
      episodes.push(`${fcode}anime-2.0-100/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${i}.mp4`)
  } else if (i > 100) {
       episodes.push(`${fcode}anime-2.0-114/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${i}.mp4`)
  }
}
