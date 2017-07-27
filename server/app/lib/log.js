const colors = require('colors');
const path = require('path');
const fs = require('fs');

class log {

	constructor() {

		this.colors = {
			error: 'red',
			info: 'green',
			warning: 'yellow',
			debug: 'blue'
		};

		this.debug = process.env.DEBUG || true;
		this.verbose = process.env.VERBOSE || true;

		this.path = path.resolve(__dirname, '..', '..', 'storage', 'logs');

		this.accessLogFile = path.resolve(this.path, 'access_logs.log');
		this.errorLogFile = path.resolve(this.path, 'error_logs.log');
		this.debugLogFile = path.resolve(this.path, 'debug_logs.log');

		this._writing = false;

		this._cache = [];

	}

	error(message) {
		this.write(message, 'error');
	}

	info(message) {
		this.write(message, 'info');
	}

	warning(message) {
		this.write(message, 'warning');
	}

	debug(message) {
		this.write(message, 'debug');
	}

	write(message,type) {

		

		let path = this.accessLogFile;

		switch (type) {
			case 'error': 
				path = this.errorLogFile;
				message = '[' + (new Date) + '] ' + message;
			break;
			case 'debug': 
				path = this.debugLogFile;
			break;
		}


		if (typeof this.colors != 'undefined') {
			let color = this.colors[type];
		}

		if (this.verbose && typeof color == 'undefined') {
			console.log(message);
		}

		if (this.verbose && typeof color != 'undefined') {
			console.log( colors[color](message) );
		}

		if (this.debug) {		

			if (this._writing) {
				return this._cache.push( {message:message + "\r\n", path: path} );				
			}

			this.writeTofile(path, message + "\r\n");
		}

	}

	writeTofile(path, data) {

		this._writing = true;

		fs.writeFile(path, data, {flag:'a+', autoClose:true}, () => {

		    if (this._cache.length > 0) {
		    	this._writing = true;
		    	while(this._cache[0]) {	

			    	this.writeTofile(this._cache[0].path, this._cache[0].message);
			    	this._cache.splice(0,1);
		    	} 

			} else {
				this._writing = false;
			}

		});		
		
	}

}

module.exports = new log;