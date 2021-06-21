import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;

/**
 * For enumeration use
**/
export class UserRole {
	static get Admin() { return "admin"; }
	static get User()  { return "user";  }
}

/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for users
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelUser extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelUser.init({
			"uuid"       : { type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
			"dateCreated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"name"       : { type: DataTypes.STRING(64),  allowNull: false },
			"email"      : { type: DataTypes.STRING(128), allowNull: false },
			"password"   : { type: DataTypes.STRING(64),  allowNull: false },
			"role"       : { type: DataTypes.ENUM(UserRole.User, UserRole.Admin), defaultValue: UserRole.User, allowNull: false },
			"verified"   : { type: DataTypes.BOOLEAN,     allowNull: false, defaultValue: false }
		}, {
			"sequelize": database,
			"modelName": "Users",
			"hooks"    : {
				"afterUpdate": ModelUser._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelUser}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}

	/** The role of the user */
	get role()  { return String(this.getDataValue("role")); }
	/** The universally unique identifier of the user */
	get uuid()  { return String(this.getDataValue("uuid")); }
	/** The email of the user */
	get email() { return String(this.getDataValue("email")); }
	/** The name of the user */
	get name()  { return String(this.getDataValue("name")); }
	/** The date this user is created in database */
	get dateCreated() { return new Date(this.getDataValue("dateCreated")); }
	/** The date this user is updated in database */
	get dateUpdated() { return new Date(this.getDataValue("dateUpdated")); }
	/** Whether this user instance is verified */
	get isVerified()  { return Boolean(this.getDataValue("verified")); }


	set uuid(uuid)     { this.setDataValue("uuid", uuid); }
	set email(email)   { this.setDataValue("email", email); }
	set name(name)     { this.setDataValue("name", name); }
}