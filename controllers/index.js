/* 
Definition
*/
	const Controllers = {
		auth: require('./auth.controller'),
		post: require('./post.controller'),
		category: require('./category.controller'),
		tag: require('./tag.controller'),
		tool: require('./tool.controller')
	}
//

/*  
Export
*/
	module.exports = Controllers;
//