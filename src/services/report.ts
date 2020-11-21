/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iService, iConfigService, Services} from "../libs/services"

/**
 * Service interface
 */
export interface iReport {
    add(file:string, err:string) : void;
}

/**
 * Base Report
 */
abstract class Report implements iService, iReport {
    
    /**
     * The files to include in the report with error info (if any)
     */
    protected files:{[key:string] : string} = {};

    /**
     * Add file to report
     * @param file file name to add
     * @param err error if any
     */
    add(file:string, err:string = "") {
        this.files[file] = err;
    }
    
    /**
     * When plugins have all initialised
     */
    pluginsInitialised() {
        // Nothing to do when his happens
    }

    /**
     * When plugins have generated all their pages
     */
    pluginsGenerated() {
        // Nothing to do when this happens
    }

    /**
     * Dependency injection
     * @param services 
     * @param config 
     */
    abstract initialise(services:Services, config:iConfigService) : void;

}

export class ReportConsole extends Report {
    
    /**
     * Dependency injection
     * @param services 
     * @param config 
     */
    initialise(services:Services, config:iReportConsoleConfig) {

    }

    /**
     * When plugins have generated all their pages
     */
    pluginsGenerated() {
        
        // Produce the report in one go (don't do multiple console.logs as it's VERY SLOW if 1000's are needed)
        let ok = Object.keys(this.files).filter(file => this.files[file] === "").map(file =>`[OK] ${file}`);
        let errored = Object.keys(this.files).filter(file => this.files[file] !== "").map(file =>`[ERROR] ${file} ${this.files[file]}`);
        
        // Output the report
        // @TODO split the files into success, list errors at the end & show the summary as X created, X failed. Probably better to store an array of objects, also allows the use of filter and would potentially be better performance wise

        console.log()
        console.log("==================================================")
        console.log("=== REPORT")
        console.log("==================================================")
        console.log()
        console.log(ok.join("\n"))
        console.log(errored.join("\n"))
        console.log()
        console.log(`${ok.length}/${ok.length + errored.length} Pages Generated (${errored.length} Errors)`)
        console.log()
        console.log("==================================================")
        console.log("=== END")
        console.log("==================================================")

    }
}

/**
 * Console report config
 */
export interface iReportConsoleConfig extends iConfigService {
   
}