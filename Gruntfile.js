module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      plugin: {
        files: [{
          "build/multiple.min.js": [
            "src/application.js",
            "src/vendor/jquery.fittext.js",
            "src/vendor/jquery.countdown.js"
          ],
        }]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("build", ["uglify"]);
};
