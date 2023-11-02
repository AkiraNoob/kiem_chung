import validateWrapper from '../../common/validator';
import { TLocalLoginPayload, TRegisterPayload } from '../../types/api/auth.types';
import { localLoginDTO, registerDTO } from './dto';

const authValidator = {
  validateLocalLogin: validateWrapper<TLocalLoginPayload>((req) => localLoginDTO.validate(req.body)),
  validateRegister: validateWrapper<TRegisterPayload>((req) => registerDTO.validate(req.body)),
};

export default authValidator;
