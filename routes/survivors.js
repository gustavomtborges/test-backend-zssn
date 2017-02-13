import SurvivorsController from '../controllers/survivors';

export default (app) => {
  const survivorsController = new SurvivorsController(app.datasource.Survivors);

  app.route('/api/survivors')
    .get((req, res) => {
      survivorsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      survivorsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/api/survivors/:id')
    .get((req, res) => {
      survivorsController.getById(req.params.id)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      survivorsController.update(req.params.id, req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/api/survivors/report_infection')
    .post((req, res) => {
      survivorsController.reportInfection(req.body.id)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};

