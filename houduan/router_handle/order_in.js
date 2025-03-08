const db = require('../db/index.js')

// 修改地点 接收参数 id place
exports.changePlace = (req, res) => {
	const {
		id,
		place
	} = req.body
	const sql = 'update order_in set place = ? where id = ?'
	db.query(sql, [place, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 修改内容 接收参数 id content
exports.changeContent = (req, res) => {
	const {
		id,
		content
	} = req.body
	const sql = 'update order_in set content = ? where id = ?'
	db.query(sql, [content, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 修改状态 接收参数 id status
exports.changeStatus = (req, res) => {
	const {
		id,
		status
	} = req.body
	const sql = 'update order_in set status = ? where id = ?'
	db.query(sql, [status, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}


// 获取所有堂食订单列表信息 
exports.returnAllOrderInListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from order_in ORDER BY time desc limit 10 offset ${number} `
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 通过地点对订单搜索 place
exports.searchOrderIn = (req, res) => {
	const {place} = req.body
	if(place==''){
		const number = 0
		const sql = `select * from order_in ORDER BY time desc limit 10 offset ${number} `
		db.query(sql,  (err, result) => {
			if (err) return res.cc(err)
			res.send(result)
		})
	}else{
	const sql = 'select * from order_in  where place = ? ORDER BY time desc'
	db.query(sql, place, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
	}
}


// 删除订单 id
exports.deleteOrderIn = (req, res) => {
    // 删除 dish 表中的菜品
    const sql1 = 'DELETE FROM order_in WHERE id = ?'
    db.query(sql1, req.body.id, (err, result) => {
        if (err) return res.cc(err)
    	res.send({
    	    status: 0,
    	    message: '删除订单成功'
    	})
    })
}


//添加订单
exports.newOrderIn = (req, res) => {
    const orderIninfo = req.body;
	const sql1 = 'insert into order_in set ?';
	//创建时间
	const time = new Date();
	db.query(sql1, {
	    content: orderIninfo.content,
	    place: orderIninfo.place,
		status: '未出餐',
		time,
		ordersum:orderIninfo.ordersum,
		orderer:orderIninfo.orderer
	}, (err, results) => {
	    // 检查是否有错误
	    if (err) {
			console.error('Error during dish creation:', err);
	        return res.send({
	            status: 1,
	            message: '创建订单失败',
	        });
	    }
	
	    // 插入失败,没有影响行数，即影响的行数不为1
	    if (results.affectedRows !== 1) {
	        return res.send({
	            status: 1,
	            message: '创建订单失败',
	        });
	    }
	
	    res.send({
	        status: 0,
	        message: '创建订单成功',
	    });
	});
};


//修改订单
exports.changeOrderIn = (req, res) => {
    const orderIninfo = req.body;
    const sql = 'update order_in set ? where id = ?';
    db.query(sql, [
        {
            content: orderIninfo.content,
            place: orderIninfo.place,
            status: orderIninfo.status,
			ordersum: orderIninfo.ordersum,
        },
        orderIninfo.id // 传入 id
    ], (err, result) => {
        if (err) return console.error('Error during order creation:', err);
        if (result.affectedRows === 0) {
            return res.send({
                status: 1,
                message: '修改失败'
            });
        }
        res.send({
            status: 0,
            message: '修改成功'
        });
    });
}

// 获取对应堂食订单的一个总数 
exports.getOrderInListLength = (req, res) => {
	const sql = 'select * from order_in  '
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 获取菜品信息 接收参数 id
exports.getOrderInInfo = (req, res) => {
	const sql = 'select * from order_in where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send(result[0])
	})
}