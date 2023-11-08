import validateWrapper from '../../common/validator';
import { TGetUserDetailByIdParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';
import { createUserDTO, getUserDetailByIdDTO } from '../DTO/user.dto';

const userValidator = {
  validateCreateUser: validateWrapper<TUserSchema>((req) => createUserDTO.validate(req.body)),
  validateGetUserDetailById: validateWrapper<TGetUserDetailByIdParam>((req) =>
    getUserDetailByIdDTO.validate(req.params),
  ),
};

export default userValidator;
