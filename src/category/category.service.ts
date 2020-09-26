import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryName } from './enums/categoryName.enum';
import { v4 as uuid } from 'uuid';
import { Freelancer } from '../freelancer/freelancer.entity';

export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async createCategory(name: CategoryName, slug: string): Promise<Category> {
    const category = {
      id: uuid(),
      categoryName: name,
      slug,
    };

    const result = this.categoryRepository.create(category);

    await this.categoryRepository.save(result);
    return result;
  }

  async deleteCategory(name: CategoryName): Promise<Category> {
    await this.categoryRepository.delete({ categoryName: name });
    return this.categoryRepository.findOne({ categoryName: name });
  }

  async findCategoriesByIds(freelancer: Freelancer) {
    return this.categoryRepository.findByIds(freelancer.categories);
  }
}
