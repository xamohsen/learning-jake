(function(){
    "use static";


    var jshint = require("simplebuild-jshint");
    var karma = require("simplebuild-karma");
    var KARMA_CONFIG = "karma.conf.js";
    var GENERATED_Dir = "generated/dist";
    desc("Start the karma server (run this first)");
    task("karma", function () {
        console.log("starting karma server");
        karma.start({
            configFile: KARMA_CONFIG
        }, complete, fail);
    }, {async: true});



    desc("default build");
    task("default",["version", "lint"], function () {
        console.log('hello, im the default task');
    });

    desc("Run a localhost server");
    task("run", ["build"], function () {
        jake.exec("node node_modules/http-server/bin/http-server "+GENERATED_Dir, {interactive: true}, complete);
        console.log("run http server");
    });


    desc("Clean all generated files");
    task("clean", GENERATED_Dir, function () {
        console.log("Cleaning up the generated files..");

    });



    desc("check node version");
    task("version", function () {
        console.log("checking node version: .");

        var packageJson = require("./package.json");
        var expectedVersion = "v" + packageJson.engines.node;
        var actualVersion = process.version;
        if(actualVersion !== expectedVersion) {
            fail("Incorrect Node version: expected " + expectedVersion + " but was " + actualVersion);
        }
        console.log(process.version);
    });

    desc("lint the code");
    task("lint", function () {
        process.stdout.write("linting js ..");
        jshint.checkFiles({
            files : ["jakefile.js", "src/**/*.js"],
            globals : {},
            options : {}
        }, complete, fail);
        jake.exec("node node_modules/jshint/bin/jshint Jakefile.js", {interactive: true}, complete);
    }, {async: true});
    desc("Run tests");
    task("test", function() {
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: [
                "Chrome 68.0.3440 (Mac OS X 10.13.6)",
                "Firefox 37.0.0 (Mac OS X 10.10)",
            ]
        }, complete, fail);
    }, { async: true });

    desc("build distribution dirc");
    task("build", [GENERATED_Dir], function() {

        console.log("building ..");
    }, { async: true });

    directory(GENERATED_Dir);
}());