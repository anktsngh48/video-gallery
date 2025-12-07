const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPvjYo_ui_LrwooqJQBjRaHbamJ7xXLl33sWhUhowGoAGXL8FB8po6n_DcFe1kElUw7p8ZbfJYh3YH/pub?output=csv";

fetch(sheetURL)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1); // skip header
    const list = document.getElementById('videoList');
    list.innerHTML = "";

    rows.forEach(row => {
      const [name, url] = row.split(",");
      const item = document.createElement('li');
      item.innerHTML = `<a href="${url}" target="_blank">${name}</a>`;
      list.appendChild(item);
    });
  })
  .catch(err => {
    document.getElementById("videoList").innerHTML = "Failed to load videos.";
    console.error(err);
  });


