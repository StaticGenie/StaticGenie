import {iService, iConfig} from "../libs/services"

/**
 * @TODO finish this, currently it absolutely sucks. Implement similar to the pagewriter service i.e. interface, switchable within config, etc
 */
export class Report implements iService {
    
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
        console.log(` ${this.totalPages} - Total Files`)
        console.log()

    }

}