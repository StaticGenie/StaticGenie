import * as fm from "../framework";

/**
 * Plugin
 */
export default class implements fm.plugins.iPlugin {

    models() : fm.models.iBuilder[] {
        return [];
    }

    generators() : fm.generators.iGenerator[] {
        return [];
    }

}