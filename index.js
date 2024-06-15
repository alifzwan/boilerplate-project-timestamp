require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.static('public'))

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
})

// Fetch JSON data and send it to the client-side for display
app.get("/api/timestamp", async function (request, response) {
  try {
    const timestamp = request.query.timestamp; // Get timestamp from query string (optional)
    const url = timestamp ? `https://timestamp-microservice.freecodecamp.rocks/api/${timestamp}` : 'https://timestamp-microservice.freecodecamp.rocks/api/1451001600000'; // Default URL or use timestamp from query string

    // Use dynamic import for node-fetch (less common approach)
    const { default: fetch } = await import('node-fetch');

    const responseJson = await fetch(url); // Fetch JSON data
    const jsonData = await responseJson.json(); // Parse JSON response

    response.json(jsonData); // Send JSON data back to the client
  } catch (error) {
    console.error(error);
    response.status(500).send("Error fetching data"); // Handle errors
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
