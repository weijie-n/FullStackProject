import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;

/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for users
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelHealthDeclaration extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelHealthDeclaration.init({
			"uuid"         : { type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
			"dateCreated"  : { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated"  : { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"uuid_employee": { type: DataTypes.STRING(36),  allowNull: false },
			"temp"         : { type: DataTypes.STRING(128), allowNull: false },
			"Q1"           : { type: DataTypes.STRING(64),  allowNull: false },
			"Q2"           : { type: DataTypes.STRING(64),  allowNull: false },
			"Q3"           : { type: DataTypes.BOOLEAN,     allowNull: false, defaultValue: false },
            "Q4"           : { type: DataTypes.BOOLEAN,     allowNull: false, defaultValue: false }
		}, {
			"sequelize": database,
			"modelName": "HealthDeclaration",
			"hooks"    : {
				"afterUpdate": ModelHealthDeclaration._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelHealthDeclaration} instance The entity model to be updated
	 * @param {UpdateOptions}          options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
}