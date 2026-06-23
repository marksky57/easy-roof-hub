const express = require('express');
const path = require('path');

const app = express();

// Serve static files (css, js, assets)
app.use(express.static(path.join(__dirname)));

// Explicitly serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
