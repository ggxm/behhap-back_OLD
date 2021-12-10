/* 
Imports
*/
	const Models = require('../models/index');
//

/*  
CRUD methods
*/
	const createOne = req => {
		return new Promise((resolve, reject) => {
			Models.category.create(req.body)
				.then(data => resolve(data))
				.catch(err => reject(err))
		})
	}

	const readAll = () => {
		return new Promise((resolve, reject) => {
			Models.category.find()
				.exec((err, data) => {
					if (err) { return reject(err) }
					else { return resolve(data) }
				})
		})
	}

	const readOne = id => {
		return new Promise((resolve, reject) => {
			Models.category.findById(id)
				.exec((err, data) => {
					if (err) { return reject(err) }
					else { return resolve(data) }
				})
		})
	}

	const updateOne = req => {
		return new Promise((resolve, reject) => {
			// Get category by ID
			Models.category.findById(req.params.id)
				.then(category => {
					// Update object
					category.name = req.body.name;
					category.isPublished = req.body.isPublished;
					category.dateModified = new Date();

					// Save category changes
					category.save()
						.then(updatedCategory => resolve(updatedCategory))
						.catch(updateError => reject(updateError))
				})
				.catch(err => reject(err))
		})
	}

	const deleteOne = req => {
		return new Promise((resolve, reject) => {
			// Delete object
			Models.category.findByIdAndDelete(req.params.id, (err, deleted) => {
				if (err) { return reject(err) }
				else { return resolve(deleted) }
			})
		})
	}
//

/* 
Export controller methods
*/
	module.exports = {
		readAll,
		readOne,
		createOne,
		updateOne,
		deleteOne
	}
//