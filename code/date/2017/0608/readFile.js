const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// 从命令行参数获取root目录，默认是当前目录:
let root = path.resolve(process.argv[2] || '.');
console.log('root:' + root);

// 创建服务器:
let server = http.createServer(function(req, res){
	// 获得URL的path
	let pathname = url.parse(req.url).pathname;

	// 获得对应的本地文件路径
	let filepath = path.join(root, pathname);

	// 获取文件状态:
	fs.stat(filepath, function(err, status){
		if(!err && status.isFile()){
			console.log('200' + req.url);
			res.writeHead(200);

			fs.createReadStream(filepath).pipe(res);
		}else if(status.isDirectory()){
			fs.stat(filepath + 'index.html', function(err, status){
				console.log('200' + req.url);
				res.writeHead(200);

				fs.createReadStream(filepath + 'index.html').pipe(res);
			})
		}else{
			console.log('404' + req.url);

			res.writeHead(404);
			res.end('404 not found');
		}
	
	})
});

server.listen(8080);

console.log('runnig...');