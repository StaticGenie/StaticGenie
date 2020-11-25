/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

/**
 * MAKE SURE THERE ARE NO SIDE EFFECTS AFTER EXECUTING THESE FUNCTIONS! IF THEY HAVE SIDE EFFECTS, THEY ARE NOT HELPERS.
 */

import * as fs from "fs";
import * as path from "path";

/**
 * Returns array of all files (including within directories) minus the directory itself
 * @param dir directory to scan
 */
export function getFilesSync(dir:string) : string[] {

    // resolve the directory so the results can safely be passed around on the same machine
    dir = path.resolve(dir);
    let files: string[] = [];
    fs.readdirSync(dir).forEach(file => {
        if (fs.lstatSync(dir + "/" + file).isDirectory()) {
            files = [...files, ...getFilesSync(dir + "/" + file)];
        } else {
            files.push(dir + "/" + file);
        }
    });
    return files;
    
}