const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
require('dotenv').config();

const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

const whiteList = ['http://localhost:8080'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('forbidden'));
    }
  },
};

app.use(cors(options));

app.use(express.json());

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // console.log(`app listening on port ${port}`);
});
