import {iService, iConfigService, Services} from "../libs/services";
import * as fs from "fs-extra";
import {iReport} from "../services/report";

export interface iPageWriter {
    write(file:string, data:string|Buffer) : void;
}

abstract class PageWriter implements iService, iPageWriter {

    initialise(services:Services, config:iPageWriterFileConfig) {
        
    }

    abstract write(file:string, data:string|Buffer): void;

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

}

/**
 * Write pages to the file system
 */
export class PageWriterFile extends PageWriter {
    private config:iPageWriterFileConfig = {outDirectory: ""};
    private services:Services = new Services();
    initialise(services:Services, config:iPageWriterFileConfig) {
        this.config = config;
        this.services = services;
    }
    write(file:string, data:string|Buffer) {
        
        // Update with error if one occurs
        let err = "";

        // Write the file
        try {
            fs.outputFileSync(this.config.outDirectory + "/" + file, data);
        } catch (e) {
            err = e.toString();
        }

        // Add the file to the report service
        (<iReport>this.services.get("report")).add(file, err);

    }
}
export interface iPageWriterFileConfig extends iConfigService {
    outDirectory: string;
}

/**
 * Write pages to the console
 */
export class PageWriterConsole extends PageWriter {
    write(file:string, data:string|Buffer) {
        console.log(`\n#########################################\n### ${file}\n#########################################\n` + data.toString());
    }
}
export interface iPageWriterConsoleConfig extends iConfigService {
    
}

/**
 * Nothing to do :)
 */
export class PageWriterVoid extends PageWriter {
    write(file: string, data:string|Buffer) {
        // Nothing to do
    }
}
export interface iPageWriterVoidConfig extends iConfigService {
    
}
