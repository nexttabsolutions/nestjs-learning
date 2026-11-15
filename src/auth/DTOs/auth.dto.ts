import { ApiProperty } from '@nestjs/swagger';

export class AuthSignUpDTO {
  /**Gives the SWAGGER docs a body property to work with */
  @ApiProperty({
    description: 'Name of the new user',
  })
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty({
    required: false,
  })
  username: string;
}

export class AuthSignUpResponseDTO {
  @ApiProperty()
  name: string;
}
