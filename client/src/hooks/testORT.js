import * as ort from 'onnxruntime-web';

//const ort = require('onnxruntime-web');

export default async function testORTWeb() {
    const options = {
        executionProviders: ['wasm'], 
        graphOptimizationLevel: 'all'
      };

    try {
        console.log('Creating ONNX Runtime Web session...');
        const sess = await ort.InferenceSession.create("../models/encoder_L12_float16.onnx", options);

        console.log('Model loaded');

        // 1x 1 x 128 x 128 image
        const input = new ort.Tensor('float32', new Float32Array(128 * 128), [1, 1, 128, 128]);
        console.log('Tensor created');

        console.log('Running inference...');
        const feeds = { input }; // Adjust this based on the actual input name in the model
        const outputMap = await sess.run(feeds);
        console.log('Inference completed');

        const outputTensor = outputMap.values().next().value;
        console.log(`Output Tensor: `, outputTensor);
    } catch (e) {
        console.error('Error during ONNX Runtime Web test:', e);
    }
}
