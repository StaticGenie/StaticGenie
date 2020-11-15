import {iService, iConfigService, Services} from "../libs/services"

export interface iPageWriter {
    writeString(file:string, data:string) : void;
    writeBinary(file:string, data:Buffer) : void;
}

abstract class PageWriter implements iService, iPageWriter {

    initialise(services:Services, config:iPageWriterFileConfig) {
        
    }

    writeString(file:string, data:string) {

    }

    writeBinary(file:string, data:Buffer) {
        
    }

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

}

export class PageWriterFile extends PageWriter {
    writeString(file:string, data:string) {
        console.log(`\n#########################################\n### ${file}\n#########################################\n` + data);        
    }
    writeBinary(file:string, data:Buffer) {
        this.writeString(name, data.toString());
    }
}
export interface iPageWriterFileConfig extends iConfigService {
    
}

/**
 * Nothing to do :)
 */
export class PageWriterVoid extends PageWriter {

}
export interface iPageWriterVoidConfig extends iConfigService {
    
}

export class PageWriterConsole extends PageWriter {

    writeString(file:string, data:string) {
        console.log(`\n#########################################\n### ${file}\n#########################################\n` + data);        
    }

    writeBinary(file:string, data:Buffer) {
        this.writeString(name, data.toString());
    }

}
export interface iPageWriterConsoleConfig extends iConfigService {
    
}