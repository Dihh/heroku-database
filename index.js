const sqlite3 = require('sqlite3').verbose();
const uuidv4 = require('uuid').v4;
const express = require('express')
const app = express()
const port = 3000
const { exec } = require('child_process');


const db = new sqlite3.Database('./temp.db', sqlite3.OPEN_READWRITE, (err) => {
  console.log(err)
});

db.serialize(() => {
  // db.run("CREATE TABLE users (id STRING, name STRING)");
  // db.run("INSERT INTO users (name) VALUES ('Dihh2'),('1233');");
  // db.each("SELECT * FROM users", (err, row) => {
  //     console.log(row);
  // });
});

try {
  exec('git config --local user.email "diegton@gmail.com"', (err) => console.log(err))
  exec('git config --local user.name "Diegton Rodrigues"', (err) => console.log(err))
} catch (e) { }
exec('ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts', (err, stdout) => {
  console.log("user")
  console.log(stdout)
})

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