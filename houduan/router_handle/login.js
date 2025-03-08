const db = require('../db/index.js')
//导入加密中间件
const bcrypt = require('bcryptjs')
//导入jwt,用于生成token
const jwt = require('jsonwebtoken')
//导入jwt配置文件,用于解密加密
const jwtconfig = require('../jwt_config/index.js')



exports.register = (req,res) =>{
	const reginfo = req.body
	//先判断账号或者密码是否为空
	if(!reginfo.account||!reginfo.password){
		return res.send({
			status:1,
			message:'账号或密码不能为空'
		})
	}
	//在判断账号是否在数据库中
	const sql ='select * from users where account = ?'
	//第一个是执行语句，第二个是参数，第三个是处理结果的函数
	db.query(sql,reginfo.account,(err,results)=>{
		if(results.length>0){
			return res.send({
				status:1,
				message:'账号已存在'
			})
		}
		//对密码进行加密,用bcrypt
		//第一个是加密的密码，第二个是加密后的长度
		reginfo.password = bcrypt.hashSync(reginfo.password,10)
		//把账号和密码加入数据库中
		const sql1 = 'insert into users set ?'
		//创建时间
		const create_time = new Date();
		const identity='用户'
		db.query(sql1,{
			account:reginfo.account,
			password:reginfo.password,
			create_time,
			identity,
			status:0
		},(err,results)=>{
			//插入失败,没有影响行数，即影响的行数不为1
			if(results.affectedRows!==1){
				return res.send({
					status:1,
					message:'注册账号失败'
				})
			}
			res.send({
				status:1,
				message:'注册账号成功'
			})
		})
	})
}

exports.login = (req,res) =>{
	const loginfo = req.body
	const sql = 'select * from users where account = ?'
	db.query(sql,loginfo.account,(err,results)=>{
		//执行sql失败的情况
		if(err) return res.cc(err)
		if(results.length!==1) return res.cc('登录失败')
		//对前端传来的密码进行解密
		const compareResult = bcrypt.compareSync(loginfo.password,results[0].password)
		if(!compareResult){
			return res.cc('密码错误')
		}
		//对账号是否冻结进行判断
		if(results[0].status==1){
			return res.cc('账号已冻结')
		}
		//生成返回前端的token
		//剔除加密后的密码，头像，创建时间
		const user = {
			...results[0],
			password:'',
			imageUrl:'',
			create_time:'',
			
		}
		//设置token的有效时长
		const tokenStr = jwt.sign(user,jwtconfig.jwtSecretKey,{
			expiresIn:'7h'
		})
		res.send(({
			results:results[0],
			status:0,
			message:'登录成功',
			token:'Bearer ' + tokenStr,
		}))
	})
}



// 路由
const bossRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    {
        name: 'alluser',
        path: '/alluser',
        meta: {title: '全部用户'},
        component: 'user_manage/alluser/index',
    },
    {
        name: 'deliveryman',
        path: '/deliveryman',
        meta: {title: '外送员'},
        component: 'user_manage/deliveryman/index',
    },
    {
        name: 'cook',
        path: '/cook',
        meta: {title: '厨师'},
        component: 'user_manage/cook/index',
    },
	{
	    name: 'cashier',
	    path: '/cashier',
	    meta: {title: '收银员'},
	    component: 'user_manage/cashier/index',
	},
	{
	    name: 'waiter',
	    path: '/waiter',
	    meta: {title: '服务员'},
	    component: 'user_manage/waiter/index',
	},
	{
	    name: 'order_out',
	    path: '/order_out',
	    meta: {title: '外送订单'},
	    component: 'order_out/index',
	},
	{
	    name: 'order_in',
	    path: '/order_in',
	    meta: {title: '堂食订单'},
	    component: 'order_in/index',
	},
	{
	    name: 'message_list',
	    path: '/message_list',
	    meta: {title: '消息列表'},
	    component: 'message/message_list/index',
	},
	{
	    name: 'recycle',
	    path: '/recycle',
	    meta: {title: '回收站'},
	    component: 'message/recycle/index',
	},
	{
	    name: 'salary',
	    path: '/salary',
	    meta: {title: '人工费'},
	    component: 'fee/salary/index',
	},
	{
	    name: 'overview',
	    path: '/overview',
	    meta: {title: '费用总览'},
	    component: 'fee/overview/index',
	},
	{
	    name: 'dish',
	    path: '/dish',
	    meta: {title: '菜品管理'},
	    component: 'dish/index',
	},
]


const cookRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    {
        name: 'message_personal',
        path: '/message_personal',
        meta: {title: '个人消息'},
        component: 'message_personal/index',
    },
	
	{
	    name: 'order_out',
	    path: '/order_out',
	    meta: {title: '外送订单'},
	    component: 'order_out/index',
	},
	{
	    name: 'order_in',
	    path: '/order_in',
	    meta: {title: '堂食订单'},
	    component: 'order_in/index',
	},
	
	
	
	
	{
	    name: 'dish',
	    path: '/dish',
	    meta: {title: '菜品管理'},
	    component: 'dish/index',
	},
]





const waiterRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    
    {
        name: 'message_personal',
        path: '/message_personal',
        meta: {title: '个人消息'},
        component: 'message_personal/index',
    },
    
	
	
	{
	    name: 'order_out',
	    path: '/order_out',
	    meta: {title: '外送订单'},
	    component: 'order_out/index',
	},
	{
	    name: 'order_in',
	    path: '/order_in',
	    meta: {title: '堂食订单'},
	    component: 'order_in/index',
	},
	{
	    name: 'message_list',
	    path: '/message_list',
	    meta: {title: '消息列表'},
	    component: 'message/message_list/index',
	},
	
]



const cashierRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    
	{
	    name: 'order_out',
	    path: '/order_out',
	    meta: {title: '外送订单'},
	    component: 'order_out/index',
	},
	{
	    name: 'order_in',
	    path: '/order_in',
	    meta: {title: '堂食订单'},
	    component: 'order_in/index',
	},
	{
	    name: 'message_personal',
	    path: '/message_personal',
	    meta: {title: '个人消息'},
	    component: 'message_personal/index',
	},
	
	{
	    name: 'dish',
	    path: '/dish',
	    meta: {title: '菜品管理'},
	    component: 'dish/index',
	},
]



const deliverymanRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    
    {
        name: 'message_personal',
        path: '/message_personal',
        meta: {title: '个人消息'},
        component: 'message_personal/index',
    },
    
	{
	    name: 'order_out',
	    path: '/order_out',
	    meta: {title: '外送订单'},
	    component: 'order_out/index',
	},
	
	
	
]



const userRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index.vue',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index.vue',
    },
    {
        name: 'message_personal',
        path: '/message_personal',
        meta: {title: '个人消息'},
        component: 'message_personal/index.vue',
    },
]


// 返回用户的路由列表，参数ID
exports.returnMenuList = (req,res) =>{
    const sql = 'select identity from users where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        let menu = []
        if(result[0].identity=='boss'){
            menu = bossRouter
        }
        if(result[0].identity=='厨师'){
            menu = cookRouter
        }
        if(result[0].identity=='外送员'){
            menu = deliverymanRouter
        }
        if(result[0].identity=='服务员'){
            menu = waiterRouter
        }
		if(result[0].identity=='收银员'){
		    menu = cashierRouter
		}
        if(result[0].identity=='用户'){
            menu = userRouter
        }
        res.send(menu)
    })
}