module.exports= function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylesheetFiles: [
        'src/**/fullcalendar.min.css',
        'src/**/bootstrap.min.css',
    ],

    scriptFiles: [
        '**/angular.min.js',
        '**/jquery.min.js',
        '**/moment.min.js',
        '**/fullcalendar.min.js',
        '**/pt-br.js',
        '**/underscore-min.js'
    ],

    copy: {
      dev: {
        cwd: 'src',
        src: ['css/**/*', 'bower_components/**/*.css', 'js/**/*', 'bower_components/**/*.js', 'img/**/*', '*.html'],
        dest: 'dev',
        expand: true
      },

      dist: {
        files: [
        {
          cwd: 'src',
          src: ['css/**/*', 'js/**/*', 'img/**/*'],
          dest: 'dist',
          expand: true
        }, 
        {
          cwd: 'src',
          src: ['<%= scriptFiles %>'],
          dest: 'dist/js/vendor',
          flatten: true,
          filter: 'isFile',
          expand: true
        }
      ]
      },

      scripts: {
        cwd: 'src',
        src: ['js/**', 'bower_components/**/*.js'],
        dest: 'dev',
        expand: true
      },

      stylesheets: {
        cwd: 'src',
        src: ['css/**', 'bower_components/**/*.css'],
        dest: 'dev',
        expand: true
      }
    },

    clean: {
      dev: {
        src: ['dev/**']
      },

      dist: {
        src: ['dist/**']
      },

      scripts: {
        src: ['dev/js/**']
      },

      stylesheets: {
        src: ['dev/css/**']
      }
    },

    sass: {
  		options: {
  			sourceMap: true
  		},

  		dist: {
  			files: {
  				'dist/css/<%= pkg.name %>.css': 'dist/css/**/*.scss'
  			}
  		},

      dev: {
        files: {
          'dev/css/<%= pkg.name %>.css': 'dev/css/**/*.scss'
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['Gruntfile.js', 'src/js/**/*.js']
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh-MM-ss") %> */\n',
        sourceMap: true
      },

      dist: {
        files: {
          'dist/css/<%= pkg.name %>.min.css' : ['<%= stylesheetFiles %>', 'dist/css/**/*.css']
        }
      }
    },

  	uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh-MM-ss") %> */',
          sourceMap: true,
          mangle: false
        },
        dist: {
          src: ['dist/js/<%= pkg.name %>.js', 'dist/js/services/*.js', 'dist/js/controllers/*.js'],
          dest: 'dist/js/<%= pkg.name %>.min.js'
        }
      },

      htmlbuild: {
        dist: {
          src: 'src/index.html',
          dest: 'dist',
          relative: true,
          options: {
            beautify: false,
            relative: true,
            
            scripts: {
              bundle: {
                cwd: 'dist/js',
                files: ['<%= scriptFiles %>', '<%= pkg.name %>.min.js']
              }
            },

            styles: {
              bundle: ['dist/css/<%= pkg.name %>.min.css']
            }
          }
        },
      },

      watch: {
        dev: {
          files: ['src/**/*.html', 'src/img/*'],
          tasks: 'dev'
        },

        stylesheets: {
          files: 'src/css/**/*.*css',
          tasks: ['clean:stylesheets', 'copy:stylesheets','sass:dev']
        },

        scripts: {
          files: 'src/js/**/*.js',
          tasks: ['jshint', 'clean:scripts','copy:scripts']
        }
      }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-html-build");

  grunt.registerTask('dev', ['jshint', 'clean:dev', 'copy:dev', 'sass:dev']);
  grunt.registerTask('dist', ['jshint', 'clean:dist', 'copy:dist', 'sass:dist','uglify:dist', 'cssmin:dist', 'htmlbuild:dist']);
};