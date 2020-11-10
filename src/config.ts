import * as fm from "./framework";

/**
 * Configure your website here
 */
export = <fm.app.iConfig>{

    /**
     * Where to put the generated website
     */
    outputDir: "./public",

    /**
     * Where to pull static assets like files (js, images, etc)
     */
    assetsDir: "./assets",

    /**
     * Lists all plugins to load and their respective config
     */
    plugins: [
        {
            file: "../plugins/pages",
            conf: {}
        },
        /*
        {
            file: "./plugins/tags.js",
            conf: {}
        },
        {
            file: "./plugins/categories.js",
            conf: {}
        },
        {
            file: "./plugins/sitemap.js",
            conf: {}
        },
        {
            file: "./plugins/blogposts.js",
            conf: {}
        },
        {
            file: "./plugins/videos.js",
            conf: {}
        },
        {
            file: "./plugins/downloads.js",
            conf: {}
        },
        {
            file: "./plugins/footer.js",
            conf: {}
        },
        {
            file: "./plugins/cache.js",
            conf: {}
        },
        {
            file: "./plugins/imageresizer.js",
            conf: {}
        },
        */
    ],
    themes: [
        /*
        {
            name: "Default",
            files: [],
            conf: {
                name: "",
                desc: "",
                author: "",
            },
        },
        */
    ],
}