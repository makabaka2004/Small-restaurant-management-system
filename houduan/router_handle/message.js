const db = require('../db/index.js')


// 发布消息
exports.publishMessage = (req, res) => {
	const {
		message_title,
		message_category,
		message_content,
		message_receipt_object,
		message_level
	} = req.body
	const message_create_time = new Date()
	const sql = 'insert into message set ? '
	db.query(sql, {
		message_title,
		message_category,
		message_create_time,
		message_click_number: 0,
		message_status: 0,
		message_content,
		message_receipt_object,
		message_level
	}, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '发布消息成功',
		})
	})
}

// 获取公司公告列表  5条
exports.companyMessageList = (req, res) => {
	const sql =
		'select * from message where message_category = "公司公告" and message_status = "0" and message_receipt_object= "全体成员" order by message_create_time DESC limit 5'
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}


// 编辑公告
exports.editMessage = (req, res) => {
	const {
		message_title,
		message_content,
		message_receipt_object,
		message_level,
		id
	} = req.body
	const sql = 'update message set ? where id = ?';
	db.query(sql, [
	    {
	        message_title: req.body.message_title,
	        message_content: req.body.message_content,
			message_receipt_object: req.body.message_receipt_object,
			message_level:req.body.message_level
	    },
	    req.body.id // 传入 id
	], (err, result) => {
	    if (err) return console.error('Error during order creation:', err);
	    if (result.affectedRows === 0) {
	        return res.send({
	            status: 1,
	            message: '编辑失败'
	        });
	    }
	    res.send({
	        status: 0,
	        message: '编辑成功'
	    });
	});
}


// 根据接受对象进行获取消息
exports.searchMessageBydepartment = (req, res) => {
	// const sql = 'select * from message where message_receipt_object = ? and message_status = "0"'
	// db.query(sql, req.body.message_receipt_object, (err, result) => {
	// 	if (err) return res.cc(err)
	// 	res.send(result)
	// })
	
	if(req.body.message_receipt_object==''){
		const number = 0
		const sql = `select * from message where message_category='公司公告' and message_status = "0" ORDER BY message_create_time desc  limit 10 offset ${number} `
		db.query(sql,  (err, result) => {
			if (err) return res.cc(err)
			res.send(result)
		})
	}else{
	const sql = `select * from message where message_receipt_object = ? and message_status = "0" and message_category='公司公告' `
	db.query(sql, req.body.message_receipt_object, (err, result) => {
	if (err) return res.cc(err)
		res.send(result)
	})
	}
}

// 根据发布等级进行获取消息
exports.searchMessageByLevel = (req, res) => {
	const sql = 'select * from message where message_level = ? and message_status = "0"'
	db.query(sql, req.body.message_level, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 更新点击率
exports.updateClick = (req, res) => {
	const {
		message_click_number,
		id
	} = req.body
	number = message_click_number * 1 + 1
	const sql = 'update message set message_click_number = ? where id = ?'
	db.query(sql, [number, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '点击率增加'
		})
	})
}

// 初次删除
exports.firstDelete = (req, res) => {
	const message_status = 1
	const message_delete_time = new Date()
	const id1 = req.body.id
	const sql = 'update message set message_status = ? ,message_delete_time = ? where id = ?'
	db.query(sql, [message_status, message_delete_time, id1.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '删除成功'
		})
	})
}


// 获取回收站的列表
exports.recycleList = (req, res) => {
	const sql = 'select * from message where message_status = 1'
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 获取回收站总数
exports.getRecycleMessageLength = (req, res) => {
	const sql = 'select * from message where message_status = 1'
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 回收站监听换页
exports.returnRecycleListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql =
		`select * from message where message_status = 1 ORDER BY message_delete_time limit 10 offset ${number} `
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}


// 还原操作
exports.recover = (req, res) => {
	const message_status = 0
	const message_update_time = new Date()
	const sql = 'update message set message_status = ? ,message_update_time = ? where id = ?'
	db.query(sql, [message_status, message_update_time, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '还原成功'
		})
	})
}


// 删除操作
exports.deleteMessage = (req, res) => {
	const sql = 'delete from message where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '删除消息成功'
		})
	})
}

// 获取公司公告总数
exports.getCompanyMessageLength = (req, res) => {
	const sql = 'select * from message where message_category ="公司公告" and message_status = 0'
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 获取系统消息总数
exports.getSystemMessageLength = (req, res) => {
	const sql = 'select * from message where message_category ="系统消息" and message_status = 0'
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 监听换页返回数据  公司公告列表
// limit 10 为我们要拿到数据 offset 我们跳过多少条数据
exports.returnCompanyListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql =
		`select * from message where message_category ="公司公告" and message_status = 0 ORDER BY message_create_time desc limit 10 offset ${number} `
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 监听换页返回数据  系统消息列表
exports.returnSystemListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql =
		`select * from message where message_category ="系统消息"  and message_status = 0  ORDER BY message_create_time desc limit 10 offset ${number} `
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 监听换页返回数据  个人消息
// limit 10 为我们要拿到数据 offset 我们跳过多少条数据
exports.returnCompanyListDataPersonal = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql =
		`SELECT * 
FROM message 
WHERE message_category = "公司公告" 
AND message_status = 0 
AND (message_receipt_object = '全体成员' OR message_receipt_object = ?) 
ORDER BY message_create_time DESC 
LIMIT 10 
OFFSET ${number};
 `
	db.query(sql, req.body.identity,(err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

//个人消息长度
exports.returnCompanyListDataPersonalLength = (req, res) => {
	const sql =
		`SELECT * 
	FROM message 
	WHERE message_category = "公司公告" 
	AND message_status = 0 
	AND (message_receipt_object = '全体成员' OR message_receipt_object = ?) 
	ORDER BY message_create_time DESC `
	
	db.query(sql, req.body.identity,(err, result) => {
		if (err) return res.cc(err)
		 res.send({
		 	length: result.length
		 })
		// res.send(result)
	})
}

exports.searchCompanyListDataPersonal = (req, res) => {
	
	const sql =
		`SELECT * 
FROM message 
WHERE message_category = "公司公告" 
AND message_status = 0 
AND (message_receipt_object = '全体成员' OR message_receipt_object = ?) 
AND message_level = ?
ORDER BY message_create_time DESC `
	db.query(sql, [req.body.identity,req.body.message_level],(err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}