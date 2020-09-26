import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { CategoryName } from '../enums/categoryName.enum';

@ObjectType('Category')
export class CategoryType {
  @Field(type => ID)
  id: string;

  categoryName: CategoryName;
  slug: string;
}

registerEnumType(CategoryName, {
  name: 'CategoryName',
});
