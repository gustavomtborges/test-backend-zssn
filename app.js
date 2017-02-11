import express from 'express';
import bodyParser from 'body-parser';
import datasource from './config/datasource';

const app = express();
app.use(bodyParser.json());
app.datasource = datasource;

const Survivor = datasource.Survivor;
const NUMBER_TO_BE_INFECTED = 3;

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
    if (req.body.inventory) {
      res.sendStatus(406);
    }
    Survivor.update({ _id: req.params.id }, req.body)
      .then(rows => res.json(rows))
      .catch(() => res.status(412));
  });

app.route('/api/survivors/report_infection')
  .post((req, res) => {
    Survivor.findById(req.body.id)
      .then((survivor) => {
        survivor.infectedCount += 1;
        survivor.infected = survivor.infectedCount >= NUMBER_TO_BE_INFECTED;
        survivor.save()
          .then(updatedSurvivor => res.json(updatedSurvivor));
      })
      .catch(() => res.status(412));
  });

export default app;
