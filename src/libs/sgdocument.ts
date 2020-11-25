/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import * as yaml from "js-yaml";
import * as markdown from "markdown-it";

/**
 * The format of the returned parsed document
 */
export interface iSGDocumentObject{
    config: {[key:string]:any};
    page: {[key:string]:any};
}

/**
 * Required interface for an SGDocument
 */
export interface iSGDocumentExportable {

    /**
     * Export the fully parsed document
     */
    export(): iSGDocumentObject;
    
    /**
     * Doesn't require extracting and parsing the body
     */
    exportHead() : iSGDocumentObject;

    /**
     * Doesn't require extracting and parsing the head
     */
    exportBody() : string;

}

/**
 * Easier to extend this class than re-create it from scratch using the exportable interface
 */
export abstract class SGDocument implements iSGDocumentExportable {

    /**
     * The raw document to parse
     */
    protected document:string;

    /**
     * Define the delimiter to use to seperate the documents head from body
     */
    protected delimiter:string = "\n====="; // Windows CRLF will still work with this (don't put a trailing \n in the delimiter) 

    /**
     * @param document The raw document string to parse
     */
    constructor(document:string) {
        this.document = document;
    }

    /**
     * Finds the offset of the delimiter within the document
     */
    protected getDelimiterPosition(){
        let position = this.document.indexOf(this.delimiter);
        if (position === -1) {
            throw new Error(`Couldn't find the delimiter '${this.delimiter}' that separates the head from the body section`);
        }
        return position;
    }

    /**
     * Extract the body section of the document and parse it
     */
    protected getBody() : string {

        // Markdown parser
        let md = new markdown.default({
            html: true,
            linkify: true,
            typographer: true
        });

        // Extract and parse Markdown
        return md.render(this.document.slice(this.getDelimiterPosition() + this.delimiter.length).trim());
        
    }

    /**
     * Extract the head section of the document and parse it
     */
    protected getHead() : iSGDocumentObject  {
        return <iSGDocumentObject>yaml.safeLoad(this.document.slice(0, this.getDelimiterPosition()).trim());
    }

    /**
     * Export the parsed and verified document including both head and body
     */
    export() : iSGDocumentObject {

        // Get the parsed head
        let document = this.getHead();

        // Verify the head looks right before attaching the body
        this.verifyDocument(document);
        
        // Attach body
        document.page.content = this.getBody();

        // Completed document
        return document;
        
    }

    /**
     * Doesn't require extracting the body
     */
    exportHead() : iSGDocumentObject {
        let head = this.getHead();
        this.verifyDocument(head);
        return head;
    }

    /**
     * Doesn't require extracting the head
     */
    exportBody() : string {
        return this.getBody();
    }

    /**
     * Verify that all the required keys exist for this specific type of document on config.* and page.*
     * @param document 
     * @throws Error
     */
    protected abstract verifyDocument(document: iSGDocumentObject) : void;
    
}
