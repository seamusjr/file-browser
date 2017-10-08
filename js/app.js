requirejs.config({
	"baseUrl": "js/lib",
	"paths": {
		"app": "../app",
		"jquery": "jquery-1.11.2.min"
	}
});

requirejs(["app/main"]);
