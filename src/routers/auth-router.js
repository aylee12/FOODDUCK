import { Router } from 'express';
import jwt from 'jsonwebtoken';
// import { loginRequired, roleCheck } from '../middlewares';
const authRouter = Router();

//접근권한 인증 api

//user
authRouter.get('/auth/user', async (req, res) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken || userToken === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });
    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;
    const role = jwtDecoded.role;

    res.status(200).json({
      result: 'user-authorized',
      reason: '사용자 인증되었습니다.',
      user: {
        userId,
        role,
      },
    });
    return;
  } catch (error) {
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });
    return;
  }
});

//admin
authRouter.get('/auth/admin', async (req, res) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken || userToken === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '관리자 전용 페이지입니다.',
    });
    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const role = jwtDecoded.role;

    //권한체크
    if (role === 'basic-user') {
      res.status(403).json({
        result: 'no-permissions-allowed',
        reason: '페이지 접근 권한이 없습니다.',
      });
      return;
    }
    res.status(200).json({
      result: 'admin-authorized',
      reason: '관리자 인증되었습니다',
    });
    return;
  } catch (error) {
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });
    return;
  }
});

export { authRouter };
