'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jsdoc: {
      dist: {
        src: [
          'src/admin/**/*.js',
          'src/common/**/*.js',
          'src/monitor/**/*.js',
          'src/tester/**/*.js'

        ],
        options: {
            destination: 'doc',
            template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
            configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
        }
      }
    },
    nggettext_extract: {
      pot: {
        files: {
          'po/templates.pot': [
            'src/**/*.js',
            'src/**/*.html'

            //'src/admin/**/*.html',
            //'src/common/**/*.html',
            //'src/monitor/**/*.html',
            //'src/tester/**/*.html',
            /*
            'src/admin/views/fixtures/*.html',
            'src/admin/fixture/views/add/*.html',
            'src/admin/fixture/views/list/*.html',
            'src/admin/fixture/views/edit/*.html',
            'src/admin/group/views/add/*.html',
            'src/admin/group/views/list/*.html',


            'src/admin/views/home/*.html',
            'src/admin/views/stations/*.html',
            'src/admin/views/usernpms/*.html',

            'src/common/auth/views/login/*.html',

            'src/monitor/views/home/*.html',

            'src/tester/views/developer/*.html',
            'src/tester/views/help/*.html',
            'src/tester/views/station/*.html',
            'src/tester/views/user_interaction/*.html'
            */
          ]
          //,
          //'po/directives.pot': ['partials/directives/*.html','partials/directives/complete/*.html'],
          //'po/template.pot': ['../templates/*.html']

        }
      }
    },

    nggettext_compile: {
      all: {
        files: {
          'dist/translations.js': ['po/*.po']
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      admin: {
        options: {
          beautify: {
            width: 80,
            beautify: true
          }
        },
        files: {
          'dist/admin.min.js': [
            'src/admin/admin_module.js',
            'src/admin/views/fixtures/*.js',
            'src/admin/*.js',
            'src/admin/services/*.js'
          ]
        }
      },
      common: {
        options: {
          beautify: {
            width: 80,
            beautify: true
          }
        },
        files: {
          'dist/common.min.js': [
            'src/common/common_module.js',
            'src/common/auth/views/login/*.js',
            'src/common/auth/*.js',
            'src/common/services/*.js',
            'src/common/*.js'
         ]
        }
      },
      monitor: {
        options: {
          beautify: {
            width: 80,
            beautify: true
          }
        },
        files: {
          'dist/monitor.min.js': [

            'src/monitor/monitor_module.js',
            'src/monitor/views/home/*.js',
            'src/monitor/services/*.js',
            'src/monitor/*.js'

          ]
        }
      },
      tester: {
        options: {
          beautify: {
            width: 80,
            beautify: true
          }
        },
        files: {
          'dist/tester.min.js': [
            'src/tester/tester_module.js',
            'src/tester/services/*.js',
            'src/tester/views/developer/*.js',
            'src/tester/views/help/*.js',
            'src/tester/views/station/*.js',
            'src/tester/views/user_interaction/*.js',
            'src/tester/*.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-angular-gettext');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['nggettext_extract', 'nggettext_compile', 'uglify','jsdoc']);
};