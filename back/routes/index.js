const Router = require('express')
const router = new Router()
const applicationRouter = require('./applicationRouter')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const companyRouter = require('./companyRouter')

router.use('/application', applicationRouter)
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/company', companyRouter)



module.exports = router
