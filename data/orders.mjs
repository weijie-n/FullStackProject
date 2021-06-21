import ORM from 'sequelize'
import { ModelProduct } from './product.mjs';
const { Sequelize, DataTypes, Model } = ORM;

/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for Orders
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelOrders extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelOrders.init({
			"uuid"         : { type: DataTypes.CHAR(36),   primaryKey: true, defaultValue : DataTypes.UUIDV4 },
			"dateCreated"  : { type: DataTypes.DATE(),     allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated"  : { type: DataTypes.DATE(),     allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateDelivered": { type: DataTypes.DATE(),     allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"uuid_product" : { type: DataTypes.CHAR(36),   allowNull: false },
			"quantity"     : { type: DataTypes.STRING(64), allowNull: false },
			"suppid"       : { type: DataTypes.STRING(64), allowNull: false }
		}, {
			"sequelize": database,
			"modelName": "Orders",
			"hooks"    : {
				"afterUpdate": ModelOrders._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelOrders}   instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
}