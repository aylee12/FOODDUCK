import jwt from 'jsonwebtoken';

function roleCheck(req, res, next) {
  const userToken = req.headers['authorization']?.split(' ')[1];

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

    next();
  } catch (error) {
    next(error);
  }
}

export { roleCheck };
