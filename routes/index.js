var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//    console.log("New Session1 :", req.session.id);
//    console.log("New Session2 :", req.sessionID);
//    req.session.testdata = 'Test session data';
//    console.log("New Session3 :", req.session.testdata);
//    req.session.destroy(function(err) {
//    req.session.testdata;
//    });
//    console.log("Destroy Session4 :", req.session.testdata);
    
    res.render('index', //View name
        { title: 'Express JS Demo App....!',
          login:'Login Page'
        }
    );
});

module.exports = router;
