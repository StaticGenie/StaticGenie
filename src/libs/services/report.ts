import {iService} from "../services"

export class Report implements iService {
    
    private records:string[] = [];

    add(record:string) {
        this.records.push(record);
    }
    
    pluginsInitialised() {

    }

    pluginsGenerated() {
        console.log("==========================================================================")
        console.log("=== STATIC GENIE REPORT")
        console.log("==========================================================================")
        this.records.forEach(record => console.log("[-] " + record));
    }

}