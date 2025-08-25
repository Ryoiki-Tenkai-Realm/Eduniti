
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const resultsList = document.getElementById("results");
    let pdfData = [];

    // Fetch PDF data from JSON
    fetch("pdfs.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch PDF data");
            }
            return response.json();
        })
        .then(data => {
            pdfData = data;
            displayResults(pdfData); // Initial display of all PDFs
        })
        .catch(error => {
            console.error("Error:", error);
        });

    // Function to display results
    function displayResults(items) {
        resultsList.innerHTML = ""; // Clear current list
        if (items.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No results found.";
            resultsList.appendChild(li);
            return;
        }

        items.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = item.url;
            a.textContent = item.title;
            a.target = "_blank"; // Open in new tab
            li.appendChild(a);
            resultsList.appendChild(li);
        });
    }

    // Filter results on input
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = pdfData.filter(item =>
            item.title.toLowerCase().includes(query)
        );
        displayResults(filtered);
    });
});

