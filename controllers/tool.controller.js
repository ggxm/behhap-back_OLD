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
			Models.tool.create(req.body)
				.then(data => resolve(data))
				.catch(err => reject(err))
		})
	}

	const readAll = () => {
		return new Promise((resolve, reject) => {
			// Mongoose population to get associated data
			Models.tool.find()
				.populate({
					path: 'categories'
				})
				.populate({
					path: 'tags',
					populate: {
						path: 'category'
					}
				})
				.exec((err, data) => {
					if (err) { return reject(err) }
					else { return resolve(data) }
				})
		})
	}

	const readOne = id => {
		return new Promise((resolve, reject) => {
			// Mongoose population to get associated data
			Models.tool.findById(id)
				.populate({
					path: 'categories'
				})
				.populate({
					path: 'tags',
					populate: {
						path: 'category'
					}
				})
				.exec((err, data) => {
					if (err) { return reject(err) }
					else { return resolve(data) }
				})
		})
	}

	const updateOne = req => {
		return new Promise((resolve, reject) => {
			// Get tool by ID
			Models.tool.findById(req.params.id)
				.then(tool => {
					// Update object
					tool.name = req.body.name;
					tool.description = req.body.description;
					tool.image = req.body.image;
					tool.url = req.body.url;

					tool.categories = req.body.categories;
					tool.tags = req.body.tags;

					tool.isPublished = req.body.isPublished;
					tool.dateModified = new Date();

					// Save tool changes
					tool.save()
						.then(updatedTool => resolve(updatedTool))
						.catch(updateError => reject(updateError))
				})
				.catch(err => reject(err))
		})
	}

	const deleteOne = req => {
		return new Promise((resolve, reject) => {
			// Delete object
			Models.tool.findByIdAndDelete(req.params.id, (err, deleted) => {
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