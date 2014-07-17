module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: "src/**.js",

            options: {
                specs: "spec/**.js",
                vendor: "lib/**/*.js"
            }
        }

    })

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('test', ['jasmine'] );
};