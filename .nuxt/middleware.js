const middleware = {}

middleware['admin'] = require('..\\frontend\\middleware\\admin.js')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['auth'] = require('..\\frontend\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['check-auth'] = require('..\\frontend\\middleware\\check-auth.js')
middleware['check-auth'] = middleware['check-auth'].default || middleware['check-auth']

middleware['client'] = require('..\\frontend\\middleware\\client.js')
middleware['client'] = middleware['client'].default || middleware['client']

middleware['guest'] = require('..\\frontend\\middleware\\guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

export default middleware
