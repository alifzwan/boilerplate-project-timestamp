require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.static('public'))

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
})

// Function to parse date string and handle errors
function parseDate(dateString) {
  if (!dateString) { // Empty date parameter, return current time
    return new Date();
  }
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) { // Invalid date string
    return null;
  }
  return parsedDate;
}

// API endpoint to handle date requests
app.get("/api/:date?", async function (request, response) {
  const dateString = request.params.date;
  const parsedDate = parseDate(dateString);

  if (!parsedDate) { // Invalid date
    return response.json({ error: "Invalid Date" });
  }

  const unix = parsedDate.getTime();
  const utc = parsedDate.toUTCString();

  response.json({ unix, utc });
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
