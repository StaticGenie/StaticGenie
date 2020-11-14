import {iService, iConfigService} from "../libs/services"

export interface iReport {
    add(record:iRecord) : void;
}

export interface iRecord {
    url: string;
    status: STATUS;
    msg: string;
}

export enum STATUS {
    SUCCESS = "success",
    ERROR = "error",

}

/**
 * Base Report
 */
abstract class Report implements iService, iReport {
    
    protected records:iRecord[] = [];

    add(record:iRecord) {
        this.records.push(record);
    }
    
    abstract initialise(config:iConfigService) : void;
    
    pluginsInitialised() {

    }

    pluginsGenerated() {

    }

}

export class ReportConsole extends Report {
    
    initialise(config:iReportConsoleConfig) {

    }

    pluginsGenerated() {
        
        // Produce the report in one go (don't do multiple console.logs as it's VERY SLOW if 1000's are needed)
        let report = this.records.map(record => `[${record.status}] ${record.url} ${record.msg}`).join("\n");

        // Output the report

        console.log()
        console.log(" ==================================================")
        console.log(" === REPORT")
        console.log(" ==================================================")
        console.log()
        console.log(report)
        console.log()
        console.log(` ${this.records.length} - Total URLs`)
        console.log()

    }
}

export interface iReportConsoleConfig extends iConfigService {
   
}