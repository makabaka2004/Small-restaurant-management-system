const db = require('../db/index.js')

// 修改地点 接收参数 id place
// exports.changePlace = (req, res) => {
// 	const {
// 		id,
// 		place
// 	} = req.body
// 	const sql = 'update order_out set place = ? where id = ?'
// 	db.query(sql, [place, id], (err, result) => {
// 		if (err) return res.cc(err)
// 		res.send({
// 			status: 0,
// 			message: '修改成功'
// 		})
// 	})
// }

// 修改内容 接收参数 id content
// exports.changeContent = (req, res) => {
// 	const {
// 		id,
// 		content
// 	} = req.body
// 	const sql = 'update order_out set content = ? where id = ?'
// 	db.query(sql, [content, id], (err, result) => {
// 		if (err) return res.cc(err)
// 		res.send({
// 			status: 0,
// 			message: '修改成功'
// 		})
// 	})
// }

// 修改状态 接收参数 id status
exports.changeStatusOut = (req, res) => {
	const {
		id,
		status
	} = req.body
	const sql = 'update order_out set status = ? where id = ?'
	db.query(sql, [status, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}


// 获取所有外送订单列表信息 
exports.returnAllOrderOutListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from order_out ORDER BY time desc limit 10 offset ${number} `
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 通过地点对订单搜索 place
exports.searchOrderOut = (req, res) => {
	const {place} = req.body
	if(place==''){
		const number = 0
		const sql = `select * from order_out ORDER BY time desc limit 10 offset ${number} `
		db.query(sql,  (err, result) => {
			if (err) return res.cc(err)
			res.send(result)
		})
	}else{
	const sql = 'select * from order_out  where place = ? ORDER BY time desc'
	db.query(sql, place, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
	}
}


// 删除订单 id
exports.deleteOrderOut = (req, res) => {
    // 删除 dish 表中的菜品
    const sql1 = 'DELETE FROM order_out WHERE id = ?'
    db.query(sql1, req.body.id, (err, result) => {
        if (err) return res.cc(err)
    	res.send({
    	    status: 0,
    	    message: '删除订单成功'
    	})
    })
}


//添加订单
exports.newOrderOut = (req, res) => {
    const orderIninfo = req.body;
	const sql1 = 'insert into order_out set ?';
	//创建时间
	const time = new Date();
	db.query(sql1, {
	    content: orderIninfo.content,
	    place: orderIninfo.place,
		status: '未送达',
		time,
		ordersum:orderIninfo.ordersum,
		orderer:orderIninfo.orderer,
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
exports.changeOrderOut = (req, res) => {
    const orderOutinfo = req.body;
    const sql = 'update order_out set ? where id = ?';
    db.query(sql, [
        {
            content: orderOutinfo.content,
            place: orderOutinfo.place,
            status: orderOutinfo.status,
			ordersum: orderOutinfo.ordersum,
        },
        orderOutinfo.id // 传入 id
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

// 获取对应外送订单的一个总数 
exports.getOrderOutListLength = (req, res) => {
	const sql = 'select * from order_out  '
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 获取菜品信息 接收参数 id
exports.getOrderOutInfo = (req, res) => {
	const sql = 'select * from order_out where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send(result[0])
	})
}