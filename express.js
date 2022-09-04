const express = require("express");
const app = express();

app.use(express.json());

const hostname = "127.0.0.1";
const port = 3000;
const DB = {
  books: [
    {
        id: 1,
        name: "tee_book",
        price: 111,
    },
  ],
  users: [
    {
        name: "teebc",
        password: "1234",
        email: "tee.com",
        isAdmin: 0,
    },
  ],
};

app.get("/", (req, res) => {
  res.send("test api");
});

app.get("/api/books", (req, res) => {
  res.end(JSON.stringify(DB["books"]));
});

app.post("/api/books", (req, res) => {
  const data = req.body;
  const book = saveToDatabase("books", {
    name: data.name,
    price: data.price,
  });
  res.end(
    JSON.stringify({
      id: book.id,
    })
  );
});

app.get("/api/users", (req, res) => {
  res.send(JSON.stringify(DB["users"]));
});

app.post("/api/users", (req, res) => {
  const data = req.body;
  const user = saveToDatabase("users", {
    name: data.name,
    password: data.password,
    email: data.email,
    isAdmin: 0,
  });
  res.send(
    JSON.stringify({
      id: user.id,
    })
  );
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function saveToDatabase(table, data) {
  const db = DB[table];
  data.id = db.length + 1;
  db.push(data);

  return data;
}
