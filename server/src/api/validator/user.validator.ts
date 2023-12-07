import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { TGetUserDetailByIdParam } from '../../types/api/user.types';
import { getUserDetailByIdDTO } from '../DTO/user.dto';

const userValidator = {
  validateGetUserDetailById: validateWrapper<TGetUserDetailByIdParam>((req) =>
    objectValidateOverride(getUserDetailByIdDTO, req.params as TGetUserDetailByIdParam),
  ),
};

export default userValidator;
