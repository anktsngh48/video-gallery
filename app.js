// ============= ADD YOUR VIDEO URLS HERE =============
const videos = [
  {
    title: "Video 1",
    url: "https://cdn2.indiansexstories3.com/0/441/441.mp4"
  },
{
    title: "Video 2",
    url: "https://cdn2.indiansexstories3.com/0/442/442.mp4"
  },
{
    title: "Video 3",
    url: "https://cdn2.indiansexstories3.com/0/443/443.mp4"
  },
{
    title: "Video 4",
    url: "https://cdn2.indiansexstories3.com/0/441/444.mp4"
  },

  // Add more videos like this:
  // { title: "Video 2", url: "https://cdn2.rekha.com/path/to/file.mp4" },
];
// ====================================================

const container = document.getElementById("videos");

function createCard(v) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.className = "thumb";
  img.src = ""; // will be filled after thumbnail is generated
  img.style.background = "#ccc";
  img.dataset.url = v.url;
  img.onclick = () => window.open(v.url, "_blank");

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = v.title;

  const preview = document.createElement("a");
  preview.className = "btn preview";
  preview.href = v.url;
  preview.target = "_blank";
  preview.textContent = "Preview";

  const download = document.createElement("a");
  download.className = "btn";
  download.href = v.url;
  download.setAttribute("download", "");
  download.textContent = "Download";

  body.appendChild(title);
  body.appendChild(preview);
  body.appendChild(download);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}

videos.forEach(v => container.appendChild(createCard(v)));


// ============ AUTO-THUMBNAIL GENERATION ============
async function generateThumbnails() {
  const thumbs = document.querySelectorAll(".thumb");

  thumbs.forEach(async (img) => {
    const url = img.dataset.url;

    try {
      const video = document.createElement("video");
      video.src = url;
      video.crossOrigin = "anonymous";
      video.preload = "auto";

      await new Promise((resolve, reject) => {
        video.addEventListener("loadeddata", async () => {
          video.currentTime = 2; // capture at 2 seconds
        });

        video.addEventListener("seeked", () => resolve());
        video.addEventListener("error", reject);
      });

      // Create the thumbnail
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = (video.videoHeight / video.videoWidth) * 400;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      img.src = canvas.toDataURL("image/jpeg", 0.7);
    } catch (err) {
      // fallback thumbnail
      img.src =
        "https://dummyimage.com/400x250/cccccc/000000.png&text=Video";
    }
  });
}

generateThumbnails();
