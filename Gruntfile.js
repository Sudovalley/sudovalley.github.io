module.exports= function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        files: [
        {
          cwd: 'public',
          src: ['**/*', '!vendor/**/*', '!scss/**/*', '!js/**/*'],
          dest: 'dist',
          expand: true
        },
      ]
      }
    },

    clean: {
      dist: {
        src: ['dist/**']
      }
    },

    sass: {
  		options: {
  			sourceMap: false
  		},

  		build: {
  			files: {
  				'public/css/<%= pkg.name %>.css': 'public/scss/<%= pkg.name %>.scss'
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
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh-MM-ss") %> */\n'
      },

      dist: {
        files: {
          'dist/css/<%= pkg.name %>.min.css' : 'dist/css/<%= pkg.name %>.css']
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
          src: 'public/index.html',
          dest: 'dist',
          relative: true,
          options: {
            beautify: false,
            relative: true,
            
            scripts: {
              bundle: {
                cwd: 'dist/js',
                files: ['']
              }
            },

            styles: {
              bundle: ['dist/css/<%= pkg.name %>.min.css']
            }
          }
        },
      },

      watch: {
        stylesheets: {
          files: 'public/scss/**/*.scss',
          tasks: ['sass:build']
        },

        scripts: {
          files: 'src/js/**/*.js',
          tasks: ['jshint']
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

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dist', ['jshint', 'clean:dist', 'sass:dist', 'copy:dist', 'cssmin:dist', 'uglify:dist', 'htmlbuild:dist']);
};
