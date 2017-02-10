import express from 'express';
import bodyParser from 'body-parser';
import datasource from './config/datasource';

const app = express();
app.use(bodyParser.json());
app.datasource = datasource;

const Survivor = datasource.Survivor;

app.route('/api')
  .get((req, res) => {
    res.sendFile('index.html', { root: __dirname });
  });

app.route('/api/survivors')
  .get((req, res) => {
    Survivor.find({})
      .then(survivors => res.json(survivors))
      .catch(() => res.status(412));
  })
  .post((req, res) => {
    new Survivor(req.body).save()
      .then(survivor => res.json(survivor))
      .catch(() => res.status(412));
  });

app.route('/api/survivors/:id')
  .get((req, res) => {
    Survivor.findById(req.params.id)
      .then(survivor => res.json(survivor))
      .catch(() => res.status(412));
  })
  .put((req, res) => {
    Survivor.update({ _id: req.params.id }, req.body)
      .then(survivor => res.json(survivor))
      .catch(() => res.status(412));
  });

export default app;
