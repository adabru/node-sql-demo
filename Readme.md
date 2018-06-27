
# node-sql demo

Goal: enable a user to store his favourite fruits in a sql database.

## Create database

- Download SQLite binary from <https://sqlite.org/download.html>. SQLite provides (almost) the same functionality as MySQL. It is much more lightweight though.
- Extract it and start `sqlite3` in a terminal.
- You must see now a terminal with the last line `sqlite>`.
- Type `.open demo.db` to save your database in the file demo.db and press enter.
- You can see the created database file `demo.db` in the same folder as the `sqlite3` executable.
- SQL's concept is around tables, so we need to create one. We want to create the table `favourite_fruits` with the column `name` where we will store the fruits' names. Type `CREATE TABLE favourite_fruits ( name text );` and press enter.
- Enter `.tables` and you will see the table you just created.
- Let's add an apple to the table! Type `INSERT INTO "favourite_fruits" VALUES('apple');` and press enter.
- We want to verify that the apple is in the table now. Enter `SELECT (name) FROM "favourite_fruits";` for that purpose.
- Okay, now that our database and all tables are ready, we can close the `sqlite3` process by entering `.exit`.
- If use inspect the created `demo.db` file, you will find the apple in it ☺. This file is the database we will use for our server.

## Setup server

- I prepared a server for you. You need `git` to download it and `node` to run it. So install them if they are not.
- Open a terminal and type `git clone git@github.com:adabru/node-sql-demo.git` to download the server.
- Change directory with `cd node-sql-demo`.
- Our node server needs a library to connect to our SQL-`demo.db` database. We install it by entering `npm install sqlite3` into the terminal.
- Now that everything is there, we want to start the server. You need the path to your `demo.db` file. For me it is `../demo.db`. Now start the server with `node backend.js ../demo.db ::1 8080`.
- Point your browser to <http://[::1]:8080> and try to add your most favourite fruit!

## How the server uses the database

- The server uses the sqlite3 library to interact with the SQL database. Lets try it ourselves in nodes repl.
- Stop the server (^C / Ctrl-C).
- Start `node`.
- Type `sqlite3 = require('sqlite3')` to load the library.
- Open your database: `db = new sqlite3.Database('../demo.db', sqlite3.OPEN_READWRITE, console.error)`. If you get an error, you probably entered the wrong path to your `demo.db` file.
- Now we are ready to use the database! As start let's list all available fruits: ``db.all(`SELECT (name) FROM "favourite_fruits";`, [], (_, rows) => console.log(rows))``.
- Some tasty fruits there! But `ananas` is missing! Insert it: ``db.run(`INSERT INTO "favourite_fruits" VALUES('ananas')`)``.
- If you list them again, `ananas` is part of the team now ☺.

## Where to go from here

- More information on using SQL with the npm library `sqlite3` is on <http://www.sqlitetutorial.net/sqlite-nodejs/>.
- More information on the `sqlite3` binary can be found on <https://sqlite.org/>.
- Checkout <https://de.wikipedia.org/wiki/MongoDB> for a better SQL-alternative for node.js.
- If you're interested in sql+php, you may look at <https://www.w3schools.com/php/php_mysql_intro.asp>.