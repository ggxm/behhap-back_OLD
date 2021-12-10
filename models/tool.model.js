/*
Import
*/
	const mongoose = require('mongoose');
	const { Schema } = mongoose;
//

/*
Definition
*/
	const MySchema = new Schema({
		// Schema.org
		'@context': { type: String, default: 'http://schema.org' },
		'@type': { type: String, default: 'CreativeWork' },

		name: String,
		description: String,
		url: String,
		// TODO : Image > https://mongoosejs.com/docs/schematypes.html (picture)
		// image: String,

		categories: [{
			type: Schema.Types.ObjectId,
			ref: 'category'
		}],

		tags: [{
			type: Schema.Types.ObjectId,
			ref: 'tag',
			category: {
				type: Schema.Types.ObjectId,
				ref: 'category'
			}
		}],

		// Définir une valeur par défaut
		dateCreated: { type: Date, default: new Date() },
		dateModified: { type: Date, default: new Date() },
		isPublished: { type: Boolean, default: false }
	})
//

/* 
Export
*/
	module.exports = mongoose.model('tool', MySchema)
//