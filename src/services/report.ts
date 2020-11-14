import {iService, iConfigService} from "../libs/services"

export interface iReport {
    add(record:string) : void;
}

/**
 * @TODO finish this, currently it absolutely sucks. Implement similar to the pagewriter service i.e. interface, switchable within config, etc
 */
export class Report implements iService, iReport {
    
    private totalPages = 0;

    add(record:string) {
        console.log("[-] " + record);
        this.totalPages++;
    }

    /**
     * Initialise using provided config
     * @param config 
     */
    initialise(config:iConfigService) {
        
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

export interface iReportConfig {
    
}