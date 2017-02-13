import express from 'express';
import bodyParser from 'body-parser';
import datasource from './config/datasource';
import survivorsRoute from './routes/survivors';

const app = express();
app.use(bodyParser.json());
app.datasource = datasource;

survivorsRoute(app);

app.route('/api')
  .get((req, res) => {
    res.sendFile('index.html', { root: __dirname });
  });

export default app;
