import Hash   from 'hash.js'
import ORM    from 'sequelize';
const { Sequelize } = ORM;

import { ModelUser, UserRole } from './user.mjs';
import { ModelFeedback} from './feedback.mjs'
import { ModelCart }    from './cart.mjs';
import { ModelProduct } from './product.mjs';
import { ModelOrders }  from './orders.mjs';

/**
 * @param database {ORM.Sequelize}
 */
export function initialize_models(database) {
	try {
		console.log("Initializing ORM models");
		//	Initialize models
		ModelUser    .initialize(database);
		ModelProduct .initialize(database);
		ModelFeedback.initialize(database);
		ModelCart    .initialize(database);
		ModelOrders  .initialize(database);

		console.log("Building ORM model relations and indices");
		//	Create relations between models or tables
		//	Setup foreign keys, indexes etc

		//	Deleting a user or product will delete the cart pair
		ModelProduct.belongsToMany(ModelUser, { foreignKey: "uuid_product", through: ModelCart });
		ModelUser.belongsToMany(ModelProduct, { foreignKey: "uuid_user",    through: ModelCart });
		
		//	Deleting a Product will delete the order
		ModelProduct.hasMany(ModelOrders,     { foreignKey: "uuid_product" });

		console.log("Adding initialization hooks");
		//	Run once hooks during initialization
		database.addHook("afterBulkSync", generate_root_account.name,  generate_root_account.bind(this, database));
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
			role    : UserRole.Admin,
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