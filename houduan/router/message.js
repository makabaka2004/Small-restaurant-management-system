// 系统设置模块路由
// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入set的路由处理模块
const messageHandler = require('../router_handle/message')


//创建消息
router.post('/publishMessage', messageHandler.publishMessage)

router.post('/companyMessageList', messageHandler.companyMessageList)

router.post('/editMessage', messageHandler.editMessage)

router.post('/searchMessageBydepartment', messageHandler.searchMessageBydepartment)

router.post('/searchMessageByLevel', messageHandler.searchMessageByLevel)

router.post('/updateClick', messageHandler.updateClick)

router.post('/firstDelete', messageHandler.firstDelete)

router.post('/recycleList', messageHandler.recycleList)

router.post('/getRecycleMessageLength', messageHandler.getRecycleMessageLength)

router.post('/returnRecycleListData', messageHandler.returnRecycleListData)

router.post('/recover', messageHandler.recover)

router.post('/deleteMessage', messageHandler.deleteMessage)

router.post('/getCompanyMessageLength', messageHandler.getCompanyMessageLength)

router.post('/getSystemMessageLength', messageHandler.getSystemMessageLength)

router.post('/returnCompanyListData', messageHandler.returnCompanyListData)

router.post('/returnSystemListData', messageHandler.returnSystemListData)

router.post('/returnCompanyListDataPersonal', messageHandler.returnCompanyListDataPersonal)

router.post('/returnCompanyListDataPersonalLength', messageHandler.returnCompanyListDataPersonalLength)

router.post('/searchCompanyListDataPersonal', messageHandler.searchCompanyListDataPersonal)



// 向外暴露路由
module.exports = router