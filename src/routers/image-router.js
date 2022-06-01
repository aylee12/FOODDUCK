import { Router } from 'express';
import { imgbbUploader } from 'imgbb-uploader';

const imgRouter = Router();

//이미지 업로드
imgRouter.post('/imgUpload', async (req, res, next) => {});

const options = {
  apiKey: process.env.IMG_KEY,
  base64string: imgEncoded,
};

async function imgUpload() {
  await imgbbUploader(options)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
