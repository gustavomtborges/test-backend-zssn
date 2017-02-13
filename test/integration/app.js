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
      request
        .get('/api/survivors')
        .end((err, res) => {
          expect(res.body[0]._id).to.be.eql(defaultSurvivorId);
          expect(res.body[0].name).to.be.eql(defaultSurvivor.name);
          expect(res.body[0].age).to.be.eql(defaultSurvivor.age);
          expect(res.body[0].gender).to.be.eql(defaultSurvivor.gender);
          expect(res.body[0].location).to.be.eql(defaultSurvivor.location);

          done(err);
        });
    });
  });

  describe('Route GET /api/survivors/{id}', () => {
    it('should return a survivor', (done) => {
      request
        .get(`/api/survivors/${defaultSurvivorId}`)
        .end((err, res) => {
          expect(res.body._id).to.be.eql(defaultSurvivorId);
          expect(res.body.name).to.be.eql(defaultSurvivor.name);
          expect(res.body.age).to.be.eql(defaultSurvivor.age);
          expect(res.body.gender).to.be.eql(defaultSurvivor.gender);
          expect(res.body.location).to.be.eql(defaultSurvivor.location);

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

      request
        .post('/api/survivors')
        .send(newSurvivor)
        .end((err, res) => {
          expect(res.body.name).to.be.eql(newSurvivor.name);
          expect(res.body.age).to.be.eql(newSurvivor.age);
          expect(res.body.gender).to.be.eql(newSurvivor.gender);
          expect(res.body.location).to.be.eql(newSurvivor.location);

          done(err);
        });
    });
  });

  describe('Route PUT /api/survivors/{id}', () => {
    it('should update a survivor', (done) => {
      const updatedSurvivor = {
        name: 'Zé Chumbrega',
        age: 25,
        gender: 'M',
        location: 'POINT (-4800 -10000)',
      };

      request
        .put(`/api/survivors/${defaultSurvivorId}`)
        .send(updatedSurvivor)
        .end((err, res) => {
          expect(res.body).to.be.eql({ n: 1, nModified: 1, ok: 1 });

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

      request
        .post('/api/survivors/report_infection')
        .send(isInfected)
        .end((err, res) => {
          expect(res.body.infectedCount).to.be.eql(3);

          done(err);
        });
    });
  });

  describe('Route POST /api/survivors/report_infection', () => {
    it('should mark a survivor as infected if him has 3 or more reports', (done) => {
      const halfInfected = {
        id: defaultSurvivorId,
      };

      request
        .post('/api/survivors/report_infection')
        .send(halfInfected)
        .end((err, res) => {
          expect(res.body.infected).to.be.eql(true);

          done(err);
        });
    });
  });
});

