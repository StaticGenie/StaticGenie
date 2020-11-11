export class Themes {

    load(config:iConfig[]) : Themes {
        return this;
    }

}

export interface iConfig {
    name: string;
    files: string[];
    conf: { [key: string]: string; };
}
