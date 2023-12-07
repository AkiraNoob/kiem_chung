import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { TLocalLoginPayload, TRefreshJWTPayload, TRegisterPayload } from '../../types/api/auth.types';
import { localLoginDTO, refreshTokenDTO, registerDTO } from '../DTO/auth.dto';

const authValidator = {
  validateLocalLogin: validateWrapper<TLocalLoginPayload>((req) => objectValidateOverride(localLoginDTO, req.body)),
  validateRegister: validateWrapper<TRegisterPayload>((req) => objectValidateOverride(registerDTO, req.body)),
  validateRefreshToken: validateWrapper<TRefreshJWTPayload>((req) =>
    objectValidateOverride(refreshTokenDTO, { refreshToken: req.cookies['refreshToken'] } as TRefreshJWTPayload),
  ),
};

export default authValidator;
