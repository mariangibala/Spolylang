require.config({
    baseUrl: 'js',
    paths: {
      
    },
	shim: {
        
		'velocity.min': ['jquery']

	}
});


require(["engine", "jquery", "velocity.min"], function(engine, $, Velocity) {

   engine.init()

});
