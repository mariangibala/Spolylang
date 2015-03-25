module.exports = function(grunt) {

   
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

	concat: {   
		dist: {
		src: [
			
			'js/lib/jquery.js', 
			'js/lib/velocity.js',
			'js/modules/*.js',
			'js/init.js'
		   
		],
		dest: 'app.js',
		}
	},

	uglify: {
		
		my_target: {
		  
		  files: {
			'app.min.js': ['app.js']
		  }
		}
	},
  
   watch: {
	   scripts: {
			files: ['js/*.js', 'js/modules/*.js'],
			//tasks: ['concat'],
			tasks: ['concat', 'uglify'],
			options: {
				spawn: false,
			},
		} 
	}

    });

   
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-watch');

  
    grunt.registerTask('default', ['concat', 'uglify']);

};