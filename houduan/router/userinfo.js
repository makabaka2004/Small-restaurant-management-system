//导入express框架
const express = require('express')
//使用express框架的路由
const router = express.Router()
//导入exprejoi
const expressJoi = require('@escook/express-joi')

//导入userinfo的路由处理模块
const userinfoHandler = require('../router_handle/userinfo')

//导入验证规则
const{
	name_limit,
	password_limit,
	email_limit,
	forgetPassword_limit
} = require('../limit/user.js')

//上传头像
router.post('/uploadAvatar',userinfoHandler.uploadAvatar)

//绑定账号
router.post('/bindAccount',userinfoHandler.bindAccount)

//修改密码
router.post('/changePassword',expressJoi(password_limit),userinfoHandler.changePassword)

//获取用户信息
router.post('/getUserInfo',userinfoHandler.getUserInfo)

//修改姓名
router.post('/changeName',expressJoi(name_limit),userinfoHandler.changeName)

//修改姓名
router.post('/changeSalary',userinfoHandler.changeSalary)

//修改邮箱
router.post('/changeEmail',expressJoi(email_limit),userinfoHandler.changeEmail)

//修改性别
router.post('/changeSex',userinfoHandler.changeSex)

//验证账号和邮箱
router.post('/verifyAccountAndEmail',userinfoHandler.verifyAccountAndEmail)

//登录页面修改密码
router.post('/changePasswordInLogin',expressJoi(forgetPassword_limit),userinfoHandler.changePasswordInLogin)

//搜索用户
router.post('/searchUser',userinfoHandler.searchUser)

//获取所有用户
router.post('/getAllUser',userinfoHandler.getAllUser)

//根据身份查询用户
router.post('/getIdentityListN',userinfoHandler.getIdentityListN)


router.post('/getIdentity',userinfoHandler.getIdentity)





//用户管理------------

//设置身份
router.post('/changeIdentity',userinfoHandler.changeIdentity)

//获取该身份列表
router.post('/getIdentityList',userinfoHandler.getIdentityList)

//根据账号获取信息
router.post('/getIdentityInfo',userinfoHandler.getIdentityInfo)

//设置成非主要员工
router.post('/changeIdentityToUser',userinfoHandler.changeIdentityToUser)

//设置成主要员工
router.post('/changeIdentityTo',userinfoHandler.changeIdentityTo)

//删除员工
router.post('/deleteUser',userinfoHandler.deleteUser)

//获取对应身份的一个总人数 identity
router.post('/getIdentityListLength',userinfoHandler.getIdentityListLength)

//获取总人数
router.post('/getAllUserListLength',userinfoHandler.getAllUserListLength)

//监听换页返回数据
router.post('/returnListData',userinfoHandler.returnListData)

//监听换页返回数据
router.post('/returnAllUserListData',userinfoHandler.returnAllUserListData)

//向外暴露路由
module.exports = router