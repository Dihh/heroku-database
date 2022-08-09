const sqlite3 = require('sqlite3').verbose();
const uuidv4 = require('uuid').v4;
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const db = new sqlite3.Database('./temp.db', sqlite3.OPEN_READWRITE, (err) => { });

db.serialize(() => {
  // db.run("CREATE TABLE users (id STRING, name STRING)");
});

app.use(express.json());

app.get('/users', (req, res) => {
  db.serialize(() => {
    db.all("SELECT id, name FROM users", (err, rows) => {
      res.json(rows)
    });
  });
})

app.post('/users', (req, res) => {
  db.serialize(() => {
    const user = req.body
    user.id = uuidv4()
    db.run(`INSERT INTO users (id, name) VALUES ('${user.id}','${user.name}');`);
    res.json(user)
  });
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})