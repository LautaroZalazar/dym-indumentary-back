import { Address, AddressSchema } from '../../../database/schemas/public/address.schema';
import { User, UserSchema } from '../../../database/schemas/public/user.schema';

export const addressSchema = {
  name: Address.name,
  schema: AddressSchema,
};

export const userSchema = {
  name: User.name,
  schema: UserSchema,
};
