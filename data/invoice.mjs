import ORM from 'sequelize'
import { ModelUser } from './user.mjs';
const { Sequelize, DataTypes, Model } = ORM;

/**
 * For enumeration use
**/
export class UserRole {
    static get Admin() { return "admin"; }
    static get User() { return "user"; }
}

/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for users
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelInvoice extends Model {
    /**
     * Initializer of the model
     * @see Model.init
     * @access public
     * @param {Sequelize} database The configured Sequelize handle
    **/
    static initialize(database) {
        ModelInvoice.init({
            "uuid": { type: DataTypes.CHAR(36), primaryKey: true, defaultValue: DataTypes.UUIDV4 }, // For unique Invoice No.
            // From 
            "company": { type: DataTypes.STRING(64), allowNull: false },
            "address": { type: DataTypes.STRING(64), allowNull: false },
            "dateCreated": { type: DataTypes.DATE(), allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            "dueDate": { type: DataTypes.DATE(), allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            // To
            "customer": { type: DataTypes.STRING(64), allowNull: false },
            "custAddress": { type: DataTypes.STRING(64), allowNull: false },

            "remark": { type: DataTypes.STRING(64), allowNull: true },
            "verified": { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
        }, {
            "sequelize": database,
            "modelName": "Invoices",
            "hooks": {
                "afterUpdate": ModelInvoice._auto_update_timestamp
            }
        });
    }

    /**
     * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
     * This function simply assist to update the 'dateUpdated' timestamp.
     * @private
     * @param {ModelInvoice}     instance The entity model to be updated
     * @param {UpdateOptions} options  Additional options of update propagated from the initial call
    **/
    static _auto_update_timestamp(instance, options) {
        // @ts-ignore
        instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
    }

    get uuid() { return String(this.getDataValue("uuid")); }
    set uuid(value) { this.setDataValue("uuid", value); }

    get dateCreated() { return new Date(this.getDataValue("dateCreated")); }


    // update_profile_picture(new_password) {
    // 	//	TODO: Delete the old one
    // 	//	Set the column to new
    // }
}