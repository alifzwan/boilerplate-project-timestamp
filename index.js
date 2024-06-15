require('dotenv').config();
const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

 
app.use(express.static('public'));


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});


const isInvalidDate = (date) => {
  date.toUTCString() === "Invalid Date";
}


// Your first API endpoint
app.get("/api/:date", (request, response) => {
  let date = new Date(request.params.date);
  
  if (isInvalidDate(date)) { // if date is invalid
    date = new Date(+request.params.date); // convert to number
  }

  // if date is still invalid, return error
  if(isInvalidDate(date)) {
    response.json({ error: "Invalid Date" });
    return
  }

  response.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  }) 
});

app.get('/', (request, response) => {
  response.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
})




const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
