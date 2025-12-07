// ======== ADD YOUR VIDEOS HERE ========
const videos = [
  {
    title: "Sample Video 1",
    url: "https://cdn2.indiansexstories3.com/0/441/441.mp4"
  },

  // Add more:
  // { title: "Any name you want", url: "FULL_VIDEO_URL" }
];
// ======================================

const container = document.getElementById('videos');

function createCard(v){
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.className = 'thumb';
  img.src = "https://dummyimage.com/400x250/ccc/000.png&text=Video"; // simple placeholder thumbnail
  
  img.onclick = () => window.open(v.url, '_blank');

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = v.title;
  body.appendChild(title);

  const preview = document.createElement('a');
  preview.className = 'btn preview';
  preview.href = v.url;
  preview.target = "_blank";
  preview.textContent = "Preview";

  const download = document.createElement('a');
  download.className = 'btn';
  download.href = v.url;
  download.setAttribute('download', '');
  download.textContent = "Download";

  body.appendChild(preview);
  body.appendChild(download);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}

videos.forEach(v => container.appendChild(createCard(v)));