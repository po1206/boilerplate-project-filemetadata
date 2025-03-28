var express = require('express');
var cors = require('cors');
const multer = require("multer");
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({dest: 'uploads/'});
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file);
    if(!req.file) {
      return res.status(400).json({error: 'No file uploaded'});
    }
    console.log(req.file.originalname, req.file.mimetype, req.file.size);
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
