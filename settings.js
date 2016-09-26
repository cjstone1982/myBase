//0开发  1测试 //2生产

var mobile_environment
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

switch(mobile_environment){
	case 0:
		console.log('当前处于开发环境');
		module.exports = {
			serverPort:9000,
			usercenterHost:'usercenter.simplecredit.lodev',
			usercenterPort:'8014',
			coreHost:'core.simplecredit.lodev',
			corePort:'',
			dataresourceHost:'dataresource.simplecredit.lodev',
			dataresourcePort:'',
			dataplatformHost:'dataplatform.simplecredit.lodev',
			dataplatformPort:'',
			portalHost:'portal.simplecredit.lodev',
			portalPort:'',
			openapiHost:'openapi_store.simplecredit.lodev',
			openapiPort:'8023',
		}
	break;
	case 1:
		console.log('当前处于测试环境');
		module.exports = {
			serverPort:9000,
			usercenterHost:'usercenter.simplecredit.lotest',
			usercenterPort:'',
			coreHost:'core.simplecredit.lotest',
			corePort:'',
			dataresourceHost:'dataresource.simplecredit.lotest',
			dataresourcePort:'',
			dataplatformHost:'dataplatform.simplecredit.lotest',
			dataplatformPort:'',
			portalHost:'portal.simplecredit.lotest',
			portalPort:'',
			openapiHost:'openapi_store.simplecredit.lotest',
			openapiPort:'8023',
		}
	break;
	case 2:
		console.log('当前处于生产环境');
		module.exports = {
			serverPort:8080,
			usercenterHost:'internal-elb-usercenter-1229986148.cn-north-1.elb.amazonaws.com.cn',
			usercenterPort:'',
			coreHost:'internal-elb-core-570291486.cn-north-1.elb.amazonaws.com.cn',
			corePort:'',
			dataresourceHost:'internal-elb-dataresource-34590432.cn-north-1.elb.amazonaws.com.cn',
			dataresourcePort:'',
			dataplatformHost:'internal-elb-dataplatform-237037917.cn-north-1.elb.amazonaws.com.cn',
			dataplatformPort:'',
			portalHost:'elb-portal-1526889772.cn-north-1.elb.amazonaws.com.cn',
			portalPort:'',
			openapiHost:'internal-elb-openapi-store-549731618.cn-north-1.elb.amazonaws.com.cn',
			openapiPort:'',
		}
	break;
	default:
		console.log('运行环境未设置');
}

