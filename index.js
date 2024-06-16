const express = require('express');
const app = express();




const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

 
app.use(express.static('public'));


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => {
  return isNaN(date.getTime());
}


app.get("/api/:date", (request, response) => {

  let date 

  if(request.params.date) {
    if(!isNaN(request.params.date)) {
      date = new Date(parseInt(request.params.date))
    } else {
      date = new Date(request.params.date)
    }
  } else {
    date = new Date()
  }

  if(isInvalidDate(date)) {
    response.json({ error: "Invalid Date" })
  } else {
    response.json({ 
      unix: date.getTime(), 
      utc: date.toUTCString() 
    })
  }
})






const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
