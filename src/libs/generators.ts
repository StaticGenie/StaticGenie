export class Generators {

    /**
     * Store the generators
     */
    private generators: iGenerator[] = [];

    /**
     * Add generators
     * @param generators 
     */
    addGenerators(generators: iGenerator[]) {
        generators.forEach(generator => this.generators.push(generator));
    }

    /**
     * Execute all generators
     */
    generate(data: {[key: string] : any}) {

        // Run over each of the generators
        this.generators.forEach(generator => {
            generator.generate(data);
        });
        
    }

}

/**
 * Generator
 */
export interface iGenerator {
    generate(model: {[key: string] : any}) : void;
}