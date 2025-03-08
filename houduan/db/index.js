//导入mysql数据库
const mysql = require('mysql')
//创建与数据库的连接
const db = mysql.createPool({
	host:'localhost',
	user:'liu',
	password:'123456',
	database:'back_system'
})
//对外暴露数据库
module.exports = db