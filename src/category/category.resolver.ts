import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CategoryType } from './models/category.model';
import { CategoryService } from './category.service';
import { CategoryName } from './enums/categoryName.enum';
import { CategoryNameValidationPipe } from './pipes/categoryValidation.pipe';
import { Category } from './category.entity';

@Resolver(of => CategoryType)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(returns => [CategoryType])
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Mutation(returns => CategoryType)
  async createCategory(
    @Args('name', CategoryNameValidationPipe) name: CategoryName,
    @Args('slug') slug: string,
  ): Promise<Category> {
    return this.categoryService.createCategory(name, slug);
  }

  @Mutation(returns => CategoryType)
  async deleteCategory(
    @Args('name', CategoryNameValidationPipe) name: CategoryName,
  ): Promise<Category> {
    return this.categoryService.deleteCategory(name);
  }
}
