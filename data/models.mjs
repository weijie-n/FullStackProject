import Hash   from 'hash.js'
import ORM    from 'sequelize';
const { Sequelize } = ORM;

import { ModelUser } from './user.mjs';
import { ModelFeedback} from './feedback.mjs'
import { ModelCart } from './cart.mjs';
import { ModelProduct } from './product.mjs';
import { ModelOrders } from './orders.mjs';

/**
 * @param database {ORM.Sequelize}
 */
export function initialize_models(database) {
	try {
		console.log("Intitializing ORM models");
		//	Initialzie models
		ModelUser.initialize(database);
		ModelFeedback.initialize(database);
		ModelCart.initialize(database);
		ModelProduct.initialize(database);
		ModelOrders.initialize(database);

		console.log("Building ORM model relations and indices");
		//	Create relations between models or tables
		//	Setup foreign keys, indexes etc

		//	Check foregin key in your database after writing all these stuff
		//ModelUser   .belongsToMany(ModelProduct, { through: ModelCart, foreignKey: "uuid_user" });
		ModelProduct.belongsToMany(ModelUser,    { through: ModelCart, foreignKey: "uuid_product" });

		console.log("Adding intitialization hooks");
		//	Run once hooks during initialization
		database.addHook("afterBulkSync", generate_root_account.name,  generate_root_account.bind(this, database));
		//database.addHook("afterBulkSync", generate_dummy_accounts.name,  generate_dummy_accounts.bind(this, database));
		database.addHook("afterBulkSync", generate_dummy_product.name,  generate_dummy_product.bind(this, database));

	}

	catch (error) {
		console.error ("Failed to configure ORM models");
		console.error (error);
	}
}

/**
 * This function creates a root account 
 * @param {Sequelize} database Database ORM handle
 * @param {SyncOptions} options Synchronization options, not used
 */
async function generate_root_account(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_root_account.name);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generating root administrator account");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			name    : "root",
			email   : "root@mail.com",
			role    : "admin",
			verified: true,
			password: Hash.sha256().update("P@ssw0rd").digest("hex")
		};
		//	Find for existing account with the same id, create or update
		var account = await ModelUser.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): ModelUser.create(root_parameters));
		console.log("== Generated root account ==");
		console.log(account.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate root administrator user account");
		console.error (error);
		return Promise.reject(error);
	}
}
async function generate_dummy_product(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_dummy_product.name);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generating Dummy Product");
		const root_parameters = {	
			uuid        : "00000000-0000-0000-0000-000000000001",
			name        : "Testing Product",
			price       : 2,
			quantity    : 1,
			remarks     : 'Testing',
			resImgUrl   : 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/154660.jpg?output-format=auto&output-quality=auto'
		};
		//	Find for existing CART with the same id, create or update
		var product = await ModelProduct.findOne({where: { "uuid": root_parameters.uuid }});
		
		product = await ((product) ? product.update(root_parameters): ModelProduct.create(root_parameters));
		console.log("== Generated Dummy Product ==");
		console.log(product.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate dummy product");
		console.error (error);
		return Promise.reject(error);
	}
}