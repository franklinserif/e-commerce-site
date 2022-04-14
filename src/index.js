const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi, this is my first NodeJS Express server');
});

app.get('/products', (req, res) => {
  res.json({ name: 'Glass', price: 32.03 });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
