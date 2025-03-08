const db = require('../db/index.js')


// 修改姓名 接收参数 id name
exports.changeName = (req, res) => {
	const {
		id,
		name
	} = req.body
	const sql = 'update dish set name = ? where id = ?'
	db.query(sql, [name, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}


// 修改价格 接收参数 id prize
exports.changePrice = (req, res) => {
	const {
		id,
		prize
	} = req.body
	const sql = 'update dish set price = ? where id = ?'
	db.query(sql, [prize, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}


// 修改描述 接收参数 id prize
exports.changeDescribe = (req, res) => {
	const {
		id,
		description
	} = req.body
	const sql = 'update dish set description = ? where id = ?'
	db.query(sql, [description, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 获取菜品信息 接收参数 id
exports.getDishInfo = (req, res) => {
	const sql = 'select * from dish where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send(result[0])
	})
}

// 获取所有菜品信息 
exports.getAllDishInfo = (req, res) => {
	const sql = 'select * from dish '
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 获取所有菜品列表信息 
exports.returnAllDishListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from dish ORDER BY id limit 10 offset ${number} `
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 获取对应菜品的一个总数 
exports.getDishListLength = (req, res) => {
	const sql = 'select * from dish  '
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}


// 通过名字对菜品搜索 name
exports.searchDish = (req, res) => {
	const {name} = req.body
	if(name==''){
		const number = 0
		const sql = `select * from dish ORDER BY id limit 10 offset ${number} `
		db.query(sql,  (err, result) => {
			if (err) return res.cc(err)
			res.send(result)
		})
	}else{
	const sql = 'select * from dish where name = ? '
	db.query(sql, name, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
	}
}


// 删除菜品 id
exports.deleteDish = (req, res) => {
    // 删除 dish 表中的菜品
    const sql1 = 'DELETE FROM dish WHERE id = ?'
    db.query(sql1, req.body.id, (err, result) => {
        if (err) return res.cc(err)
    	res.send({
    	    status: 0,
    	    message: '删除菜品成功'
    	})
    })
}

//添加菜品
exports.newDish = (req, res) => {
    const dishinfo = req.body;

    // 在判断菜品是否在数据库中
    const sql = 'select * from dish where name = ?';
    // 第一个是执行语句，第二个是参数，第三个是处理结果的函数
    db.query(sql, dishinfo.name, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: '查询菜品失败',
            });
        }

        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '菜品已存在',
            });
        }

        const sql1 = 'insert into dish set ?';
        db.query(sql1, {
            name: dishinfo.name,
            price: dishinfo.price,
			description: dishinfo.description,
        }, (err, results) => {
            // 检查是否有错误
            if (err) {
				console.error('Error during dish creation:', err);
                return res.send({
                    status: 1,
                    message: '创建菜品失败',
                });
            }

            // 插入失败,没有影响行数，即影响的行数不为1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '创建菜品失败',
                });
            }

            res.send({
                status: 0,
                message: '创建菜品成功',
            });
        });
    });
};

//修改菜品
exports.changeDish = (req, res) => {
    const dishinfo = req.body;
    const sql = 'update dish set ? where id = ?';
    db.query(sql, [
        {
            name: dishinfo.name,
            price: dishinfo.price,
            description: dishinfo.description
        },
        dishinfo.id // 传入 id
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

