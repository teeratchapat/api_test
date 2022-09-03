const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const DB = {
  courses: [],
  books:[],
  users:[],
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    console.log('work');

    res.statusCode = 200;
    //หาข้อมูล
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello');

    return;
  } else if (req.url === '/api/books' || req.url === '/api/books/') {
    if (req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(DB['books']));

      return;
    } else if (req.method === 'POST') {
      const buffers = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const dataString = Buffer.concat(buffers).toString();
      const data = JSON.parse(dataString); // name, price
      if(data.name == null||data.price == null){
        res.statusCode = 400;
        res.end('require name and price');

        return 
      }
      const book = saveToDatabase('books', {
        name: data.name,
        price: data.price,
        isPublic: 0,
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          id: book.id,
        })
      );

      return;
    }
  } //user_list
  else if (req.url === '/api/users' || req.usl === '/api/users/'){
    if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(DB['users']));
  
        return;
      } else if (req.method === 'POST') {
        const buffers = [];
  
        for await (const chunk of req) {
          buffers.push(chunk);
        }
  
        const dataString = Buffer.concat(buffers).toString();
        const data = JSON.parse(dataString); // username, password ,email ,isAdmin
  
        const user = saveToDatabase('users', {
            username: data.username,
            password: data.password,
            email: data.email,
            isAdmin: 0,
        });
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
  
        res.end(
          JSON.stringify({
            id: user.id,
          })
        );
  
        return;
      }

  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('not found');
});
//
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function saveToDatabase(table, data) {
  const db = DB[table];
  data.id = db.length + 1;
  db.push(data);

  return data;
}

