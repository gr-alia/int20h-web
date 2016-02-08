module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uncss: {
      dist: {
        files: {
          'css/main.tidy.css': ['*.html']
        }
      }
    },

    sass: {
      dist: {
        files: {
          'css/main.css': ['sass/main.sass']
        }
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

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: '*.css',
          dest: 'css/',
          ext: '.min.css'
        },
        {
          expand: true,
          cwd: 'css/',
          src: '*.tidy.css',
          dest: 'css/',
          ext: '.tidy.min.css'
        }]
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true,
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
        files: ['views/*.jade'],
        tasks: ['jade']
      },
      sass: {
        files: ['sass/*.sass'],
        tasks: ['sass']
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
    }
  });

  grunt.registerTask('default', ['watch']);

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.task.run('notify_hooks');
};
