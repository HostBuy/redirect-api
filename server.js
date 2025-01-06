const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Load product links from JSON file
const productLinks = JSON.parse(fs.readFileSync('productLinks.json', 'utf-8'));

app.get('/redirect/:url', (req, res) => {
    const productUrl = decodeURIComponent(req.params.url);
    const externalUrl = productLinks[productUrl];
    if (externalUrl) {
        res.redirect(externalUrl);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

