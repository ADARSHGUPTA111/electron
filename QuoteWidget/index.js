let request = require("request");

setInterval(() => {
  request(
    "https://quotesondesign.com/wp-json/wp/v2/posts/?[orderby]=rand&filter[posts_per_page]=1",
    // "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",

    function (err, response, body) {
      let bodyJson = JSON.parse(body);
      let randomQuote = bodyJson[0]["content"];
      document.getElementById("quote").innerHTML = randomQuote;
    }
  );
}, 2000);
