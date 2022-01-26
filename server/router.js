const router = require('express').Router();
const controller = require('./controller.js');

router.route('/question')
  .get(controller.getAll)
  .post(controller.addQuestion)

router.route('/question/:type')
  .get(controller.getAllByType)

module.exports = router;