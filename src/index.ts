import {App} from "./libs/app";
import {iAppConfig, iAppConfigDebug} from "./libs/config";

// New StaticGenie instance
new App(<iAppConfig>{
    outputDir: "./public",
    assetsDir: "./assets",
    debug: <iAppConfigDebug>{
        showLifeCycle: true,
        showWarnings: true,
        showGeneratedUrls: true,
    },
    plugins: [
        {
            name: "Core",
            file: "../plugins/Core.js",
            conf: {}        // @TODO Assign relevant interface, should be part of plugin
        },
        /*
        {
            name: "Pages",
            file: "./plugins/Pages.js",
            conf: {}        // @TODO Assign relevant interface, should be part of plugin
        },
        {
            name: "Tags",
            file: "./plugins/Tags.js",
            conf: {}
        },
        {
            name: "Categories",
            file: "./plugins/Categories.js",
            conf: {}
        },
        {
            name: "LinkMap",
            file: "./plugins/LinkMap.js",
            conf: {}
        },
        {
            name: "Header",
            file: "./plugins/Header.js",
            conf: {}
        },
        {
            name: "Navigation",
            file: "./plugins/Navigation.js",
            conf: {}
        },
        {
            name: "Footer",
            file: "./plugins/Footer.js",
            conf: {}
        },
        {
            name: "Cache",
            file: "./plugins/Cache.js",
            conf: {}
        },
        {
            name: "ImageResizer",
            file: "./plugins/ImageResizer.js",
            conf: {}
        },
        */
    ],
    themes: [
        /*
        {
            name: "Default",
            files: [],
            conf: {},
        },
        */
    ],
}).generate();

console.log("=================================");
console.log("=== Generation complete :D")
console.log("=================================");
console.log();