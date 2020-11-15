import {iService, iConfigService, Services} from "../libs/services"

export interface iReport {
    add(file:string, err:string) : void;
}

/**
 * Base Report
 */
abstract class Report implements iService, iReport {
    
    protected files:{[key:string] : string} = {};

    add(file:string, err:string = "") {
        this.files[file] = err;
    }
    
    pluginsInitialised() {

    }

    pluginsGenerated() {

    }

    abstract initialise(services:Services, config:iConfigService) : void;

}

export class ReportConsole extends Report {
    
    private services:Services = new Services();

    initialise(services:Services, config:iReportConsoleConfig) {
        this.services = services;
    }

    pluginsGenerated() {
        
        // Produce the report in one go (don't do multiple console.logs as it's VERY SLOW if 1000's are needed)
        let report = Object.keys(this.files).map(file => `[${this.files[file] === "" ? "OK" : "ERROR"} ] ${file} ${this.files[file]}`).join("\n");

        // Output the report
        // @TODO split the files into success, list errors at the end & show the summary as X created, X failed. Probably better to store an array of objects, also allows the use of filter and would potentially be better performance wise

        console.log()
        console.log(" ==================================================")
        console.log(" === REPORT")
        console.log(" ==================================================")
        console.log()
        console.log(report)
        console.log()
        console.log(` ${Object.keys(this.files)} Total Files Generated`)
        console.log()

    }
}

export interface iReportConsoleConfig extends iConfigService {
   
}