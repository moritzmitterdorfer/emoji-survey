/**
 * src/database.js
 * @authors Biswas, Maitz, Miterdorfer
 * @version 0.0.1
 * @date 04/2020
 * @description database connection (Google Firebase)
 */


 /**
  * Class for performing operations on the Firebase DB
  */
 class FirebaseRealTime {

    /**
     * Constructor function
     */
    constructor() {
        /** use NPM module */
        const admin = require('firebase-admin');
        /** retrieve credentails from json file */
        const serviceAccount = require('./credentials/adminSDK.json');
        /** initialize the app */
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://emojis-27792.firebaseio.com'
        });
        
        /** create the database */
        const db = admin.database();
        this.ref = db.ref('restricted_access/secret_document');
    }

    /**
     * @description this function inserts data into the database
     * @param {String} table the root node that we want to access (e.g. 'users')
     * @param {String} id the id (i.e. primary key) of the object we want to store
     * @param {JSON} json the json data of the users
     */
    insertData(table, id, json) {
        let idRef = this.ref.child(table).child(id);
        idRef.set(json);
    }

    /**
     * @description this function returns all data of a specified root node (e.g. 'users')
     * @param {String} table the root node 
     * @returns a promise that contains the data when resolved
     */
    async getData(table) {
        return await this.ref.child(table).once('value').then(data => data.val());
    }

}

module.exports = { FirebaseRealTime }