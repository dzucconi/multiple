module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      multiple: {
        files: [{
          "build/multiple.min.js": [
            "src/vendor/underscore.js",
            "src/vendor/jquery.fittext.js",
            "src/vendor/jquery.countdown.js",
            "src/vendor/analytics.js",
            "src/application.js"
          ],
        }]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("build", ["uglify"]);
};
