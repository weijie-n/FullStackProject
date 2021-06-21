
// model (1)
import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;


/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for products
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelProduct extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelProduct.init({
			"uuid"       : { type: DataTypes.CHAR(36),     primaryKey: true, defaultValue: DataTypes.UUIDV4 },
			"dateCreated": { type: DataTypes.DATE(),       allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated": { type: DataTypes.DATE(),       allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"name"       : { type: DataTypes.STRING(64),   allowNull: false },
			"price"      : { type: DataTypes.INTEGER,      allowNull: false },
			"quantity"   : { type: DataTypes.INTEGER,      allowNull: false },
			"remarks"    : { type: DataTypes.STRING(1024), defaultValue: "", allowNull: false },
			"resImgUrl"  : { type: DataTypes.STRING(1024),  allowNull: false, defaultValue: "/public/img/null.png" }
		}, {
			"sequelize": database,
			"modelName": "Products",
			"hooks"    : {
				"afterUpdate": ModelProduct._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelProduct}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
}
