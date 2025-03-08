// 系统设置模块路由
// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入set的路由处理模块
const setHandler = require('../router_handle/order_in')

//.........................堂食订单
//修改地点
router.post('/changePlace', setHandler.changePlace)

//修改内容
router.post('/changeContent', setHandler.changeContent)

//修改状态
router.post('/changeStatus', setHandler.changeStatus)

//向前端发送信息
router.post('/returnAllOrderInListData', setHandler.returnAllOrderInListData)

//搜索
router.post('/searchOrderIn', setHandler.searchOrderIn)

//删除
router.post('/deleteOrderIn', setHandler.deleteOrderIn)

//添加订单
router.post('/newOrderIn', setHandler.newOrderIn)

//修改订单
router.post('/changeOrderIn', setHandler.changeOrderIn)

//堂食订单数量
router.post('/getOrderInListLength', setHandler.getOrderInListLength)

//得到订单信息
router.post('/getOrderInInfo', setHandler.getOrderInInfo)




// 向外暴露路由
module.exports = router