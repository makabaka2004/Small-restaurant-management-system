// 系统设置模块路由
// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入set的路由处理模块
const setHandler = require('../router_handle/order_out')

//.........................堂食订单
//修改地点
//router.post('/changePlace', setHandler.changePlace)

//修改内容
//router.post('/changeContent', setHandler.changeContent)

//修改状态
router.post('/changeStatusOut', setHandler.changeStatusOut)

//向前端发送信息
router.post('/returnAllOrderOutListData', setHandler.returnAllOrderOutListData)

//搜索
router.post('/searchOrderOut', setHandler.searchOrderOut)

//删除
router.post('/deleteOrderOut', setHandler.deleteOrderOut)

//添加订单
router.post('/newOrderOut', setHandler.newOrderOut)

//修改订单
router.post('/changeOrderOut', setHandler.changeOrderOut)

//堂食订单数量
router.post('/getOrderOutListLength', setHandler.getOrderOutListLength)

//得到订单信息
router.post('/getOrderOutInfo', setHandler.getOrderOutInfo)




// 向外暴露路由
module.exports = router