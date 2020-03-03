module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pug: {
      compile: {
          files: [{
              expand: true,
              cwd: 'src/demo/pug/',
              src: ['**/*.pug','!html-content.pug'],
              dest: 'demo/',
              ext: '.html'
          },
          {
              expand: true,
              cwd: 'src/generator/pug/',
              src: ['**/*.pug'],
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
      files: ['src/demo/pug/*.pug','src/generator/pug/*.pug','src/css/*.css','src/demo/css/*.css','src/generator/css/*.css','src/js/*.js','src/demo/js/*.js','src/generator/js/*.js'],
      tasks: ['default']
    },
    'gh-pages': {
      options: {
        branch: 'gh-pages',
        only: ['**/*','!README.md','!images/**/*'],
      },
      deploy: {
        options: {
          move: [{base: 'generator/', src: '**/*', dest: '/'}, {base: 'dist/', src: '**/*', dest: '/'}],
          replace: [{files: ['index.html','js/page.js'], regex: /\.\.\/dist\/css/g, replacement: 'css'}, {files: 'demo/*.html', regex: /\.\.\/dist\/css/g, replacement: '../css'}, {files: 'demo/*.html', regex: /\.\.\/dist\/js/g, replacement: '../js'}],
          user: {
            name: 'Travis CI',
            email: 'travis@billynate.com'
          },
          repo: 'https://' + process.env.GH_TOKEN + '@github.com/' + process.env.TRAVIS_REPO_SLUG,
          silent: true,
          message: 'Travis build ' + getDeployMessage()
        },
        src: ['demo/**/*','dist/**/*','generator/**/*']
      }
    }
  });

  // get a formatted commit message to review changes from the commit log
  // github will turn some of these into clickable links
  function getDeployMessage()
  {
    var ret = '\n\n';
    if(process.env.TRAVIS !== 'true')
    {
      ret += 'missing env vars for travis-ci';
      return ret;
    }
    ret += 'branch:       ' + process.env.TRAVIS_BRANCH + '\n';
    ret += 'SHA:          ' + process.env.TRAVIS_COMMIT + '\n';
    ret += 'range SHA:    ' + process.env.TRAVIS_COMMIT_RANGE + '\n';
    ret += 'build id:     ' + process.env.TRAVIS_BUILD_ID  + '\n';
    ret += 'build number: ' + process.env.TRAVIS_BUILD_NUMBER + '\n';
    return ret;
  }
  
  grunt.loadNpmTasks('grunt-contrib-pug');

  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['pug','autoprefixer','cssmin','uglify']);

  grunt.registerTask('deploy', ['gh-pages']);

  grunt.registerTask('dev', ['default','watch']);

};