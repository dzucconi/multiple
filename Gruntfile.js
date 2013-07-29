module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src/",
          src: ["**"],
          dest: "build/",
        }]
      }
    },

    useminPrepare: {
      html: ["build/index.html"]
    },

    usemin: {
      html: ["build/index.html"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-usemin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["clean", "copy", "useminPrepare", "concat", "uglify", "usemin"]);
};
