/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tejora123',
    database: 'demodb'
});
connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        //console.log('Database Connection Success!:)');
    }
});
module.exports = connection;

