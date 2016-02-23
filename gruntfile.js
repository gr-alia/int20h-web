module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          'css/main.css': ['sass/main.sass'],
          'css/fonts.css': ['sass/fonts.sass']
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
        }]
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
        files: ['sass/*.sass', 'sass/modules/*.sass'],
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-notify');

  grunt.task.run('notify_hooks');
};
