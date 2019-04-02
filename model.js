const mysql = require('mysql');
const isEmpty = require('lodash/isEmpty');

const apiCall = async (data, callback) => {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "pincodes"
    });

    const {
        pincode
    } = data;

    try {
        connection.query(`SELECT * FROM pincodesofindia WHERE pincode=${pincode}`, (err, resultData) => {
            connection.end();
            if (err) {
                callback(err, null);
            } else if (!isEmpty(resultData)) {
                    let cities = [];
                    for (let i = 0; i < resultData.length; i++) {
                        cities.push(resultData[i].city);
                    }
                    const response = {
                        "City": cities,
                        "Taluk": resultData[0].taluk,
                        "District": resultData[0].district,
                        "State": resultData[0].state
                    };
                    callback(null, response);
                }
                else {
                    callback("No data found for given pin code", null);
                } 
            
        });
    } catch (err) {
        callback(err, null);
    }
};

module.exports = {
    apiCall,
};