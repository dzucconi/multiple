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
          cwd:    "src/",
          src:    ["**"],
          dest:   "build/",
        }]
      }
    },

    useminPrepare: {
      html: ["build/index.html"]
    },

    rev: {
      options: {
        encoding:   "utf8",
        algorithm:  "md5",
        length:     8
      },

      assets: {
        files: [{
          src: [
            "build/javascripts/multiple.min.js"
          ]
        }]
      }
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
  grunt.loadNpmTasks("grunt-rev");

  grunt.registerTask("default", [
    "clean",
    "copy",
    "useminPrepare",
    "concat",
    "uglify",
    "rev",
    "usemin"
  ]);
};
