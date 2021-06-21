import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;

/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for Carts
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelCart extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelCart.init({
			"uuid_user"   : { type: DataTypes.CHAR(36),    primaryKey: true },
			"uuid_product": { type: DataTypes.CHAR(36),    primaryKey: true },
			"dateCreated" : { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated" : { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"quantity"    : { type:DataTypes.INTEGER,      allowNull: false, defaultValue: 1},
		}, {
			"sequelize": database,
			"modelName": "Carts",
			"hooks"    : {
				"afterUpdate": ModelCart._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelCart}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}

	get quantity() { return Number(this.getDataValue("quantity")); }
	set quantity(value) { this.setDataValue("quantity", value); }
	add() { this.quantity += 1; }
	del() { this.quantity -= 0; }
}