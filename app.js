const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPvjYo_ui_LrwooqJQBjRaHbamJ7xXLl33sWhUhowGoAGXL8FB8po6n_DcFe1kElUw7p8ZbfJYh3YH/pub?gid=0&single=true&output=csv"; // Replace with your Google Sheet CSV link
let allVideos = [];

// Fetch CSV from Google Sheet
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n");
    const headers = rows.shift().split(",").map(h => h.trim().toLowerCase());

    const nameIndex = headers.indexOf("name");
    const urlIndex = headers.indexOf("url");
    const descIndex = headers.indexOf("description");

    allVideos = rows.map(r => {
      const parts = r.split(",");
      return {
        name: parts[nameIndex]?.replace(/"/g, "").trim(),
        url: parts[urlIndex]?.replace(/"/g, "").trim(),
        description: parts[descIndex]?.replace(/"/g, "").trim() || ""
      };
    });

    renderList(allVideos);
  })
  .catch(err => {
    document.getElementById("videoList").innerHTML = "Failed to load video list.";
    console.error(err);
  });

// Render video cards
function renderList(videos) {
  const container = document.getElementById("videoList");
  container.innerHTML = "";

  videos.forEach(v => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <div class="video-title">${v.name}</div>
      <div class="video-description">${v.description}</div>
      <a class="video-link" href="${v.url}" target="_blank">Play Video</a>
    `;

    container.appendChild(card);
  });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = allVideos.filter(v => v.name.toLowerCase().includes(term));
  renderList(filtered);
});


