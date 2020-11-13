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

    /**
     * Theme config
     */
    theme: {
        data: {
            title: "StaticGenie",
            links: [
                {name: "Home", url: "/index.html"},
                {name: "About", url: "/about.html"},
                {name: "Contact", url: "/contact.html"},
            ],
            copyright: "Copyright &copy; 2020 StaticGenie, All Rights Reserved",
        },
    },
    
}