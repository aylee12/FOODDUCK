import { Router } from 'express';
import { imgbbUploader } from 'imgbb-uploader';

const imgRouter = Router();

//이미지 업로드
imgRouter.post('/imgUpload', async (req, res, next) => {
  const imgEncoded = req.body.data;
  console.log('데이터:', imgEncoded);

  const options = {
    apiKey: process.env.IMG_KEY,
    base64string: imgEncoded,
  };

  try {
    const result = await imgUpload(options);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

function imgUpload(options) {
  imgbbUploader(options)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export { imgRouter };
