exports.test=function(){
	console.log('test2');
}

exports.test1=function(){
	console.log('test3');
}

exports.getUUID=()=>{
	let d = new Date().getTime();
	let uuid = 'cjxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  let r = (d + Math.random()*16)%16 | 0;
	  d = Math.floor(d/16);
	  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};