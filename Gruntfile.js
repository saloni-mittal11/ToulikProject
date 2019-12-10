module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourcemap: false,
                precision: 8,
                lineNumbers: true
            },
            dev: { // indicates that it will be used only during development
                files: [{
                    expand: 'expanded',
                    check: false,
                    update: false,
                    cwd: './sass',
                    src: ['**/*.scss'],
                    dest: './css',
                    ext: '.css'

                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'

            },
            build: {
                src: ['js/*.js'],
                dest: 'minjs/output.min.js',
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: 'expanded',
                    cwd: './sass',
                    src: ['**/*.scss'],
                    dest: './css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },

            single_file: {
                src: 'css/style.css',
                dest: 'css/style.css'

            }
        },

        watch: {

            src: {
                files: ['**/*.scss'],
                tasks: ['sass:dev']
            },
            options: {
                livereload: true,
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('watchfiles', ['watch', 'sass']);
};