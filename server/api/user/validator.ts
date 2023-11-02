import validateWrapper from '../../common/validator';
import { TGetUserDetailParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';
import { createUserDTO, getUserDetailDTO } from './dto';

const userValidator = {
  validateCreateUser: validateWrapper<TUserSchema>((req) => createUserDTO.validate(req.body)),
  validateGetUserDetail: validateWrapper<TGetUserDetailParam>((req) => getUserDetailDTO.validate(req.params)),
};

export default userValidator;
