require('dotenv').config();

const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const input = {
    prompt: "black forest gateau cake spelling out the words \"FLUX SCHNELL\", tasty, food photography, dynamic shot",
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 80
};

(async () => {
    try {
        const output = await replicate.run("black-forest-labs/flux-schnell", { input });
        console.log(output);
    } catch (error) {
        console.error("Error during image generation:", error);
    }
})();
