const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});
const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
}, statusCode);

const NUMBER_TO_BE_INFECTED = 3;

class SurvivorsController {
  constructor(Survivors) {
    this.Survivors = Survivors;
  }

  getAll() {
    return this.Survivors.find({})
      .then(survivors => defaultResponse(survivors))
      .catch(error => errorResponse(error.message));
  }

  getById(survivorId) {
    return this.Survivors.findById(survivorId)
      .then(survivor => defaultResponse(survivor))
      .catch(error => errorResponse(error.message));
  }

  create(survivor) {
    return this.Survivors.create(survivor)
      .then(createdSurvivor => defaultResponse(createdSurvivor, 201))
      .catch(error => errorResponse(error.message, 422));
  }

  update(params, survivor) {
    if (survivor.inventory) {
      return new Promise((resolve) => {
        resolve(errorResponse('You cannot update inventory', 406));
      });
    }
    return this.Survivors.update(params, survivor)
      .then(rowsUpdated => defaultResponse(rowsUpdated))
      .catch(error => errorResponse(error.message, 422));
  }

  reportInfection(survivorId) {
    return this.Survivors.findById(survivorId)
      .then((survivor) => {
        survivor.infectedCount += 1;
        survivor.infected = survivor.infectedCount >= NUMBER_TO_BE_INFECTED;
        return survivor.save()
          .then(updatedSurvivor => defaultResponse(updatedSurvivor))
          .catch(error => errorResponse(error.message, 422));
      })
      .catch(error => errorResponse(error.message));
  }
}

export default SurvivorsController;
