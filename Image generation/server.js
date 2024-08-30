const express = require('express');
const Replicate = require('replicate');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

app.post('/generate-image', async (req, res) => {
    const {
        prompt,
        guidance,
        num_outputs,
        aspect_ratio,
        output_format,
        output_quality,
        prompt_strength,
        num_inference_steps
    } = req.body;  // req.body에서 값 구조 분해

    try {
        const output = await replicate.run("black-forest-labs/flux-schnell", {
            input: {
                prompt,                // 프롬프트
                guidance,              // 가이던스
                num_outputs,           // 생성할 이미지 수
                aspect_ratio,          // 비율
                output_format,         // 출력 포맷
                output_quality,        // 출력 품질
                prompt_strength,       // 프롬프트 강도
                num_inference_steps    // 추론 단계 수
            }
        });

        res.json({ image: output[0] });  // 첫 번째 이미지 반환
    } catch (error) {
        console.error("Error during image generation:", error);
        res.status(500).json({ error: "이미지를 추출할 수 없습니다." });
    }
});


app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});