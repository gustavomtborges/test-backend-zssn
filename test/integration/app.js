describe('Routes survivors', () => {
  const Survivor = app.datasource.Survivor;
  const defaultSurvivor = {
    name: 'Tião Galinha',
    age: 32,
    gender: 'M',
    location: 'POINT (0 0)',
    inventory: [
      { item: 'water', quantity: 1 },
      { item: 'food', quantity: 2 },
      { item: 'medication', quantity: 3 },
      { item: 'ammunition', quantity: 4 }],
  };
  let defaultSurvivorId = '';

  before((done) => {
    Survivor.remove({})
      .then(() => {
        new Survivor(defaultSurvivor).save().then((survivor) => {
          defaultSurvivorId = survivor._id.toString();
        });
      })
      .then(() => {
        done();
      });
  });

  describe('Route GET /survivors', () => {
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

  describe('Route GET /survivors/{id}', () => {
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

  describe('Route POST /survivors', () => {
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

  describe('Route PUT /survivors/{id}', () => {
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
});
