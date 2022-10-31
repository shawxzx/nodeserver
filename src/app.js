const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Settup Database connection
*/
// connect to database
const mysql = require('mysql');

const db = mysql.createConnection ({
  host: 'localhost',
  user: 'a3',
  password: 'Aa112211!',
  database: 'assignment3'
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;


/*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/var sql = "CREATE TABLE IF NOT EXISTS Notes (id int primary key AUTO_INCREMENT, text VARCHAR(255), lastModified VARCHAR(255),  dateCreated VARCHAR(255))";
connection.query(sql, function (err, result) 
{
  if (err) throw err;
  console.log("Table has been created");
}); 

app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')

