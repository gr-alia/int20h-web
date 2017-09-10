module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		browserify: {
			build: {
				files: {
					'build/js/bundle.js': ['scripts/main.js'],
				},
				options: {
					browserifyOptions: {
						debug: !process.env.PRODUCTION,
					}
				}
			},
		},

		sass: {
			dist: {
				files: {
					'build/css/bundle.css': ['styles/main.scss'],
					'build/css/fonts.css': ['styles/fonts.scss'],
				},
				options: {
					style: process.env.PRODUCTION ? 'compact' : 'expanded',
					sourcemap: process.env.PRODUCTION ? 'none' : 'file',
				}
			}
		},

		less: {
			dist: {
				files: {
					'css/main.css': ['styles/main.less'],
				}
			}
		},

		jade: {
			compile: {
				options: {
					pretty: !process.env.PRODUCTION,
				},
				files: {
					'build/index.html': ['views/index.jade'],
				}
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
			},
			jade: {
				files: [
					'views/*.jade',
					'components/*/*.jade',
					'img/svg/*.svg'
				],
				tasks: ['jade'],
			},
			sass: {
				files: ['styles/main.scss', 'components/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
			},
			less: {
				files: ['styles/main.less', 'components/**/*.less'],
				tasks: ['less', 'autoprefixer'],
			},
			browserify: {
				files: ['scripts/main.js', 'components/**/*.js'],
				tasks: ['browserify'],
			}
		},

		uglify: {
			options: {
				manage: false
			},
			uglify: {
				files: [{
					'build/js/bundle.js': ['build/js/bundle.js'],
				}]
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'build/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/img/',
				}]
			}
		},

		autoprefixer: {
			options: {
				map: !process.env.PRODUCTION,
				browsers: ['last 3 versions'],
			},
			dist: {
				src: ['build/css/*.css'],
				ext: '.css',
			}
		},

		cssmin: {
			minify: {
				files: [{
					expand: true,
					cwd: 'build/css/',
					src: '*.css',
					dest: 'build/css',
					ext: '.css',
				}]
			}
		},

		copy: {
			assets: {
				expand: true,
				cwd: './assets',
				src: ['./*', './**/*'],
				dest: 'build/',
			}
		},
		
		browserSync: {
			bsFiles: {
				src : ['build/*.html'],
			},
			options: {
				watchTask: true,
				server: {
					baseDir: './build',
				}
			}
		},

		clean: {
			build: ['./build/'],
			options: {
				force: true,
			}
		}
	});

	var buildTasks = ['clean', 'jade', 'sass', 'browserify', 'copy'];
	if (process.env.PRODUCTION) {
		buildTasks.push('minimize');
	}

	grunt.registerTask('minimize', ['uglify', 'cssmin', 'imagemin']);
	grunt.registerTask('build', buildTasks);
	grunt.registerTask('default', ['build', 'browserSync', 'watch']);
	grunt.task.run('notify_hooks');
};
