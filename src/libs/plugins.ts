import {iBuilder} from "./models";
import {iGenerator} from "./generators";

export interface iConfig {
    file: string;
    conf: { [key: string]: string; };
}

/**
 * If you want your class/object to be considered a plugin, use this
 */
export interface iPlugin {
    models(): iBuilder[]
    generators(): iGenerator[]
}