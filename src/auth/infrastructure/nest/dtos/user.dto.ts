import { IsNotEmpty, IsString } from 'class-validator';

export class UserRecoveryPasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
