/*
Imports
*/
	// Node
	const express = require('express');

	// Inner
	const Controllers = require('../controllers/index')
	const { checkFields } = require('../services/request.service');
	const Mandatory = require('../services/mandatory.service');
	const { renderSuccessVue, renderErrorVue } = require('../services/response.service');
//

/*
Routes definition
*/
	class BackendRouter {
		constructor({ passport }) {
			this.passport = passport
			this.router = express.Router();
		}

		routes() {

			/**
			 * 	LOGIN
			 */

			// [BACKOFFICE] Render login vue
			this.router.get('/login', (req, res) => {
				renderSuccessVue('login', req, res, null, 'Request succeed', false)
			})

			// [BACKOFFICE] Get data from client to log user and render index vue
			this.router.post('/login', (req, res) => {

				// Check body data
				if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
					return renderErrorVue('index', req, res, 'No data provided', 'Request failed')
				}
				else {

					// Check body data
					const { ok, extra, miss } = checkFields(Mandatory.login, req.body);

					// Error: bad fields provided
					if (!ok) { return renderErrorVue('index', '/login', 'POST', res, 'Bad fields provided', { extra, miss }) }
					else {
						Controllers.auth.login(req, res)
							.then(apiResponse => renderSuccessVue('/', req, res, 'User logged', apiResponse, true))
							.catch(apiError => renderErrorVue('login', req, res, apiError, 'Request failed'));
					}
				}
			})

			/**
			 * 	REGISTER
			 */

			// [BACKOFFICE] Render register vue
			this.router.get('/register', (req, res) => {
				renderSuccessVue('register', req, res, null, 'Request succeed', false)
			})

			// [BACKOFFICE] Get data from client to register user and render index vue
			this.router.post('/register', (req, res) => {
				
				// Check body data
				if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
					return renderErrorVue('index', req, res, 'No data provided', 'Request failed')
				}
				else {

					// Check body data
					const { ok, extra, miss } = checkFields(Mandatory.register, req.body);

					// Error: bad fields provided
					if (!ok) { return renderErrorVue('index', '/register', 'POST', res, 'Bad fields provided', { extra, miss }) }
					else {
						Controllers.auth.register(req)
							.then(apiResponse => renderSuccessVue('/', req, res, 'User registered', apiResponse, true))
							.catch(apiError => renderErrorVue('register', req, res, apiError, 'Request failed'));
					}
				}
			})

			/**
			 * 	GENERAL
			 */

			// [BACKOFFICE] Render index vue
			this.router.get('/', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				renderSuccessVue('index', req, res)
			})

			// [BACKOFFICE] get data from client to create object, protected by Passport MiddleWare
			this.router.post('/:endpoint', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				// Check body data
				if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
					return renderErrorVue(req.headers.referer, req, res, 'No data provided', 'Request failed')
				}
				else {
					// Define isPublished
					if (req.params.endpoint === 'category' || req.params.endpoint === 'tag' || req.params.endpoint === 'tool') {
						if (req.body.isPublished && req.body.isPublished === 'on') {
							req.body.isPublished = true;
						} else {
							req.body.isPublished = false;
						}
					}

					// Check body data
					const { ok, extra, miss } = checkFields(Mandatory[req.params.endpoint], req.body);

					// Error: bad fields provided
					if (!ok) { return renderErrorVue(req.headers.referer, `/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', { extra, miss }) }
					else {
						// Use the controller to create object
						Controllers[req.params.endpoint].createOne(req)
							.then(apiResponse => res.redirect(req.headers.referer, req, res, 'Request succeed', apiResponse, true))
							.catch(apiError => renderErrorVue(req.headers.referer, req, res, apiError, 'Request failed'))
					}
				}
			})

			/**
			 * 	CATEGORIES
			 */

			// [BACKOFFICE] Render categories vue
			this.router.get('/categories', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.category.readAll()
					.then(apiResponse => renderSuccessVue('categories', req, res, apiResponse, 'Request succeed', false))
					.catch(apiError => renderErrorVue('categories', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Render category vue
			this.router.get('/category/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.category.readOne(req.params.id)
					.then(apiResponse => renderSuccessVue('category', req, res, apiResponse, 'Request succeed', false))
					.catch(apiError => renderErrorVue('category', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Render editCategory vue
			this.router.get('/editCategory/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.category.readOne(req.params.id)
					.then(apiResponse => renderSuccessVue('editCategory', req, res, apiResponse, 'Request succeed', false))
					.catch(apiError => renderErrorVue('editCategory', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Update category
			this.router.post('/updateCategory/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				// Check body data
				if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
					return renderErrorVue(req.headers.referer, req, res, 'No data provided', 'Request failed')
				}
				else {
					// Define isPublished
					if (req.body.isPublished && req.body.isPublished === 'on') {
						req.body.isPublished = true;
					} else {
						req.body.isPublished = false;
					}

					// Check body data
					const { ok, extra, miss } = checkFields(Mandatory['category'], req.body);

					// Error: bad fields provided
					if (!ok) { return renderErrorVue(req.headers.referer, `/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', { extra, miss }) }
					else {
						// Use the controller to update object
						Controllers.category.updateOne(req)
							.then(apiResponse => res.redirect(req.headers.referer, req, res, 'Request succeed', apiResponse, true))
							.catch(apiError => renderErrorVue(req.headers.referer, req, res, apiError, 'Request failed', true))
					}
				}
			})

			// [BACKOFFICE] Delete category
			this.router.get('/deleteCategory/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.category.deleteOne(req)
					.then(apiResponse => res.redirect('/categories', req, res, 'Request succeed', apiResponse, true))
					.catch(apiError => renderErrorVue('categories', req, res, apiError, 'Request failed', true))
			})

			/**
			 * 	TAGS
			 */

			// [BACKOFFICE] Render tags vue
			this.router.get('/tags', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tag.readAll()
					.then(apiResponse => {
						// add categories
						Controllers.category.readAll()
							.then(categoryApiResponse => {
								apiResponse.categories = categoryApiResponse;
								renderSuccessVue('tags', req, res, apiResponse, 'Request succeed', false)
							})
							.catch(categoryApiError => renderErrorVue('tags', req, res, categoryApiError, 'Request failed'))
					})
					.catch(apiError => renderErrorVue('tags', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Render tag vue
			this.router.get('/tag/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tag.readOne(req.params.id)
					.then(apiResponse => renderSuccessVue('tag', req, res, apiResponse, 'Request succeed', false))
					.catch(apiError => renderErrorVue('tag', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Render editTag vue
			this.router.get('/editTag/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tag.readOne(req.params.id)
					.then(apiResponse => {
						// add categories
						Controllers.category.readAll()
							.then(categoryApiResponse => {
								apiResponse.categories = categoryApiResponse;
								renderSuccessVue('editTag', req, res, apiResponse, 'Request succeed', false)
							})
							.catch(categoryApiError => renderErrorVue('editTag', req, res, categoryApiError, 'Request failed'))
					})
					.catch(apiError => renderErrorVue('editTag', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Update tag
			this.router.post('/updateTag/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				// Check body data
				if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
					return renderErrorVue(req.headers.referer, req, res, 'No data provided', 'Request failed')
				}
				else {
					// Define isPublished
					if (req.body.isPublished && req.body.isPublished === 'on') {
						req.body.isPublished = true;
					} else {
						req.body.isPublished = false;
					}

					// Check body data
					const { ok, extra, miss } = checkFields(Mandatory['tag'], req.body);

					// Error: bad fields provided
					if (!ok) { return renderErrorVue(req.headers.referer, `/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', { extra, miss }) }
					else {
						// Use the controller to update object
						Controllers.tag.updateOne(req)
							.then(apiResponse => res.redirect(req.headers.referer, req, res, 'Request succeed', apiResponse, true))
							.catch(apiError => renderErrorVue(req.headers.referer, req, res, apiError, 'Request failed', true))
					}
				}
			})

			// [BACKOFFICE] Delete tag
			this.router.get('/deleteTag/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tag.deleteOne(req)
					.then(apiResponse => res.redirect('/tags', req, res, 'Request succeed', apiResponse, true))
					.catch(apiError => renderErrorVue('tags', req, res, apiError, 'Request failed', true))
			})

			/**
			 * 	TOOLS
			 */

			// [BACKOFFICE] Render tools vue
			this.router.get('/tools', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tool.readAll()
					.then(apiResponse => {
						// add categories
						Controllers.category.readAll()
							.then(categoryApiResponse => {
								apiResponse.categories = categoryApiResponse;
								// add tags
								Controllers.tag.readAll()
									.then(tagApiResponse => {
										apiResponse.tags = tagApiResponse;
										renderSuccessVue('tools', req, res, apiResponse, 'Request succeed', false)
									})
									.catch(tagApiError => renderErrorVue('tools', req, res, tagApiError, 'Request failed'))
							})
							.catch(categoryApiError => renderErrorVue('tools', req, res, categoryApiError, 'Request failed'))
					})
					.catch(apiError => renderErrorVue('tools', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Render tool vue
			this.router.get('/tool/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tool.readOne(req.params.id)
					.then(apiResponse => renderSuccessVue('tool', req, res, apiResponse, 'Request succeed', false))
					.catch(apiError => renderErrorVue('tool', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Render editTool vue
			this.router.get('/editTool/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tool.readOne(req.params.id)
					.then(apiResponse => {
						// add categories
						Controllers.category.readAll()
							.then(categoryApiResponse => {
								apiResponse.allCategories = categoryApiResponse;
								// add tags
								Controllers.tag.readAll()
									.then(tagApiResponse => {
										apiResponse.allTags = tagApiResponse;
										renderSuccessVue('editTool', req, res, apiResponse, 'Request succeed', false)
									})
									.catch(tagApiError => renderErrorVue('editTool', req, res, tagApiError, 'Request failed'))
							})
							.catch(categoryApiError => renderErrorVue('editTool', req, res, categoryApiError, 'Request failed'))
					})
					.catch(apiError => renderErrorVue('editTool', req, res, apiError, 'Request failed'))
			})

			// [BACKOFFICE] Update tool
			this.router.post('/updateTool/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				// Check body data
				if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
					return renderErrorVue(req.headers.referer, req, res, 'No data provided', 'Request failed')
				}
				else {
					// Define isPublished
					if (req.body.isPublished && req.body.isPublished === 'on') {
						req.body.isPublished = true;
					} else {
						req.body.isPublished = false;
					}

					// Check body data
					const { ok, extra, miss } = checkFields(Mandatory['tool'], req.body);

					// Error: bad fields provided
					if (!ok) { return renderErrorVue(req.headers.referer, `/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', { extra, miss }) }
					else {
						// Use the controller to update object
						Controllers.tool.updateOne(req)
							.then(apiResponse => res.redirect(req.headers.referer, req, res, 'Request succeed', apiResponse, true))
							.catch(apiError => renderErrorVue(req.headers.referer, req, res, apiError, 'Request failed', true))
					}
				}
			})

			// [BACKOFFICE] Delete tool
			this.router.get('/deleteTool/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
				Controllers.tool.deleteOne(req)
					.then(apiResponse => res.redirect('/tools', req, res, 'Request succeed', apiResponse, true))
					.catch(apiError => renderErrorVue('tools', req, res, apiError, 'Request failed', true))
			})

		}

		init() {
			// Get route fonctions
			this.routes();

			// Sendback router
			return this.router;
		};
	}
//

/*
Export
*/
	module.exports = BackendRouter;
//