module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        expand: true,
        cwd: 'src/demo/',
        src: ['**/*.html'],
        dest: 'demo/',
        flatten: true
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
    watch: {
      files: ['src/demo/**/*.html','src/css/**/*.css'],
      tasks: ['default']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy','autoprefixer','cssmin','watch']);

  grunt.registerTask('deploy', ['copy','autoprefixer','cssmin']);

};