import {Services} from "./services";

export class Plugins {

    private plugins: {[key: string] : any} = {}

    add() {

    }

    getAllModelBuilders() {

    }

    getAllGenerators() {

    }

}

/**
 * Config
 */
export interface iConfig {
    [key: string]: { [key: string] : any };
}

/**
 * If you want your class/object to be considered a plugin, use this
 */
export interface iPlugin {
    initialise(services:Services, config:iConfig): void;
    generate(services:Services, config:iConfig): void;
}