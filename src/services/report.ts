import {iService, iConfig} from "../libs/services"

/**
 * @TODO finish this, currently it absolutely sucks
 * @TODO console.log() is slow as hell, which will drastically slow down website generation for very large sites
 * @TODO would be good to benchmark how long between calls to this, since it would show any pages that are effectively stuck
 * @TODO would be better to show a page that is currently BEING generated in the event it gets stuck you know where to look followed by a "done", "failed", etc
 */
export class Service implements iService {
    
    private totalPages = 0;

    add(record:string) {
        console.log("[-] " + record);
        this.totalPages++;
    }

    /**
     * Initialise using provided config
     * @param config 
     */
    initialise(config:iConfig) {
        
    }
    
    pluginsInitialised() {

        console.log()
        console.log(" ==================================================")
        console.log(" === STATIC GENIE WEBSITE GENERATION REPORT")
        console.log(" ==================================================")
        console.log();
    
    }

    pluginsGenerated() {

        console.log()
        console.log(" ==================================================")
        console.log(" === SUMMARY")
        console.log(" ==================================================")
        console.log()

        console.log(` ${this.totalPages} - .html`)
        console.log(` ${this.totalPages} - .js`)
        console.log(` ${this.totalPages} - .css`)
        console.log(` ${this.totalPages} - .jpg`)
        console.log(` ${this.totalPages} - .png`)
        console.log(` ${this.totalPages*80} - Total Files`)
        console.log()

    }

}