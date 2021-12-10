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
			Models.tag.create(req.body)
				.then(data => resolve(data))
				.catch(err => reject(err))
		})
	}

	const readAll = () => {
		return new Promise((resolve, reject) => {
			// Mongoose population to get associated data
			Models.tag.find()
				.populate('category')
				.exec((err, data) => {
					if (err) { return reject(err) }
					else { return resolve(data) }
				})
		})
	}

	const readOne = id => {
		return new Promise((resolve, reject) => {
			// Mongoose population to get associated data
			Models.tag.findById(id)
				.populate('category')
				.exec((err, data) => {
					if (err) { return reject(err) }
					else { return resolve(data) }
				})
		})
	}

	const updateOne = req => {
		return new Promise((resolve, reject) => {
			// Get tag by ID
			Models.tag.findById(req.params.id)
				.then(tag => {
					// Update object
					tag.name = req.body.name;
					tag.category = req.body.category;
					tag.isPublished = req.body.isPublished;
					tag.dateModified = new Date();

					// Save tag changes
					tag.save()
						.then(updatedTag => resolve(updatedTag))
						.catch(updateError => reject(updateError))
				})
				.catch(err => reject(err))
		})
	}

	const deleteOne = req => {
		return new Promise((resolve, reject) => {
			// Delete object
			Models.tag.findByIdAndDelete(req.params.id, (err, deleted) => {
				if (err) { return reject(err) }
				else { return resolve(deleted) };
			})
		});
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