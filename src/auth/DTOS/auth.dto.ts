import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDTORequest {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  firstname: string;
  @IsOptional()
  @IsString()
  @MaxLength(30)
  lastname: string;

  @IsString()
  @MaxLength(30)
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
    message: 'Password must contain atleast (1 lower case letter,1 upper case letter, 1 digit, 1 special character, 8 characters) ',
  })
  password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class SignInDTORequest {
  @IsString()
  @MaxLength(30)
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
    message: 'Password must contain atleast (1 lower case letter,1 upper case letter, 1 digit, 1 special character, 8 characters) ',
  })
  password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class RefreshTokenDTOrequest {
  @IsString()
  token: string;
}
