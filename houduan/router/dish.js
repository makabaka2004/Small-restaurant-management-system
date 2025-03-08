// 系统设置模块路由
// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入set的路由处理模块
const setHandler = require('../router_handle/dish')


// 改变菜品名字
router.post('/changeName', setHandler.changeName)

router.post('/changePrice', setHandler.changePrice)

router.post('/changeDescribe', setHandler.changeDescribe)

router.post('/getDishInfo', setHandler.getDishInfo)

router.post('/getAllDishInfo', setHandler.getAllDishInfo)

router.post('/returnAllDishListData', setHandler.returnAllDishListData)

router.post('/getDishListLength', setHandler.getDishListLength)

router.post('/searchDish', setHandler.searchDish)

router.post('/deleteDish', setHandler.deleteDish)

router.post('/newDish', setHandler.newDish)

router.post('/changeDish', setHandler.changeDish)



// 向外暴露路由
module.exports = router