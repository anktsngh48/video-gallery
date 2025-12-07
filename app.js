const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPvjYo_ui_LrwooqJQBjRaHbamJ7xXLl33sWhUhowGoAGXL8FB8po6n_DcFe1kElUw7p8ZbfJYh3YH/pub?gid=0&single=true&output=csv";
let allVideos = [];

// Load CSV from Google Sheet
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
  });

// Render the list with file sizes
function renderList(videos) {
    const list = document.getElementById("videoList");
    list.innerHTML = "";

    videos.forEach(v => {
        const idSafe = v.name.replace(/\W/g, "");

        const li = document.createElement("li");
        li.className = "video-item";

        li.innerHTML = `
            <span class="video-name">${v.name}</span>
            <span class="video-size" id="size-${idSafe}">Loading...</span>
            <a class="video-link" href="${v.url}" target="_blank">Download</a>
        `;

        list.appendChild(li);

        // Fetch size
        fetchFileSize(v.url, idSafe);
    });
}

// Fetch file size using HEAD request
function fetchFileSize(url, id) {
    fetch(url, { method: "HEAD" })
        .then(response => {
            const size = response.headers.get("Content-Length");
            const el = document.getElementById("size-" + id);

            if (!size) {
                el.innerText = "";
                return;
            }

            el.innerText = formatBytes(size);
        })
        .catch(() => {
            const el = document.getElementById("size-" + id);
            el.innerText = "";
        });
}

// Convert bytes → KB/MB/GB
function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return "0 Bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

// Search filter
document.getElementById("searchInput").addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = allVideos.filter(v => v.name.toLowerCase().includes(term));
    renderList(filtered);
});
