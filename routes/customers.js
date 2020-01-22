var express = require('express');
var router = express.Router();
var connection = require('../lib/db');


/* GET home page. */
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM customers ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('customers', {page_title: "Customers - List", data: ''});
        } else {
            res.render('customers', {page_title: "Customers List", data: rows});
        }
    });
});

// SHOW ADD USER FORM
router.get('/add', function (req, res, next) {
    // render to views/user/add.ejs
    res.render('customers/add', {
        title: 'Add New Customers',
        name: '',
        email: ''
    });
});

// ADD NEW USER POST ACTION
router.post('/add', function (req, res, next) {
    req.assert('name', 'Name is required').notEmpty();         //Validate name
    req.assert('email', 'A valid email is required').isEmail();  //Validate email
    req.assert('password', 'Password is required').notEmpty(); 
    req.assert('password', 'Password should be atleast 4 characters').len(4);//lenth
    req.assert('phone_number', 'phone_number is required').notEmpty(); 
    req.assert('address', 'address is required').notEmpty(); 
    var errors = req.validationErrors();

    if (!errors) {   //No errors were found.  Passed Validation!
        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim(),            
            password: req.sanitize('password').escape().trim(),
            phone_number: req.sanitize('phone_number').escape().trim(),
            address: req.sanitize('address').escape().trim(),
            state: req.sanitize('state').escape().trim()
        };

        connection.query('INSERT INTO customers SET ?', user, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err);

                // render to views/user/add.ejs
                res.render('customers/add', {
                    title: 'Add New Customer',
                    name: user.name,
                    email: user.email
                });
            } else {
                req.flash('success', 'Data added successfully!');
                res.redirect('/customers');
            }
        });
    } else {   //Display errors to user
        var error_msg = '';
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>';
        });
        req.flash('error', error_msg);

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('customers/add', {
            title: 'Add New Customer',
            name: req.body.name,
            email: req.body.email
        });
    }
});

// SHOW EDIT USER FORM
router.get('/edit/(:id)', function (req, res, next) {
    connection.query('SELECT * FROM customers WHERE id = ' + req.params.id, function (err, rows, fields) {
        if (err)
            throw err;
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Customers not found with id = ' + req.params.id);
            res.redirect('/customers');
        } else { //if user found
            //render to views/user/edit.ejs template file
            //console.log("Data:",rows[0].name);
            res.render('customers/edit', {
                title: 'Edit Customer',
                data: rows[0] // Assigned all data in single variable
                //id: rows[0].id,
                //name: rows[0].name
            });
        }
    });

});

// EDIT USER POST ACTION
router.post('/update/:id', function (req, res, next) {
    req.assert('name', 'Name is required').notEmpty();           //Validate nam           //Validate age
    req.assert('email', 'A valid email is required').isEmail();  //Validate email
    req.assert('phone_number', 'phone_number is required').notEmpty(); 
    req.assert('address', 'address is required').notEmpty();
    

    var errors = req.validationErrors();

    if (!errors) {

        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            phone_number: req.sanitize('phone_number').escape().trim(),
            address: req.sanitize('address').escape().trim(),
            state: req.sanitize('state').escape().trim()
        };

        connection.query('UPDATE customers SET ? WHERE id = ' + req.params.id, user, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err);

                // render to views/user/add.ejs
                res.render('customers/edit', {
                    title: 'Edit Customer',
                    id: req.params.id,
                    name: req.body.name,
                    email: req.body.email
                });
            } else {
                req.flash('success', 'Data updated successfully!');
                res.redirect('/customers');
            }
        });

    } else {   //Display errors to user
        var error_msg = '';
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>';
        });
        req.flash('error', error_msg);

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('customers/edit', {
            title: 'Edit Customer',
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        });
    }
});

// DELETE USER
router.get('/delete/(:id)', function (req, res, next) {
    var user = {id: req.params.id};

    connection.query('DELETE FROM customers WHERE id = ' + req.params.id, user, function (err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err);
            // redirect to users list page
            res.redirect('/customers');
        } else {
            req.flash('success', 'Customer deleted successfully! id = ' + req.params.id);
            // redirect to users list page
            res.redirect('/customers');
        }
    });
});


module.exports = router;