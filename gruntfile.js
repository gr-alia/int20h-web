module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          'css/main.css': ['styles/main.sass'],
          'css/fonts.css': ['styles/fonts.sass']
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
          'main.html': ['views/main.jade']
        }
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      jade: {
        files: ['views/*.jade',
                'views/modules/*.jade',
                'img/svg/*.svg'],
        tasks: ['jade']
      },
      sass: {
        files: ['styles/*.sass', 'styles/modules/*.sass'],
        tasks: ['sass', 'postcss']
      },
      less: {
        files: ['styles/*.less', 'styles/modules/*.less'],
        tasks: ['less', 'postcss']
      }
    },

    uglify: {
      options: {
        manage: false
      },
      my_target: {
        files: [{
          'js/main.min.js': ['js/main.js']
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
          cwd: 'css/',
          src: '*.css',
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    }

  });

  grunt.registerTask('default', ['watch']);

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-notify');

  grunt.task.run('notify_hooks');
};
