'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                hostname: 'localhost',
                keepalive: true,
                livereload: 35729,
            },
            dest: {
                options: {
                    port: 5555,
                    base: ['dist']
                }
            }
        },
        clean: {
            dest: ['dist']
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '!assets/**/*.less'],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            },
            dest: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '!assets/app/**/*.js', '!assets/common/**/*.js', '!assets/components/**/*.js', '!assets/**/*.less'],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            }
        },
        less: {
            css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/assets/less',
                    src: ['**/*.less', '!base.less', '!global.less', '!module/**/*.less'],
                    dest: 'dist/assets/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'dist/assets/css',
                    src: ['**/*.css'],
                    dest: 'dist/assets/css'
                }]
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js', '!assets/js/lib'],
                    dest: 'dist'
                }]
            }
        },
        template: {
            compile: {
                options: {
                    root: 'src/template/',
                    data: {
                        v: '<%= pkg.version %>'
                    }
                },
                files: [
                    { src: ['**/*.html', '!template/**/*.html'], dest: 'dist', expand: true, cwd: 'src' }
                ]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'clean',
        'copy:dev',
        'less',
        'cssmin',
        'connect'
    ]);
    grunt.registerTask('dest', [
        'clean',
        'copy:dest',
        'uglify',
        'less',
        'cssmin',
        'connect'
    ]);
};