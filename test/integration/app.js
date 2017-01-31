describe('Routes survivors', () => {
  const defaultSurvivor = {
    name: 'Tiao Galinha',
    age: 32,
    gender: 'M',
    location: 'POINT (0 0)',
  };

  describe('Route GET /survivors', () => {
    it('should return a list of survivors', done => {
      request
        .get('/survivors')
        .end((err, res) => {
          expect(res.body[0].name).to.be.eql(defaultSurvivor.name);
          expect(res.body[0].age).to.be.eql(defaultSurvivor.age);
          expect(res.body[0].gender).to.be.eql(defaultSurvivor.gender);
          expect(res.body[0].location).to.be.eql(defaultSurvivor.location);

          done(err);
        });
    });
  });
});
