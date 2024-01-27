import * as onnx from 'onnxjs';

export default async function testONNX() {

    try {
        
        const sess = new onnx.InferenceSession();

        console.log(`onnx session created...`)
        await sess.loadModel("../models/encoder_L12_float16.onnx");
        //const loadingModelPromise = sess.loadModel("../models/onnx_model.onnx");
    
        console.log(`model loaded`);
    
        
        // 1x 128 x 128 image
        const input = new onnx.Tensor(new Float32Array(128*128), "float32", [1, 1, 128, 128]);
        console.log(`tensor created`)

        

        console.log(`running inference...`)
        const outputMap = await sess.run([input]);
        console.log(`inferece done: ${outputMap}`)

        const outputTensor = outputMap.values().next().value;
        console.log(`outputTensor: ${outputTensor}`);

    } catch (e) {
        console.log(`error during ONNX test: ${e}`);
    }

};