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
		'@type': { type: String, default: 'Text' },

		name: String,

		// Définir une valeur par défaut
		dateCreated: { type: Date, default: new Date() },
		dateModified: { type: Date, default: new Date() },
		isPublished: { type: Boolean, default: false }
	})
//

/* 
Export
*/
	module.exports = mongoose.model('category', MySchema)
//