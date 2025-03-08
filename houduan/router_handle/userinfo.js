const db = require('../db/index.js')
//导入加密中间件
const bcrypt = require('bcryptjs')
// 导入node.js的crypto库生成uuid
const crypto = require('crypto')
// 导入fs处理文件
fs = require('fs')

// 上传头像
exports.uploadAvatar = (req, res) => {
	// 生成唯一标识
	const { account } = req.body;
	const onlyId = crypto.randomUUID()
	let oldName = req.files[0].filename;
	let originalName = req.files[0].originalname;
	// 提取文件的扩展名
	let fileExtension = originalName.split('.').pop(); // 获取文件扩展名
	let randomNum = Math.floor(Math.random() * 1000000);
	// 使用 account 作为新文件名，加上原文件的扩展名
	let newName = `${account}_${randomNum}.${fileExtension}`;

	//let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
	fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
	const sql = 'insert into image set ?'
	db.query(sql, {
		image_url: `http://127.0.0.1:3007/upload/${newName}`,
		onlyId
	}, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			onlyId,
			status: 0,
			url: 'http://127.0.0.1:3007/upload/' + newName
		})
	})
}

// 绑定账号 onlyid account url
exports.bindAccount = (req, res) => {
	const {
		account,
		onlyId,
		url
	} = req.body
	const sql = 'update image set account = ? where onlyId = ?'
	db.query(sql, [account, onlyId], (err, result) => {
		if (err) return res.cc(err)
		if (result.affectedRows == 1) {
			const sql1 = 'update users set imageUrl = ? where account = ?'
			db.query(sql1, [url, account], (err, result) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: '修改成功'
				})
			})
		}
	})
}

// 修改用户密码 先输入旧密码 oldPassword 新密码 newPassword id 
exports.changePassword = (req, res) => {
	const sql = 'select password from users where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		// bcrypt
		const compareResult = bcrypt.compareSync(req.body.oldPassword, result[0].password)
		if (!compareResult) {
			return res.send({
				status: 1,
				message: '原密码错误'
			})
		}
		req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10)
		const sql1 = 'update users set password = ? where id = ?'
		db.query(sql1, [req.body.newPassword, req.body.id], (err, result) => {
			if (err) return res.cc(err)
			res.send({
				status: 0,
				message: '修改成功'
			})
		})
	})
}

// 获取用户信息 接收参数 id
exports.getUserInfo = (req, res) => {
	const sql = 'select * from users where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		result[0].password = ''
		res.send(result[0])
	})
}

// 修改姓名 接收参数 id name
exports.changeName = (req, res) => {
	const {
		id,
		name
	} = req.body
	const sql = 'update users set name = ? where id = ?'
	db.query(sql, [name, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 修改工资 接收参数 id newSalary
exports.changeSalary = (req, res) => {
	const {
		id,
		newSalary
	} = req.body
	const sql = 'update users set salary = ? where id = ?'
	db.query(sql, [newSalary, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 修改性别 接收参数 id sex
exports.changeSex = (req, res) => {
	const {
		id,
		sex
	} = req.body
	const sql = 'update users set sex = ? where id = ?'
	db.query(sql, [sex, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 修改邮箱 接收参数 id email
exports.changeEmail = (req, res) => {
	const {
		id,
		email
	} = req.body
	const sql = 'update users set email = ? where id = ?'
	db.query(sql, [email, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 验证账户和与邮箱是否一致 email account
exports.verifyAccountAndEmail = (req, res) => {
	const {
		account,
		email
	} = req.body
	const sql = 'select * from users where account = ?'
	db.query(sql, account, (err, result) => {
		if (err) return res.cc(err)
		 //res.send(result[0].email)
		if (email == result[0].email) {
			res.send({
				status: 0,
				message: '查询成功',
				id: result[0].id
			})
		} else {
			res.send({
				status: 1,
				message: '查询失败'
			})
		}
	})
}

// 登录页面修改密码 参数 newPassword id
exports.changePasswordInLogin = (req, res) => {
	const user = req.body
	user.newPassword = bcrypt.hashSync(user.newPassword, 10)
	const sql = 'update users set password = ? where id = ?'
	db.query(sql, [user.newPassword, user.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '更新成功'
		})
	})
}




//用户管理---------------

//改变用户身份
exports.changeIdentity = (req, res) => {
	const {
		account,
		identity
	} = req.body
	// 判断账号是否存在与数据库中
	const sql = 'select * from users where account = ?'
	db.query(sql, account, (err, results) => {
		// 判断账号是否存在
		if (results.length > 0) {
			const sql1 = 'update users set identity = ? where account = ?'
			db.query(sql1, [identity, account], (err, result) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: '设置成功'
				})
			})
		}else{
			return res.send({
				status: 1,
				message: '账号不存在'
			})
		}
	})
}

//获取该身份列表  identity
exports.getIdentityList = (req, res) => {
	const sql = 'select * from users where identity = ?'
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		result.forEach((e) => {
			e.password = ''
			e.image_url = ''
			e.status = ''
		})
		res.send(result)
	})
}

//根据账号获取信息
// 获取用户信息 接收参数 account
exports.getIdentityInfo = (req, res) => {
	const {
		account,
	} = req.body
	// 判断账号是否存在与数据库中
	const sql = 'select * from users where account = ?'
	db.query(sql, account, (err, results) => {
		// 判断账号是否存在
		if (results.length > 0) {
			const sql1 = 'select * from users where account = ?'
			db.query(sql1, req.body.account, (err, result) => {
				if (err) return res.cc(err)
				result[0].password = ''
				res.send(result[0])
			})
		}else{
			return res.send({
				status: 1,
				message: '账号不存在'
			})
		}
	})
}

//取消identity,身份修改为空   id
exports.changeIdentityToUser = (req, res) => {
	const identity = ''
	const sql = 'update users set identity = ? where id = ?'
	db.query(sql, [identity, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '撤职成功'
		})
	})
}

// 对用户进行赋权 参数 id identity
exports.changeIdentityTo = (req, res) => {
	const sql = 'update users set identity = ? where id = ?'
	db.query(sql, [req.body.identity, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '设置成功'
		})
	})
}

// 删除用户 id
exports.deleteUser = (req, res) => {
    // 先通过 id 查询对应的 account
    const sql = 'SELECT account FROM users WHERE id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
		//console.log(results)
        if (results.length === 0) return res.cc('用户不存在')
        
        // 取出查询到的 account
        const account = results[0].account
        
        // 删除 users 表中的用户
        const sqlDeleteUser = 'DELETE FROM users WHERE id = ?'
        db.query(sqlDeleteUser, req.body.id, (err, result) => {
            if (err) return res.cc(err)
            
            // 删除 image 表中对应的记录
            const sqlDeleteImage = 'DELETE FROM image WHERE account = ?'
            db.query(sqlDeleteImage, account, (err, result) => {
                if (err) return res.cc(err)
                res.send({
                    status: 0,
                    message: '删除用户成功'
                })
            })
        })
    })
}


// 通过账号对用户搜索 account identity
exports.searchUser = (req, res) => {
	const {account,identity} = req.body
	if(account==''){
		const sql = 'select * from users where identity = ?'
		db.query(sql, [identity], (err, result) => {
			if (err) return res.cc(err)
			result.forEach((e) => {
				e.password = ''
				e.image_url = ''
				e.status = ''
			})
			res.send(result)
		})
	}else{
	const sql = 'select * from users where account = ? and identity = ?'
	db.query(sql, [account,identity], (err, result) => {
		if (err) return res.cc(err)
		result.forEach((e) => {
			e.password = ''
			e.image_url = ''
			e.status = ''
		})
		res.send(result)
	})
	}
}

//获取所有用户列表  
exports.getAllUser = (req, res) => {
	const sql = 'select * from users '
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		result.forEach((e) => {
			e.password = ''
			e.image_url = ''
			e.status = ''
		})
		res.send(result)
	})
}

//获取该身份列表  identity
exports.getIdentityListN = (req, res) => {
	if(req.body.identity==''){
		const sql = 'select * from users '
		db.query(sql, (err, result) => {
			if (err) return res.cc(err)
			result.forEach((e) => {
				e.password = ''
				e.image_url = ''
				e.status = ''
			})
			res.send(result)
		})
	}else{
		const sql = 'select * from users where identity = ?'
		db.query(sql, req.body.identity, (err, result) => {
			if (err) return res.cc(err)
			result.forEach((e) => {
				e.password = ''
				e.image_url = ''
				e.status = ''
			})
			res.send(result)
		})
	}
}

// 获取对应身份的一个总人数 identity
exports.getIdentityListLength = (req, res) => {
	const sql = 'select * from users where identity = ? '
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 获取对应身份的一个总人数 identity
exports.getAllUserListLength = (req, res) => {
	const sql = 'select * from users '
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 监听换页返回数据 页码 pager identity
// limit 10 为我们要拿到数据 offset 我们跳过多少条数据
exports.returnListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from users where identity = ? ORDER BY create_time limit 10 offset ${number} `
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}


exports.returnAllUserListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from users ORDER BY create_time limit 10 offset ${number} `
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}


//获取身份
exports.getIdentity = (req, res) => {
	const sql = 'select identity from users where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send(result[0].identity)
	})
}