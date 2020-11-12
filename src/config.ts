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
    plugins: {
        "../plugins/pages": {}
    },

    themes: [
        /*
        {
            name: "default",
            directory: "",
            layouts: [],
            conf: {
                name: "",
                desc: "",
                author: "",
                plugins: [
                    "core:pages",
                    "core:tags",
                    "core:categories",
                    "core:sitemap",
                    "core:blogposts",
                    "core:videos",
                    "core:downloads",
                    "core:footer",
                ]
            },
        },
        */
    ],
}