const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

const port = process.env.PORT || 3000;

const whiteList = ['http://localhost:8080', 'https://myapp.co'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi, this is my first NodeJS Express server');
});

app.get('/products', (req, res) => {
  res.json({ name: 'Glass', price: 32.03 });
});

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
