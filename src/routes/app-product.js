var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');

const URL_ROOT = "127.0.0.1:3001";
const PASSWD = "18082807";

var getStatus = function(url, password, callback) {
	const child = spawn('cmus-remote',["--server", url, "--passwd", password, "-Q"]);
	
	output = JSON.stringify({ state: null, error: true });

	child.stderr.on('data', (data) => {
                console.log(`Cannot get status stderr: ${data}`);
		callback(output);
	});
	
	if(typeof data === "undefined"){
		console.log("inside second undefined");
		child.stdout.on('data', (data) => {
			text_data = data.toString('utf8');
			text_data = text_data.split('\n');
			if(text_data[text_data.length-1]=="") {
				text_data.pop();
			}
			console.log(text_data);
		});

		child.on('close', (code) => {
			
			if(code==0){
				console.log('inside second code 0');
				output = JSON.stringify({ state: null, error: false });
				callback(output);
			}
			else{
				callback(output);
			}
		});
	}
	
};

router.get('/play-pause', function(req, res, next) {
	const child = spawn('cmus-remote',["--server", URL_ROOT, "--passwd", PASSWD, "-u"]);
	
	output = JSON.stringify({ state: null, error: true });

	res.setHeader('Content-Type', 'application/json');

	child.stderr.on('data', (data) => {
		console.log(`play pause error stderr: ${data}`);
		res.send(output);
	});

	if(typeof data === "undefined") {
		child.on('close', (code) => {
			if(code==0) {
				//successfully executed query get the new state
				getStatus(URL_ROOT, PASSWD, function(out){
					res.send(out);
				});
			}
			else{
				res.send(output);
			}
		
		});
	}
});


/*
 { name : 'Play/Pause Music', url : "localhost:3000/music/play-pause", method : "GET"},
	      { name : 'Play Music', url : "localhost:3000/music/play", method : "GET"},
	      { name : 'Pause Music', url : "localhost:3000/music/pause", method : "GET"},
	      { name : 'Next Track', url : "localhost:3000/music/next", method : "GET"},
	      { name : 'Previous Track', url : "localhost:3000/music/previous", method : "GET"},
	      { name : 'Increase Volume by 10%', url : "localhost:3000/music/inc-vol", method : "PUT"},
	      { name : 'Decrease Volume by 10%', url : "localhost:3000/music/dec-vol", method : "PUT"}
*/
module.exports = router;
