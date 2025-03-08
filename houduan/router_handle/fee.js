const db = require('../db/index.js')


// 修改费用 
exports.changeFee = (req, res) => {
	const {
		expence,
		amount
	} = req.body
	const sql = 'update fee set amount = ? where expence = ?'
	db.query(sql, [amount, expence], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

//修改人工费
exports.updateLaborCost = (req, res) => {
    const sqlSumSalary = 'SELECT SUM(salary) AS total_salary FROM users';
    db.query(sqlSumSalary, (err, result) => {
        if (err) return res.cc(err);

        const totalSalary = result[0].total_salary;
        const sqlUpdateFee = 'UPDATE fee SET amount = ? WHERE expence = ?';
        const expence = '人工费';  

        db.query(sqlUpdateFee, [totalSalary, expence], (err, result) => {
            if (err) return res.cc(err);
            res.send({
                status: 0,
                message: '人工费用更新成功'
            });
        });
    });
};

// 获取所有费用信息 
exports.getAllFee = (req, res) => {
	const sql = 'select * from fee '
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 获取所有费用信息 
exports.getFee = (req, res) => {
	const {
		expence,
		
	} = req.body
	const sql = 'select amount from fee where expence = ?'
	db.query(sql,expence, (err, result) => {
		if (err) return res.cc(err)
		res.send(result[0])
		
	})
}