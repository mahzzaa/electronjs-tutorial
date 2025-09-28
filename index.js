let request = require("request");

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Load first quote
  request("https://zenquotes.io/api/random", function (error, response, body) {
    if (error) {
      console.error("Error fetching quote:", error);
      document.getElementById("quote-text").textContent = "Error loading quote";
      return;
    }

    let bodyJson = JSON.parse(body);
    const quote = bodyJson[0];
    document.getElementById("quote-text").textContent = '"' + quote.q + '"';
    document.getElementById("quote-author").textContent = "— " + quote.a;
  });

  // Change quote every 3 seconds
  setInterval(() => {
    request(
      "https://zenquotes.io/api/random",
      function (error, response, body) {
        if (error) {
          console.error("Error fetching quote:", error);
          document.getElementById("quote-text").textContent =
            "Error loading quote";
          return;
        }

        let bodyJson = JSON.parse(body);
        const quote = bodyJson[0];
        document.getElementById("quote-text").textContent = '"' + quote.q + '"';
        document.getElementById("quote-author").textContent = "— " + quote.a;
      }
    );
  }, 10000);
});
