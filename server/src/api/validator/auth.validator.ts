import validateWrapper from '../../common/validator';
import { TLocalLoginPayload, TRefreshJWTPayload, TRegisterPayload } from '../../types/api/auth.types';
import { localLoginDTO, refreshTokenDTO, registerDTO } from '../DTO/auth.dto';

const authValidator = {
  validateLocalLogin: validateWrapper<TLocalLoginPayload>((req) => localLoginDTO.validate(req.body)),
  validateRegister: validateWrapper<TRegisterPayload>((req) => registerDTO.validate(req.body, { abortEarly: false })),
  validateRefreshToken: validateWrapper<TRefreshJWTPayload>((req) =>
    refreshTokenDTO.validate({ refreshToken: req.cookies['refreshToken'] }),
  ),
};

export default authValidator;
