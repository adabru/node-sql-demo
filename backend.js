
help = _ => console.log(`

\x1b[1musage\x1b[0m: node backend.js path/to/demo.db host port

`)
var [_,_,dbPath,host,port] = process.argv
if(!dbPath || !host || !port) return help()


sqlite3 = require('sqlite3')
http    = require('http')
fs      = require('fs')


db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
  if (err) {
    console.error(err.message)
    process.exit()
  }
})


http.createServer((req, res) => {
  if(req.url == '/fruits') {
    db.all(`SELECT (name) FROM "favourite_fruits";`, [], (err, rows) => {
      if (err) {
        res.writeHead(500)
        res.end(err.message)
      } else {
        res.writeHead(200)
        res.end(JSON.stringify(rows.map(row => row.name)))
      }
    })
  } else if(req.url.startsWith('/fruits/')) {
    var newFruit = req.url.substr(8)
    db.run(`INSERT INTO "favourite_fruits" VALUES(?)`, [newFruit], err => {
      if (err) {
        res.writeHead(500)
        res.end(err.message)
      } else {
        res.writeHead(201)
        res.end('Fruit registered!')
      }
    });
  } else {
    res.writeHead(200, {'content-type': 'text/html'})
    fs.createReadStream('./index.html').pipe(res)
  }
}).listen(port, host, _ => console.log(`server running on http://${host}:${port}`))
