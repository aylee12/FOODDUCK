import jwt from 'jsonwebtoken';

function adminRequired(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  console.log(req.headers['authorization']?.split(' ')[1]);
  const token = req.headers['authorization']?.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!token || token === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '관리자 전용 페이지 입니다. 관리자로 로그인 해주십시오.',
    });

    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    // token의 권한이 admin인지 확인
    const role = jwtDecoded.role;

    // admin이면 진행, admin이 아니면 에러발생
    if (role === 'admin') {
      next();
    } else {
      res.status(403).json({
        result: 'not-admin-token',
        reason: '관리자 토큰이 아닙니다.',
      });

      return;
    }
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });

    return;
  }
}

export { adminRequired };
