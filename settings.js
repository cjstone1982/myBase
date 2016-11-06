
//server部分

//服务器 本地可以直连网上数据库
// module.exports = {
// 	dbname:'test',
// 	dbport:'27017',
// 	dbhost:'127.0.0.1',
// 	webport:'8888',
// }

//0开发  1测试 //2生产
// var mobile_environment
switch(process.env.nodejs_env){
	case 'dev':
		mobile_environment=0
	break;
	case 'test':
		mobile_environment=1
	break;
	case 'online':
		mobile_environment=2
	break;
	default:
		mobile_environment=0
}
//设置一个默认值测试用
mobile_environment=0

switch(mobile_environment){
	case 0:
		console.log('当前处于开发环境');
		module.exports = {
			serverPort:8888,
			dbname:'myBase',
			dbport:'27017',
			dbhost:'localhost',
		}
	break;
	case 1:
		console.log('当前处于测试环境');
		module.exports = {
			serverPort:0000,
		}
	break;
	case 2:
		console.log('当前处于生产环境');
		module.exports = {
			serverPort:0000,
		}
	break;
	default:
		console.log('运行环境未设置');
}

//client部分 



