module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
          files: [{
              expand: true,
              cwd: 'src/demo/jade/',
              src: ['**/*.jade'],
              dest: 'demo/',
              ext: '.html'
          },
          {
              expand: true,
              cwd: 'src/generator/jade/',
              src: ['**/*.jade'],
              dest: 'generator/',
              ext: '.html'
          }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'Opera >= 15', 'Chrome >= 4', 'Firefox >= 16', 'Safari >= 4']
      },
      css: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'src/css/*.css',
            dest: 'dist/css/'
          },
          {
            expand: true,
            flatten: true,
            src: 'src/demo/css/*.css',
            dest: 'demo/css/'
          },
          {
            expand: true,
            flatten: true,
            src: 'src/generator/css/*.css',
            dest: 'generator/css/'
          }
        ]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['**/*.css'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    },
    uglify: {
      js: {
        files : [
          {
            expand: true,
            flatten: true,
            src: 'src/js/*.js',
            dest: 'dist/js/'
          },
          {
            expand: true,
            flatten: true,
            src: 'src/demo/js/*.js',
            dest: 'demo/js/'
          },
          {
            expand: true,
            flatten: true,
            src: 'src/generator/js/*.js',
            dest: 'generator/js/'
          }
        ]
      }
    },
    watch: {
      files: ['src/demo/jade/*.jade','src/generator/jade/*.jade','src/css/*.css','src/demo/css/*.css','src/generator/css/*.css','src/js/*.js','src/demo/js/*.js','src/generator/js/*.js'],
      tasks: ['default']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jade','autoprefixer','cssmin','uglify']);

  grunt.registerTask('deploy', ['default']);

  grunt.registerTask('dev', ['default','watch']);

};