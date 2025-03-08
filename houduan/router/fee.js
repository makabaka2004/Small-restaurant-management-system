// 系统设置模块路由
// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入set的路由处理模块
const setHandler = require('../router_handle/fee')

//更新人工费
router.post('/updateLaborCost', setHandler.updateLaborCost)

router.post('/getAllFee', setHandler.getAllFee)


router.post('/changeFee', setHandler.changeFee)

router.post('/getFee', setHandler.getFee)


// 向外暴露路由
module.exports = router