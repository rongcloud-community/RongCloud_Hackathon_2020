var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/home.html', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/about.html', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/gallery.html', function(req, res, next) {
  res.render('gallery', { title: 'Express' });
});

router.get('/blog.html', function(req, res, next) {
  res.render('blog', { title: 'Express' });
});

router.get('/contact.html', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/gallery-single.html', function(req, res, next) {
  res.render('gallery-single', { title: 'Express' });
});


module.exports = router;
