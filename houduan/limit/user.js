const joi = require('joi')

const id = joi.required()
const name = joi.string().pattern(/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/).required()
const oldPassword = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
const newPassword = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
const email = joi.string().pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).required()

exports.name_limit = {
	//对body里的数据进行验证
	body:{
		id,
		name
	}
}

exports.password_limit = {
	//对body里的数据进行验证
	body:{
		id,
		oldPassword,
		newPassword
	}
}

exports.email_limit = {
	//对body里的数据进行验证
	body:{
		id,
		email
	}
}

exports.forgetPassword_limit = {
	//对body里的数据进行验证
	body:{
		id,
		newPassword
	}
}