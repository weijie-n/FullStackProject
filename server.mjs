/**
 * This example uses Nunjucks template engine for rendering pages
 */

import Express from 'express';
import ExpSession from 'express-session';
import BodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import MethodOverrides from 'method-override';
import Path from 'path';

import Flash           from 'connect-flash';
import FlashMessenger  from 'flash-messenger';

import Nunjucks from 'nunjucks';

const Server = Express();
const Port = process.env.PORT || 3000;

/**
 * Template Engine
 * You may choose to use Nunjucks if you want to recycle everything from your old project.
 * Strongly recommended. However, do note the minor differences in syntax. :)
 * Trust me it saves your time more.
 * https://www.npmjs.com/package/express-nunjucks
 */
Nunjucks.configure('templates', {
	autoescape: true,
	express: Server
})
//	Sets `/public` to be the virtual path to access static files
Server.use("/public", Express.static('public'));



/**
 * Form body parsers etc
 */
Server.use(BodyParser.urlencoded({ extended: false }));
Server.use(BodyParser.json());
Server.use(CookieParser());
Server.use(MethodOverrides('_method'));



/**
 * Express Session
 */
Server.use(ExpSession({
	name: 'example-app',
	secret: 'random-secret',
	resave: false,
	saveUninitialized: false,
	store: SessionStore
}));

//	TODO: Copy from gitlab
//initialize_passport(Passport);
Server.use(Passport.initialize());
Server.use(Passport.session());
initialize_database(false);

/**
 * Flash Messenger (OPTIONAL)
 */
Server.use(Flash());
Server.use(FlashMessenger.middleware);
//-----------------------------------------

Server.use(Flash());
Server.use(FlashMessenger.middleware);
/**
 * TODO: Setup global contexts here. Basically stuff your variables in locals
 */
Server.use(function (req, res, next) {
	res.locals.user = req.user || null;
	next();
});


import Routes from './routes/main.mjs'
Server.use("/", Routes);

/**
 * DEBUG USAGE
 * Use this to check your routes
 * Prints all the routes registered into the application
**/
import { ListRoutes } from './utils/routes.mjs'
import { initialize_database, SessionStore } from './data/database.mjs';
console.log(`=====Registered Routes=====`);
ListRoutes(Server._router).forEach(route => {
	console.log(`${route.method.padStart(8)} | /${route.path}`);
});
console.log(`===========================`);

/**
 * Start the server in infinite loop
 */
Server.listen(Port, function () {
	console.log(`Server listening at port ${Port}`);
});