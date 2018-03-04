const express = require('express')
const accountCtrl = require('../controllers/accounts')
const transCtrl = require('../controllers/transactions')
const accountRouter = express.Router()
const transRouter = express.Router({mergeParams: true})

accountRouter.use('/:acctId/trans', transRouter);

accountRouter.get('/', accountCtrl.getAll)
accountRouter.get('/:acctId', accountCtrl.getOne)
accountRouter.post('/', accountCtrl.create)
accountRouter.put('/:acctId', accountCtrl.update)
accountRouter.delete('/:acctId', accountCtrl.del)

transRouter.get('/', transCtrl.getAll)
transRouter.get('/:transId', transCtrl.getOne)
transRouter.post('/', transCtrl.create)
transRouter.put('/:transId', transCtrl.update)
transRouter.delete('/:transId', transCtrl.del)

module.exports = accountRouter