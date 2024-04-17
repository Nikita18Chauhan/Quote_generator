document.addEventListener("DOMContentLoaded", function () {
    const quote = document.getElementById("quote");
    const author = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote");
    const tweetBtn = document.getElementById("tweet");

    const api_url = "https://api.quotable.io/random";

    async function getQuote(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                quote.textContent = data.content;
                author.textContent = data.author;
            } else {
                quote.textContent = "Failed to fetch the quote.";
                author.textContent = "";
            }
        } catch (error) {
            console.error("An error occurred:", error);
            quote.textContent = "An error occurred while fetching the quote.";
            author.textContent = "";
        }
    }

    newQuoteBtn.addEventListener("click", () => {
        getQuote(api_url);
    });

    tweetBtn.addEventListener("click", () => {
        const quoteText = quote.textContent;
        const authorText = author.textContent;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${quoteText} - ${authorText}`
        )}`;
        window.open(twitterUrl, "_blank");
    });

    getQuote(api_url);
});
