export class Models {

    /**
     * Build the shared model
     */
    private builders: iBuilder[] = [];

    /**
     * Once the builders have executed, they will have collectively created a model that can be shared across all generators
     */
    public data: {[key: string] : any} = {};

    /**
     * Add builders
     * @param builders 
     */
    addBuilders(builders: iBuilder[]) {
        this.builders.concat(builders);
    }

    /**
     * Execute all models to collectively build the data structure & freeze it once done
     */
    build() {

        // Run over each of the models produced by plugins and let it mutate the "data" prop
        this.builders.forEach(builder => {
            builder.build(this.data);
        });
        
        // Freeze it so that generators can't make further changes (if there any any errors in the "data"", at least you know it's come from ONLY builders & not generators, etc)
        Object.freeze(this.data);

    }

}

/**
 * Model
 */
export interface iBuilder {
    build(model: {[key: string] : any}) : void;
}