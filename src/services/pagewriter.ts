import {iService, iConfigService} from "../libs/services"

export interface iPageWriter {
    write(name:string, data:Buffer) : void;
}

abstract class PageWriter implements iService, iPageWriter {

    /**
     * Write the page
     * @param name 
     * @param data 
     */
    abstract write(name:string, data:Buffer) : void;

    /**
     * Initialise using provided config
     * @param config 
     */
    initialise(config:iConfigService) {
        
    }

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

}

export class PageWriterFile extends PageWriter {

    write(name:string, data:Buffer) {
        
    }

}
export interface iPageWriterFileConfig {
    
}

export class PageWriterVoid extends PageWriter {

    write(name:string, data:Buffer) {
        // Just discards the data
    }

}
export interface iPageWriterVoidConfig {
    
}

export class PageWriterConsole extends PageWriter {

    write(name:string, data:Buffer) {
        console.log(`\n#########################################\n### ${name}\n#########################################\n` + data.toString());
    }

}
export interface iPageWriterConsoleConfig {
    
}