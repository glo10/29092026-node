export default class GenericRepository {
  constructor(model) {
    this.model = model
  }

  async save(entity) {
    return this.model.create(entity)
    .catch((err) => err)
  }

  async findAll() {
    return this.model.find()
    .then((results) =>{
      return results
    })
    .catch((err) => err)
  }

  async findOne(objFilter) {
    return this.model.findOne(objFilter)
    .then((entity) => {
      if(entity && entity._id) return entity
      return { message : `entity ${_id} does not exist` }
    })
    .catch((err) => err)
  }
}