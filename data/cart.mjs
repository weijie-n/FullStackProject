import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;

/**
 * For enumeration use
**/
// export class UserRole {
// 	static get Admin() { return "admin"; }
// 	static get User()  { return "user";  }
// }

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
			"uuid_product"       : { type: DataTypes.CHAR(36),    primaryKey: true, allowNull: false },
			"uuid_user":    { type: DataTypes.CHAR(36), primaryKey: true, allowNull: false  },
            "quantity"   : { type:DataTypes.INTEGER,     allowNull: false, defaultValue: 1},
		}, {
			"sequelize": database,
			"modelName": "Cart",
			"hooks"    : {
				"afterUpdate":     ModelCart._auto_update_timestamp,
				"afterUpdate":     ModelCart.remove_if_zero,
				"afterBulkUpdate": ModelCart.remove_if_zero_bulk,

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
	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply deletes the pair if qty is zero
	 * @private
	 * @param {ModelCart}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static remove_if_zero(instance, options) {
		if (instance.qty == 0)
			instance.destroy();
	}
	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply deletes all pairs if qty is zero
	 * @private
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static async remove_if_zero_bulk(options) {
		await ModelCart.destroy({where: {qty: 0}});
	}

	/** The universally unique identifier of the user */
	get uuid_product() { return String(this.getDataValue("uuid_product")); }
	get uuid_user()    { return String(this.getDataValue("uuid_user")); }
	get qty() { return Number(this.getDataValue("qty")); }

	set uuid_product(uuid) { this.setDataValue("uuid_product", uuid); }
	set uuid_user(uuid)    { this.setDataValue("uuid_user", uuid); }
	set qty(value) { this.setDataValue("qty", value); }


	
}