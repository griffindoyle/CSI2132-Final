var express = require('express');
var router = express.Router();

router.use('api/example', require('./example'));

module.exports = router;