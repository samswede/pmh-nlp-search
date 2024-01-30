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
  
async function createGlobalPipelines() {
    const pipeline = await loadTransformers();

    const embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    global.embeddingPipeline = embeddingPipeline;

    console.log('Created global embedding pipeline');

    const generationPipeline = await pipeline('text-generation', 'Xenova/TinyLlama-1.1B-Chat-v1.0');
    global.generationPipeline = generationPipeline;

    console.log('Created global generation pipeline');
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

        const [embedding] = output.tolist(); 

        //console.log(`Embedding: ${embedding}`);

        //console.log(`Shape of embedding: ${embedding.shape}`);

        return embedding;

    } catch(err) {
        console.log(err);
    }
    
  }

async function generateTextHF(userPrompt, systemPrompt, context) {
    // xenova/TinyLlama-1.1B-Chat-v1.0
    // assumes global variable pipeline has been created

    // Define the list of messages
    const messages = [
        { "role": "system", "content": systemPrompt+context },
        { "role": "user", "content": userPrompt },
    ]
    
    // Construct the prompt
    const prompt = global.generationPipeline.tokenizer.apply_chat_template(messages, {
        tokenize: false, add_generation_prompt: true,
    });
    
    // Generate a response
    const result = await global.generationPipeline(prompt, {
        max_new_tokens: 256,
        temperature: 0.7,
        do_sample: true,
        top_k: 50,
    });

    console.log(result);
    // [
    //   {
    //     generated_text: '<|system|>\n' +
    //       'You are a friendly assistant.\n' +
    //       '<|user|>\n' +
    //       'Explain thermodynamics in simple terms.\n' +
    //       '<|assistant|>\n' +
    //       'Thermodynamics is a branch of physics that deals with the study of heat and its transfer, including the relationship between matter and energy, the concept of chemical equilibrium, and the effects of temperature on chemical and physical processes. In thermodynamics, the properties of matter (such as heat capacity, specific heat, and entropy) are considered and their behavior is studied in relation to the temperature.\n\n' +
    //       'Here are some simple steps to explain thermodynamics in simple terms:\n\n' +
    //       '1. Energy: Energy is the ability to do work. It is the ability to transfer heat or do other thermodynamic processes. Some common forms of energy are heat, light, electricity, and chemical energy.\n\n' +
    //       '2. Heat: Heat is a form of energy that can be transferred from one place to another. It is the ability to induce a change in the temperature of a body or system.\n\n' +
    //       '3. Heat capacity: Heat capacity is the amount of heat required to raise the temperature of a system by 1 degree Kelvin (K). It is a measure of the ability of a material to absorb and dissipate thermal energy.\n\n' +
    //       '4. Specific heat: Specific heat is the heat required to raise the'
    //   }
    // ]
    
    // Extract the response
    const extracted_generated_text = result[0].generated_text.split('<|assistant|>')[1].trim();

    console.log(`extracted generated text: ${extracted_generated_text}`);

    return extracted_generated_text;

}

module.exports = {
    embeddTextHF,
    createGlobalPipelines,
    generateTextHF,
};