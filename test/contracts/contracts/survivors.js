describe('Routes survivors', () => {
  const Survivors = app.datasource.Survivors;
  const defaultSurvivor = {
    name: 'Tião Galinha',
    age: 32,
    gender: 'M',
    location: 'POINT (0 0)',
    infectedCount: 2,
    inventory: [
      { item: 'water', quantity: 1 },
      { item: 'food', quantity: 2 },
      { item: 'medication', quantity: 3 },
      { item: 'ammunition', quantity: 4 }],
  };
  let defaultSurvivorId = '';

  before((done) => {
    Survivors.remove({})
      .then(() => {
        new Survivors(defaultSurvivor).save().then((survivor) => {
          defaultSurvivorId = survivor._id.toString();
        });
      })
      .then(() => {
        done();
      });
  });

  describe('Route GET /api/survivors', () => {
    it('should return a list of survivors', (done) => {
      const survivorsList = Joi.array().items(Joi.object().keys({
        _id: Joi.string(),
        name: Joi.string(),
        age: Joi.number(),
        gender: Joi.string(),
        location: Joi.string(),
        infectedCount: Joi.number(),
        infected: Joi.boolean(),
        inventory: Joi.array().items(Joi.object().keys(
          {
            quantity: Joi.number(),
            item: Joi.string(),
          })),
        __v: Joi.number(),

      }));
      request
        .get('/api/survivors')
        .end((err, res) => {
          joiAssert(res.body, survivorsList);
          done(err);
        });
    });
  });

  describe('Route GET /api/survivors/{id}', () => {
    it('should return a survivor', (done) => {
      const survivor = Joi.object().keys({
        _id: Joi.string(),
        name: Joi.string(),
        age: Joi.number(),
        gender: Joi.string(),
        location: Joi.string(),
        infectedCount: Joi.number(),
        infected: Joi.boolean(),
        inventory: Joi.array().items(Joi.object().keys(
          {
            quantity: Joi.number(),
            item: Joi.string(),
          })),
        __v: Joi.number(),

      });
      request
        .get(`/api/survivors/${defaultSurvivorId}`)
        .end((err, res) => {
          joiAssert(res.body, survivor);
          done(err);
        });
    });
  });

  describe('Route POST /api/survivors', () => {
    it('should create a survivor', (done) => {
      const newSurvivor = {
        name: 'Zé Prequeté',
        age: 21,
        gender: 'M',
        location: 'POINT (-4800 -16000)',
        inventory: [
          { item: 'water', quantity: 1 },
          { item: 'food', quantity: 2 },
          { item: 'medication', quantity: 3 },
          { item: 'ammunition', quantity: 4 }],
      };
      const survivor = Joi.object().keys({
        _id: Joi.string(),
        name: Joi.string(),
        age: Joi.number(),
        gender: Joi.string(),
        location: Joi.string(),
        infectedCount: Joi.number(),
        infected: Joi.boolean(),
        inventory: Joi.array().items(Joi.object().keys(
          {
            quantity: Joi.number(),
            item: Joi.string(),
          })),
        __v: Joi.number(),
      });

      request
        .post('/api/survivors')
        .send(newSurvivor)
        .end((err, res) => {
          joiAssert(res.body, survivor);
          done(err);
        });
    });
  });

  describe('Route PUT /api/survivors/{id}', () => {
    it('should update a survivor', (done) => {
      const updatedSurvivor = {
        age: 25,
        gender: 'M',
        location: 'POINT (-4800 -10000)',
      };

      const updatedRows = Joi.object().keys({
        n: Joi.number(),
        nModified: Joi.number(),
        ok: Joi.number(),
      });

      request
        .put(`/api/survivors/${defaultSurvivorId}`)
        .send(updatedSurvivor)
        .end((err, res) => {
          joiAssert(res.body, updatedRows);
          done(err);
        });
    });
  });

  describe('Route PUT /api/survivors/{id}', () => {
    it('a survivor should not change their inventory', (done) => {
      const newInventory = {
        inventory: {
          water: 20,
          food: 100,
        },
      };
      request
        .put(`/api/survivors/${defaultSurvivorId}`)
        .send(newInventory)
        .end((err, res) => {
          expect(res.status).to.be.eql(406);
          done(err);
        });
    });
  });

  describe('Route POST /api/survivors/report_infection', () => {
    it('should register a suspected survivor as infected', (done) => {
      const isInfected = {
        id: defaultSurvivorId,
      };
      const survivor = Joi.object().keys({
        _id: Joi.string(),
        name: Joi.string(),
        age: Joi.number(),
        gender: Joi.string(),
        location: Joi.string(),
        infectedCount: Joi.number(),
        infected: Joi.boolean(),
        inventory: Joi.array().items(Joi.object().keys(
          {
            quantity: Joi.number(),
            item: Joi.string(),
          })),
        __v: Joi.number(),

      });
      request
        .post('/api/survivors/report_infection')
        .send(isInfected)
        .end((err, res) => {
          joiAssert(res.body, survivor);
          done(err);
        });
    });
  });

  describe('Route POST /api/survivors/report_infection', () => {
    it('should mark a survivor as infected if him has 3 or more reports', (done) => {
      const halfInfected = {
        id: defaultSurvivorId,
      };
      const survivor = Joi.object().keys({
        _id: Joi.string(),
        name: Joi.string(),
        age: Joi.number(),
        gender: Joi.string(),
        location: Joi.string(),
        infectedCount: Joi.number(),
        infected: Joi.boolean(),
        inventory: Joi.array().items(Joi.object().keys(
          {
            quantity: Joi.number(),
            item: Joi.string(),
          })),
        __v: Joi.number(),
      });
      request
        .post('/api/survivors/report_infection')
        .send(halfInfected)
        .end((err, res) => {
          joiAssert(res.body, survivor);
          done(err);
        });
    });
  });
});
