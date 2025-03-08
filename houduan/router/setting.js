// 系统设置模块路由
// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入set的路由处理模块
const setHandler = require('../router_handle/setting')


// 上传轮播图
router.post('/uploadSwiper', setHandler.uploadSwiper)
// 获取所有轮播图
router.post('/getAllSwiper', setHandler.getAllSwiper)
// 获取餐馆名称
router.post('/getCompanyName', setHandler.getCompanyName)
// 修改餐馆名称
router.post('/changeCompanyName', setHandler.changeCompanyName)
// 修改餐馆介绍
router.post('/changeCompanyIntroduce', setHandler.changeCompanyIntroduce)
// 获取餐馆介绍
router.post('/getCompanyIntroduce', setHandler.getCompanyIntroduce)
// 获取所有餐馆信息
router.post('/getAllCompanyIntroduce', setHandler.getAllCompanyIntroduce)

// 向外暴露路由
module.exports = router