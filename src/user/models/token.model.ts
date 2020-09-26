import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Token')
export class TokenType {
  accessToken: string;
}
