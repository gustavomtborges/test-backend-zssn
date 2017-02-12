import SurvivorsController from '../../../controllers/survivors';

describe('Controllers: Survivors', () => {
  describe('Get all survivors: getAll()', () => {
    it('Should return a list of survivors', () => {
      const Survivors = {
        find: td.function(),
      };
      const expectedResponse = [{
        _id: '123AF',
        name: 'Tião Galinha',
        age: 32,
        gender: 'M',
        location: 'POINT (0 0)',
      }];
      td.when(Survivors.find({})).thenResolve(expectedResponse);
      const survivorsController = new SurvivorsController(Survivors);

      return survivorsController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a survivor by id: getById()', () => {
    it('Should return a survivor', () => {
      const Survivors = {
        findById: td.function(),
      };
      const expectedResponse = {
        _id: '123AF',
        name: 'Tião Galinha',
        age: 32,
        gender: 'M',
        location: 'POINT (0 0)',
      };
      td.when(Survivors.findById('123AF')).thenResolve(expectedResponse);
      const survivorsController = new SurvivorsController(Survivors);

      return survivorsController.getById('123AF')
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a survivor: create()', () => {
    it('Should create a survivor', () => {
      const Survivors = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Dona menina',
        age: 40,
        gender: 'F',
        location: 'POINT (-46000, -16000)',
      };
      const expectedResponse = {
        name: 'Dona menina',
        age: 40,
        gender: 'F',
        location: 'POINT (-46000, -16000)',
      };
      td.when(Survivors.create(requestBody)).thenResolve(expectedResponse);
      const survivorsController = new SurvivorsController(Survivors);

      return survivorsController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a survivor: update()', () => {
    it('Should update a survivor', () => {
      const Survivors = {
        update: td.function(),
      };

      const requestBody = {
        id: '123AS',
        name: 'Dona menina',
        age: 40,
        gender: 'F',
        location: 'POINT (-46000, -16000)',
      };
      const expectedResponse = { n: 1, nModified: 1, ok: 1 };
      td.when(Survivors.update({ _id: requestBody.id }, requestBody)).thenResolve(expectedResponse);
      const survivorsController = new SurvivorsController(Survivors);

      return survivorsController.update({ _id: requestBody.id }, requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(200);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Cannot update inventory survivor: update()', () => {
    it('Should not update a inventory survivor', () => {
      const requestBody = {
        id: '123AS',
        inventory: {
          water: 1,
          food: 2,
        },
      };
      const expectedResponse = {
        message: { error: 'You cannot update inventory' },
        statusCode: 406,
      };
      const survivorsController = new SurvivorsController({});

      return survivorsController.update({ _id: requestBody.id }, requestBody) === expectedResponse;
    });
  });
});
