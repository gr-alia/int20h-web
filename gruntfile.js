module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/css/main.css': ['styles/main.sass'],
                    'build/css/fonts.css': ['styles/fonts.sass']
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
                    pretty: true
                },
                files: {
                    'build/index.html': ['views/index.jade']
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            jade: {
                files: ['views/*.jade',
                    'blocks/*/*.jade',
                    'img/svg/*.svg'
                ],
                tasks: ['jade']
            },
            sass: {
                files: ['styles/*.sass', 'styles/modules/*.sass', 'blocks/*/*.sass'],
                tasks: ['sass', 'postcss']
            },
            less: {
                files: ['styles/*.less', 'styles/modules/*.less', 'blocks/*/*.less'],
                tasks: ['less', 'postcss']
            },
            concat: {
                files: ['scripts/global.js', 'blocks/*/*.js'],
                tasks: ['concat']
            }
        },

        concat: {
            options: {
                //separator: ';',
            },
            dist: {
                src: ['scripts/global.js', 'blocks/*/*.js'],
                dest: 'scripts/main.js',
            },
        },

        uglify: {
            options: {
                manage: false
            },
            uglify: {
                files: [{
                    'build/js/min/main.min.js': ['build/js/main.js']
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/minified/'
                }]
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 3 versions']
                    })
                ]
            },
            dist: {
                src: 'css/*.css',
                ext: '.css'
            }
        },

        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: '*.css',
                    dest: 'build/css/min',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            libs: {
                expand: true,
                cwd: './',
                src: [
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/bootstrap/dist/css/bootstrap.min.css',
                ],
                dest: 'build/libs/',
                flatten: true,
                filter: 'isFile',
            },
            js: {
                expand: true,
                cwd: './scripts/',
                src: ['main.js', ],
                dest: 'build/js/',
                flatten: true,
                filter: 'isFile',
            },
            fonts: {
                expand: true,
                cwd: './fonts/',
                src: ['./**', ],
                dest: 'build/fonts/',
                flatten: true,
                filter: 'isFile',
            },
            imgs: {
                expand: true,
                cwd: './',
                src: ['./img/*'],
                dest: 'build/img/',
                flatten: true,
                filter: 'isFile',
            }
        },
    });

    grunt.registerTask('compile', ['jade', 'sass', 'postcss', 'concat', 'copy']);
    grunt.registerTask('minimize', ['uglify', 'cssmin']);
    grunt.registerTask('default', ['compile', 'watch']);
    grunt.task.run('notify_hooks');
};
