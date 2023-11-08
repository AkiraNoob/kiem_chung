import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { TGetUserDetailByIdParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';
import { createUserDTO, getUserDetailByIdDTO } from '../DTO/user.dto';

const userValidator = {
  validateCreateUser: validateWrapper<TUserSchema>((req) => objectValidateOverride(createUserDTO, req.body)),
  validateGetUserDetailById: validateWrapper<TGetUserDetailByIdParam>((req) =>
    objectValidateOverride(getUserDetailByIdDTO, req.params as TGetUserDetailByIdParam),
  ),
};

export default userValidator;
