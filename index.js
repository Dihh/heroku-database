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

exec('git config --local user.email "diegton@gmail.com"', (err) => console.log(err))
exec('git config --local user.name "Diegton Rodrigues"', (err) => console.log(err))

// const interval = setInterval(() => {
//   console.log("interval")
// }, 5000)

app.use(express.json());

app.get('/git', (req, res) => {

  exec('git add temp.db', (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      res.json('error')
    } else {
      exec(`git commit -m "${(new Date).getTime()}"`, (err, stdout, stderr) => {
        if (err) {
          console.log(err)
          res.send(err)
        } else {
          res.json('success')
        }
      })
    }
  });

})

app.get('/users', (req, res) => {
  db.serialize(() => {
    db.all("SELECT id, name FROM users", (err, rows) => {
      res.json(rows)
      // interval.refresh()
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
  console.log(`Example app listening on port ${port}`)
})