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

    abstract initialise(config:iConfigService): void;

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

}

export class PageWriterFile extends PageWriter {

    initialise(config:iPageWriterFileConfig) {
        
    }

    write(name:string, data:Buffer) {
        
    }

}
export interface iPageWriterFileConfig extends iConfigService {
    
}

export class PageWriterVoid extends PageWriter {

    initialise(config:iPageWriterVoidConfig) {
        
    }

    write(name:string, data:Buffer) {
        // Just discards the data
    }

}
export interface iPageWriterVoidConfig extends iConfigService {
    
}

export class PageWriterConsole extends PageWriter {

    initialise(config:iPageWriterConsoleConfig) {
        
    }

    write(name:string, data:Buffer) {
        console.log(`\n#########################################\n### ${name}\n#########################################\n` + data.toString());
    }

}
export interface iPageWriterConsoleConfig extends iConfigService {
    
}