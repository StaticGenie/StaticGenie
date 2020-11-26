/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iPlugin, iConfig} from "../libs/plugins";
import {Services} from "../libs/services";
import {iPageWriter} from "../services/pagewriter";
import {iTheme} from "../services/theme";
import {iReport} from "../services/report";
import {iGlobalModel} from "../services/globalmodel";
import {iSGDocumentObject, SGDocument} from "../libs/sgdocument";
import * as helpers from "../libs/helpers";
import * as fs from "fs";
import * as slugify from "slugify";
import * as dateformat from "dateformat";
import * as util from "util";

/**
 * Plugin
 * @TODO Finish the blog plugin
 * @TODO Not sure allowing a format() method on the model itself and passing to themes is a good idea...
 */
export class Plugin implements iPlugin {

    /**
     * Update the model, check config, etc
     * @NOTE 
     * @param services
     * @param config 
     * @throws Error
     */
    initialise(services:Services, config:iPluginConfig) {

        const gm = (<iGlobalModel>services.get("globalmodel")).model;
        const model = new BlogGlobalModelBuilder();

        // Find all the blog posts
        helpers.getFilesSync(config.directory).forEach(file => {
            
            try {

                // Read the file contents into document but only parse the head section (since the parsed markdown could use up a lot of memory if stored within the globalmodel so best to get and parse it if needed)
                let document = (new SGDocumentBlogPage(fs.readFileSync(file, 'utf8')).exportHead()).config;

                // Create an object that will represent a "post".
                let post = new Post(document.post.date);
                post.title = document.post.title;
                post.desc = document.post.desc;
                post.tags = document.post.tags;
                post.url = "/blog/" + post.date.format("yyyy-mm-dd") + "/" + slugify.default(document.post.title, {lower:true, strict: true}); //@TODO allow this to be customised via the plugin config and make the knowledge of creating a blog url re-useable
                post.author = document.post.author;
                post.file = file;

                // Add post to the model
                model.addPost(post);
                
            } catch (e) {
                
                // Add the file that was being parsed to the error to make it a little easier to understand
                e.message += ". When Parsing file: " + file;

                // Rethrow so the error can be
                throw e;

            }

        });

        // Build and export the model onto the global model
        gm.blog = {};

        // @TODO think what's best to call the key the builder is attached to, and then rename the model builder class to match
        gm.blog.groups = model.build();
        
    }

    /**
     * Generate pages
     * @param services 
     * @param config
     */
    generate(services:Services, config:iPluginConfig) {

        const pages = <iPageWriter>services.get("pagewriter");
        const theme = <iTheme>services.get("theme");
        const report = <iReport>services.get("report");
        const gm = (<iGlobalModel>services.get("globalmodel")).model.blog;
        console.log(util.inspect(gm, {depth:null, colors:true}));

        // Render an index page!!
        pages.write("/blog/index.html", theme.renderLayout("blog/index", {}));





        // Create the general pages
            // Index (page.post .... )
            // By Tags
            // By Date
            // By Author
            // 

        /*

        // Services
        const pages = <iPageWriter>services.get("pagewriter");
        const theme = <iTheme>services.get("theme");
        const report = <iReport>services.get("report");

        // Find all the page defs
        helpers.getFilesSync("./data/standardpage").forEach(file => {
            try {
                
                // Read the file contents into document
                let document = new SGDocumentStandardPage(fs.readFileSync(file, 'utf8')).export()

                // Write the page
                pages.write(document.config.file, theme.renderLayout(document.config.layout, document.page));
                
            } catch (e) {

                // Couldn't create the page, so report it
                report.add(file, e.toString());

            }

        });
        */

        
        

    }

}

class Post {
    date:PostDate;
    title:string = "";
    desc:string = "";
    url:string = "";
    author:string = "";
    tags:string[] = [];
    file:string = "";

    /**
     * By enforcing the date to be injected in, it allows date.format() to be used straight away
     * @param date 
     */
    constructor(date:Date) {
        this.date = new PostDate(date);
    }

}

class PostDate {
    
    /**
     * Private since allowing date.date just looks weird but post.date.format() looks right :)
     */
    private date:Date;
    constructor(date:Date) {
        this.date = date;
    }
    format(format:string):string {
        return dateformat.default(this.date, format);
    }

}

/**
 * Understands how to parse & verify Blog Pages
 */
class SGDocumentBlogPage extends SGDocument {

    /**
     * Verify the document contains the expected fields on config.* & page.*
     * @param document 
     */
    protected verifyDocument(document: iSGDocumentObject) : void {

        // Check required fields exist
        if (document.hasOwnProperty("config") === false) throw new Error(`Does not contain a "config" property`);
        if (document.config.hasOwnProperty("layout") === false) throw new Error(`Does not contain a "config.file" property`);
        
        // If this field doesn't exist, make sure it does now
        if (document.hasOwnProperty("page") === false) {
            document.page = {};
        }

        // These keys should NOT already exist as it's reserved for the parsed body sections content to be added later
        if (document.page.hasOwnProperty("content") === true) {
            throw new Error("You can not define your own 'page.content' key in the page head section as it's reserved for the main documents (body) content to occupy when parsed.");
        }

        // Reserved for the generated post data such as author, date, etc
        if (document.page.hasOwnProperty("post") === true) {
            throw new Error("You can not define your own 'page.post' key in the page head section as it's reserved for use by the blog plugin to make computed values available to themes.");
        }

    }

}

/**
 * How posts are stored within the global model
 */
interface iPostCollection {
    name: string;
    posts: Post[];
}

/**
 * What will be made available on the "gobalmodel" service provider. 
 * Exported so you can use it to help render themes
 * @TODO move to another key eg: blog.groups.*, blog.posts.*, etc.
 */
export interface iBlogGlobalModel {
    tagsPopular: iPostCollection[];
    tagsAlphabetical: iPostCollection[];
    datesYear: iPostCollection[];
    datesYearMonth: iPostCollection[];
    authorsPopular: iPostCollection[];
}

class BlogGlobalModelBuilder {
    
    /**
     * Working model and what will be exported
     */
    private model:iBlogGlobalModel = {
        tagsPopular: [],
        tagsAlphabetical: [],
        datesYear: [],
        datesYearMonth: [],
        authorsPopular: [],
    }

    /**
     * Add a new post to the model builder
     * @param post 
     */
    addPost(post:Post) {

        // Extract the tags and assign to the model
        post.tags.forEach(tag => {
            this.addToPostCollection(this.model.tagsPopular, tag, post);
            this.addToPostCollection(this.model.tagsAlphabetical, tag, post);
        });
        
        // Other collections
        this.addToPostCollection(this.model.datesYear, post.date.format("yyyy"), post);
        this.addToPostCollection(this.model.datesYearMonth, post.date.format("yyyymm"), post);
        this.addToPostCollection(this.model.authorsPopular, post.author, post);

    }
    
    /**
     * Build & export the model
     */
    build() : iBlogGlobalModel {

        // Ensure the model is sorted before exporting
        this.sort();

        // Return it
        return this.model;

    }

    /**
     * Add a new post to the correct collection (case insensitive), creating a new collection if one doesn't exist
     * @param collections
     * @param name 
     * @param post 
     */
    private addToPostCollection(collections: iPostCollection[], name:string, post:Post) {

        // Find the correct collection to add the post to
        let existing = collections.find(collection => collection.name.toString().toLocaleLowerCase() === name.toString().toLocaleLowerCase());
        if (typeof existing !== "undefined") {
            existing.posts.push(post);
            return;
        }

        // Create a new collection
        collections.push({
            name: name.toString(),
            posts: [post]
        });

    }

    /**
     * Sort a collection and return a new collection
     * @param collections 
     */
    private sortCollectionByTotalPostsDesc(collections: iPostCollection[]): iPostCollection[] {
        return collections.sort((collection1, collection2) => collection2.posts.length - collection1.posts.length);
    }

    /**
     * Sort a collection and return a new collection, descending order, newest first (dates)
     * @param collections 
     */
    private sortCollectionByNameDesc(collections: iPostCollection[]): iPostCollection[] {
        return collections.sort((collection1, collection2) => collection2.name.localeCompare(collection1.name));
    }

    /**
     * Sort a collection and return a new collection, ascending order
     * @param collections 
     */
    private sortCollectionByNameAsc(collections: iPostCollection[]): iPostCollection[] {
        return collections.sort((collection1, collection2) => collection1.name.localeCompare(collection2.name));
    }

    /**
     * Sort the posts within each collection by date, descending, newest first
     * @param collections 
     */
    private sortCollectionPostsByDateDesc(collections: iPostCollection[]): iPostCollection[] {
        return collections.map(collection => {
            return {
                name: collection.name,
                posts: collection.posts.sort((post1, post2) => post2.date.format("yyyymmddHHMMss").localeCompare(post1.date.format("yyyymmddHHMMss")))
            };
        });
    }

    /**
     * Sort everything within the model
     */
    private sort() {

        // Sort by total posts, descending
        this.model.tagsPopular = this.sortCollectionByTotalPostsDesc(this.model.tagsPopular);
        this.model.authorsPopular = this.sortCollectionByTotalPostsDesc(this.model.authorsPopular);

        // Sort by name, ascending
        this.model.tagsAlphabetical = this.sortCollectionByNameAsc(this.model.tagsAlphabetical);

        // Sort by name, descending
        this.model.datesYear = this.sortCollectionByNameDesc(this.model.datesYear);
        this.model.datesYearMonth = this.sortCollectionByNameDesc(this.model.datesYearMonth);

        // Sort posts within each collection
        this.model.tagsPopular = this.sortCollectionPostsByDateDesc(this.model.tagsPopular);
        this.model.authorsPopular = this.sortCollectionPostsByDateDesc(this.model.authorsPopular);
        this.model.tagsAlphabetical = this.sortCollectionPostsByDateDesc(this.model.tagsAlphabetical);
        this.model.datesYear = this.sortCollectionPostsByDateDesc(this.model.datesYear);
        this.model.datesYearMonth = this.sortCollectionPostsByDateDesc(this.model.datesYearMonth);

    }

}

/**
 * Configuration for this plugin
 */
export interface iPluginConfig extends iConfig {
    directory: string;
}
