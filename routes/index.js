var express = require('express');
var router = express.Router();
var userControl = require('../controller/user');

const app_name = process.env.APP_NAME

/* GET home page. */
router.get('/', (req, res, next) => {
    let user = req.user
    // console.log(req.user);
    if (user && user.permissions.admin) {
        res.redirect('/admin/')
    } else {
        res.render('index', {
            title: app_name,
            user
        });
    }
});

router.get('/contact', (req, res, next) => {
    let user = req.user;
    res.render('pages/contact', {
        title: `Test Page | ${app_name}`,
        user
    });
});

router.post('/contact', (req, res, next) => {
    let user = req.user;
    if (user) {
        req.body.user = user.id;
    } else {
        req.body.user = null;
    }
    console.log(req.body)
    userControl.contact.message(req.body)
    .then((response) => {
        res.send(
            {
                response: "acknowledged",
                status: true
            }
        );
    })
    .catch((error) => {
        res.send(
            {
                error,
                status: false
            }
        );
    })
});

router.get('/test', (req, res, next) => {
    let user = req.user;
    res.render('test', {
        title: `Test Page | ${app_name}`,
        user
    });
});

router.post('/test', (req, res, next) => {
    let user = req.user;
    // console.log(req.body)
    res.send(
        {
            response: "acknowledged",
            status: true
        }
    );
});

module.exports = router;
