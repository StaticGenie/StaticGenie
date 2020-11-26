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

        // Define the blog keys that will be populated
        gm.blog = {
            tags: {
                alphabetical: {},
                popular: {}
            },
            dates: {
                newest: [],
                year: {},
                yearmonth: {},
            },
            authors: {
                popular: {},
            }
        };
        
        // Find all the blog posts
        helpers.getFilesSync(config.directory).forEach(file => {
            
            try {

                // Read the file contents into document but only parse the head section (since the parsed markdown could use up a lot of memory if stored within the globalmodel so best to get and parse it if needed)
                let document = (new SGDocumentBlogPage(fs.readFileSync(file, 'utf8')).exportHead()).config;

                // Create an object that will represent a "post".
                // @TODO this needs to VERIFY it's data and convert types since what's come from document could be anything
                let post = new Post(document.post.date);
                post.title = document.post.title;
                post.desc = document.post.desc;
                post.tags = document.post.tags;
                post.url = "/blog/" + post.date.format("yyyy-mm-dd") + "/" + slugify.default(document.post.title, {lower:true, strict: true}); //@TODO allow this to be customised via the plugin config
                post.author = document.post.author;
                post.file = file;
                
                // Extract the tags and assign to the global model
                (<string[]>document.post.tags).forEach(tag => {
                    
                    // Does the tag already exist, if not, create it
                    if (gm.blog.tags.alphabetical.hasOwnProperty(tag) === false) {
                        gm.blog.tags.alphabetical[tag] = [];  
                    }
                    if (gm.blog.tags.popular.hasOwnProperty(tag) === false) {
                        gm.blog.tags.popular[tag] = [];  
                    }
                    
                    // Add the post to each tag group
                    gm.blog.tags.alphabetical[tag].push(post);
                    gm.blog.tags.popular[tag].push(post);

                });

                // Does the date already exist?
                if (gm.blog.dates.year.hasOwnProperty(post.date.format("yyyy")) === false) {
                    gm.blog.dates.year[post.date.format("yyyy")] = []; 
                }
                if (gm.blog.dates.yearmonth.hasOwnProperty(post.date.format("yyyymm")) === false) {
                    gm.blog.dates.yearmonth[post.date.format("yyyymm")] = [];
                }

                // Add posts to each date group
                gm.blog.dates.newest.push(post);
                gm.blog.dates.year[post.date.format("yyyy")].push(post);
                gm.blog.dates.yearmonth[post.date.format("yyyymm")].push(post);

                // Does the author already exist?
                if (gm.blog.authors.popular.hasOwnProperty(post.author) === false) {
                    gm.blog.authors.popular[post.author] = []; 
                }
                gm.blog.authors.popular[post.author].push(post);

            } catch (e) {
                
                // Add the file that was being parsed to the error to make it a little easier to understand
                e.message += ". When Parsing file: " + file;

                // Rethrow so the error can be
                throw e;

            }

        });

        // Alphabetical
        gm.blog.tags.alphabetical = this.sortObjectKeysAlphabeticallyAsc(gm.blog.tags.alphabetical);
        gm.blog.dates.year = this.sortObjectKeysAlphabeticallyDesc(gm.blog.dates.year);
        gm.blog.dates.yearmonth = this.sortObjectKeysAlphabeticallyDesc(gm.blog.dates.yearmonth);

        // Popular
        gm.blog.tags.popular = this.sortObjectKeysByArrayLengthAsc(gm.blog.tags.popular);
        gm.blog.authors.popular = this.sortObjectKeysByArrayLengthAsc(gm.blog.authors.popular);

        // Array sorts
        gm.blog.dates.newest = gm.blog.dates.newest.sort((post1:Post, post2:Post) => parseInt(post2.date.format("yyyymmddHHMMss")) - parseInt(post1.date.format("yyyymmddHHMMss")))
        
        // @TODO Array sorts per dynamic key

    }

    /**
     * Returns a new object that's keys are sorted ascending order 
     * Any keys that are not strings will be converted to strings
     * @param obj to sort
     */
    sortObjectKeysAlphabeticallyAsc(obj: {[key:string] : any}): {[key:string] : any} {
        let sorted:any = {};
        Object.keys(obj)
            .sort()
            .forEach(key => {
                sorted["k:" + key] = obj[key];
            });
        return sorted;
    }

    /**
     * Returns a new object that's keys are sorted descending order
     * Any keys that are not strings will be converted to strings
     * @param obj to sort
     */
    sortObjectKeysAlphabeticallyDesc(obj: {[key:string] : any}): {[key:string] : any} {
        let sorted:any = {};
        Object.keys(obj)
            .sort()
            .reverse()
            .forEach(key => {
                sorted["k:" + key.toString()] = obj[key];
            });
        return sorted;
    }

    /**
     * Returns a new object that's keys are sorted based on how many items are in its array in ascending order
     * Any keys that are not strings will be converted to strings
     * 
     * @param obj 
     */
    sortObjectKeysByArrayLengthAsc(obj: {[key:string] : any}): {[key:string] : any} {
        let sorted:any = {};
        Object.keys(obj)
            .map(key => { return { name: key, length: obj[key].length } })
            .sort((key1, key2) => key2.length - key1.length)
            .forEach(key => {
                sorted["k:"+key.name.toString()] = obj[key.name];
            });
        return sorted;
    }

    /**
     * Generate pages
     * @param services 
     * @param config
     */
    generate(services:Services, config:iPluginConfig) {

        const gm = (<iGlobalModel>services.get("globalmodel")).model.blog;
        console.log(util.inspect(gm, {depth:null, colors:true}));

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
 * Configuration for this plugin
 */
export interface iPluginConfig extends iConfig {
    directory: string;
}
