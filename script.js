let folderList = [];

  // Load JSON data
  fetch('pdfs.json')
    .then(response => response.json())
    .then(data => {
      folderList = data;
    });

  function displayResults(filteredFolders) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (filteredFolders.length === 0) return;

    filteredFolders.forEach(folder => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = folder.url;
      link.textContent = folder.name;
      link.target = '_blank';
      li.appendChild(link);
      results.appendChild(li);
    });
  }

  document.getElementById('searchBar').addEventListener('input', function (e) {
    const keyword = e.target.value.toLowerCase().trim();

    if (keyword === '') {
      displayResults([]);
      return;
    }

    const filtered = folderList.filter(folder =>
      folder.name.toLowerCase().includes(keyword)
    );

    displayResults(filtered);
  });