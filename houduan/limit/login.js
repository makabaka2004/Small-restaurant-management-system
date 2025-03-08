const joi = require('joi')

//对帐号的验证
//alphanum的值为a-z，A-Z，0-9，min是最小长度，max是最大长度，required是必填项，pattern是正则
const account = joi.string().alphanum().min(6).max(12).required()
//密码验证
const password = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()


exports.login_limit = {
	//对body里的数据进行验证
	body:{
		account,
		password
	}
}