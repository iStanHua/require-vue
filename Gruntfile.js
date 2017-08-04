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
                    src: ['**/*', '!**/*.less'],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            },
            dest: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '!app/**/*.js', '!common/**/*.js', '!components/**/*.js', '!**/*.less'],
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
                    cwd: 'src/less',
                    src: ['**/*.less', '!base.less', '!global.less', '!module/**/*.less'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['**/*.css'],
                    dest: 'dist/css'
                }]
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js', '!js/lib'],
                    dest: 'dist'
                }]
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