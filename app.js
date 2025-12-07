fetch('videos.json')
  .then(response => response.json())
  .then(videos => {
    const list = document.getElementById('videoList');
    list.innerHTML = ""; 

    videos.forEach(video => {
      const item = document.createElement('li');
      item.innerHTML = `<a href="${video.url}" target="_blank">${video.name}</a>`;
      list.appendChild(item);
    });
  })
  .catch(error => {
    document.getElementById('videoList').innerHTML = "Failed to load video list.";
    console.error(error);
  });
