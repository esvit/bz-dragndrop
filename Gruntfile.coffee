path = require 'path'

# Build configurations.
module.exports = (grunt) ->
    grunt.initConfig
        cmpnt: grunt.file.readJSON('bower.json'),
        banner: '/*! bzDragndrop v<%= cmpnt.version %> by Vitalii Savchuk(esvit666@gmail.com) - ' +
                    'https://github.com/esvit/bz-data - New BSD License */\n',
            
        # Deletes built file and temp directories.
        clean:
            working:
                src: [
                    'bz-dragndrop.*'
                ]

        concat:
        # concat js files before minification
            js:
                src: [
                    'src/scripts/*.js'
                ]
                dest: 'bz-dragndrop.src.js'

        uglify:
            # concat js files before minification
            js:
                src: ['bz-dragndrop.src.js']
                dest: 'bz-dragndrop.js'
                options:
                  sourceMap: (fileName) ->
                    fileName.replace /\.js$/, '.map'

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-uglify'

    grunt.registerTask 'default', [
        'clean'
        'concat'
        'uglify'
    ]
