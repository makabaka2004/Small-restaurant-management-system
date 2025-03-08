//导入express框架
const express = require('express')
//创建express实例
const app = express()
//导入body-parser
var bodyParser = require('body-parser')

//导入cors
const cors = require('cors')
//全局挂载
app.use(cors())

//multer是node.js的中间件，主要用于上传文件
const multer = require("multer")
// 在server服务端下新建一个public文件，在public文件下新建upload文件用于存放图片
const upload = multer({ dest:'./public/upload' })

app.use(upload.any())
// 静态托管
app.use(express.static("./public"));


//extended为false时，值为数组或者字符串，为true时，值可为任意类型
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use((req,res,next)=>{
	//status=0为成功，=1为失败，默认为1
	res.cc = (err,status=1)=>{
		res.send({
			status,
			//判断error是错误对象还是字符串
			message:err instanceof Error ? err.message : err,
		})
	}
	next()
})


const jwtconfig = require('./jwt_config/index.js')
const{expressjwt:jwt} = require('express-jwt')
// app.use(jwt({
// 	secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))

const loginRouter = require('./router/login.js')
app.use('/api',loginRouter)

const userRouter = require('./router/userinfo.js')
app.use('/user',userRouter)

const setRouter = require('./router/setting.js')
app.use('/set',setRouter)

const dishRouter = require('./router/dish.js')
app.use('/dish',dishRouter)

const order_inRouter = require('./router/order_in.js')
app.use('/order_in',order_inRouter)

const order_outRouter = require('./router/order_out.js')
app.use('/order_out',order_outRouter)

const msgRouter = require('./router/message.js')
app.use('/msg',msgRouter)

const feeRouter = require('./router/fee.js')
app.use('/fee',feeRouter)

//对不符合joi规则的进行报错
app.use((req,res,next)=>{
	if(err instanceof Joi.ValidationError) return res.cc(err)
})



//绑定和侦听指定的主机和端口
app.listen(3007, () => {
	console.log('http://127.0.0.1:3007')
})