const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();

//for grid fs
var crypto = require('crypto')
var multer = require('multer')
var GridFsStorage = require('multer-gridfs-storage')
var Grid = require('gridfs-stream')
var methodOverride = require('method-override')


//import routes
const projectroutes = require('./routes/ProjectRoute');
const userroutes = require('./routes/UserRoute');
const path = require('path');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// DB Config
const db = require("./config/keys").mongoURI;



// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/*****************
Grid FS TRIALLLLLL
******************/ 
const gridConn = mongoose.createConnection(db, {useNewUrlParser: true})

//init gfs
let gfs;
gridConn.once('open',()=>{
    gfs = Grid(gridConn.db, mongoose.mongo)
    gfs.collection('uploads')
})

//Create storage engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });


app.post('/upload/cover-image', upload.single('cover-image'), (req,res)=>{
    console.log('new file: '+ req.file.originalname)
    res.send(req.file)
})

app.get('/image/:filename', (req,res)=>{ 
    gfs.files.findOne({filename: req.params.filename}, (err, file)=>{
        //check if files exist
        if (!file){
            return res.status(404).json({
                err: "No file exists"
            })
        }

        //Check if img
        if(file.contentType === "image/jpeg" || file.contentType === "image/png") {
            //read output to browser
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        } else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    })
})

app.delete('/upload/:filename', (req,res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        gfs.remove({_id: file._id, root: 'uploads'}, (err, gridStore)=>{
            if(err) {return res.status(404).json(
                    { err:  "could not delete"}
                )
            }
            res.redirect('/')
        })
    })
})



/*****************
Rest of the shit
******************/ 
app.use('/users', userroutes);
app.use('/projects', projectroutes);

if(process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })

}


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
