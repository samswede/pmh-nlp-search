//import { pipeline } from '@xenova/transformers';

async function loadTransformers() {
    /*
    Due to the @xenova/transformers package being an ES Module, we use dynamic import() 
    to ensure compatibility with the CommonJS module system used elsewhere in the codebase. 
    This approach allows the integration of ES Module-based libraries without restructuring
    the entire project to use ECMAScript modules.
    */
    const { pipeline } = await import('@xenova/transformers');
    return pipeline;
  }
  
  async function createGlobalEmbeddingPipeline() {
      const pipeline = await loadTransformers();
      const embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      global.embeddingPipeline = embeddingPipeline;

      console.log('Created global embedding pipeline');
  }
  
  // Then you can use createGlobalEmbeddingPipeline() in your server initialization code.
  

async function embeddTextHF(text) {
    // xenova/MiniLM-L6-v2
    // assumes global variable pipeline has been created

    // Tensor {
    //   type: 'float32',
    //   data: Float32Array(768) [ 0.04592696577310562, 0.07328180968761444, ... ],
    //   size: 768
    // }


    /*
    TO DO:

    - optimise so that the pipeline is only created once...
        This can be achieved by creating a global variable
        that is created when the server starts up.
        Then we can just use that variable here.

        A global variable can be created like this:

        global.pipeline = await pipeline('feature-extraction', 'xenova/MiniLM-L6-v2');

        Then we can use it like this:
        const output = await global.pipeline(text, { pooling: 'mean', normalize: true });

        Global variables are not recommended, but in this case it is ok.

        We are implicitly calling this:

        //const extractor = await pipeline('feature-extraction', 'xenova/MiniLM-L6-v2');
    */
    
    try {
        const output = await global.embeddingPipeline(text, { pooling: 'mean', normalize: true });
        
        //console.log(`Raw Embedding: ${output}`);

        const [embedding] = output.tolist(); // this has also converted it into a string somehow...

        //console.log(`Embedding: ${embedding}`);
        // i need to see the shape of the embedding

        //console.log(`Shape of embedding: ${embedding.shape}`);

        return embedding;

    } catch(err) {
        console.log(err);
    }
    
  }

module.exports = {
    embeddTextHF,
    createGlobalEmbeddingPipeline

};