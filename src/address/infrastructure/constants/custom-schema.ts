import { Address, AddressSchema } from 'src/database/schemas/address.schema';
import { User, UserSchema } from 'src/database/schemas/user.schema';

export const addressSchema = {
  name: Address.name,
  schema: AddressSchema,
};

export const userSchema = {
  name: User.name,
  schema: UserSchema,
};
