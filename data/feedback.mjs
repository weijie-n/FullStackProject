import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;

/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for Feedback
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelFeedback extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelFeedback.init({
			"uuid"       : { type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
			"dateCreated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"rate"       : { type: DataTypes.STRING(255),  allowNull: false },
			"satisfied"      : { type: DataTypes.STRING(255), allowNull: false },
            "timeliness"     : { type: DataTypes.STRING(255),     allowNull: false },
            "support"   : { type: DataTypes.STRING(255), allowNull: false },
			"recommend"   : { type: DataTypes.STRING(255), allowNull: false },
			"comments"   : { type: DataTypes.STRING(255), allowNull: true },
            "email"   : { type: DataTypes.STRING(255), allowNull: true }
		}, {
			"sequelize": database,
			"modelName": "Feedbacks",
			"hooks"    : {
				"afterUpdate": ModelFeedback._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelFeedback}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
}