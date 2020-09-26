import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CategoryName } from '../enums/categoryName.enum';

export class CategoryNameValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    CategoryName.PERSONAL_INJURY,
    CategoryName.REAL_ESTATE,
    CategoryName.TAX,
    CategoryName.HEALTH_CARE,
    CategoryName.INTELLECTUAL_PROPERTY,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value.toUpperCase();
    if (this.isStatusValid(value)) return value;
    throw new BadRequestException(`value is an invalid status`);
  }

  private isStatusValid(status: any) {
    if (this.allowedStatuses.indexOf(status) !== -1) return true;
    return false;
  }
}
