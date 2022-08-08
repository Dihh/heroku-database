var http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./temp.db', sqlite3.OPEN_READWRITE, (err) => {
    console.log(err)
});

console.log(1)
db.serialize(() => {
    // db.run("CREATE TABLE users (name STRING)");
    // db.run("INSERT INTO users (name) VALUES ('Dihh'),('123');");
    db.each("SELECT * FROM users", (err, row) => {
        console.log(row);
    });
});
console.log(2)

db.close();
//create a server object:
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(3000); //the server object listens on port 8080