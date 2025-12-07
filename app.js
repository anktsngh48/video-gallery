const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPvjYo_ui_LrwooqJQBjRaHbamJ7xXLl33sWhUhowGoAGXL8FB8po6n_DcFe1kElUw7p8ZbfJYh3YH/pub?gid=0&single=true&output=csv"; // Replace with your Google Sheet CSV link
let allVideos = [];

// Fetch video list from Google Sheet
fetch(sheetURL)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split("\n");
    const headers = rows.shift().split(",").map(h => h.trim().toLowerCase());

    const nameIndex = headers.indexOf("name");
    const urlIndex = headers.indexOf("url");

    allVideos = rows.map(r => {
      const parts = r.split(",");
      return {
        name: parts[nameIndex]?.replace(/"/g, "").trim(),
        url: parts[urlIndex]?.replace(/"/g, "").trim()
      };
    });

    renderList(allVideos);
  })
  .catch(err => {
    document.getElementById("videoList").innerHTML = "Failed to load video list.";
    console.error(err);
  });

// Render video list
function renderList(videos) {
  const list = document.getElementById("videoList");
  list.innerHTML = "";

  videos.forEach(v => {
    const li = document.createElement("li");
    li.className = "video-item";

    li.innerHTML = `
      <span class="video-name">${v.name}</span>
      <a class="video-link" href="${v.url}" target="_blank">Download</a>
    `;

    list.appendChild(li);
  });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = allVideos.filter(v => v.name.toLowerCase().includes(term));
  renderList(filtered);
});

