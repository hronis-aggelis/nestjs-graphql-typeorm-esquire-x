import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ExperienceLevel, Availability } from '../enums/freelancer.enum';

export class ExperienceLevelValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ExperienceLevel.BEGINNER,
    ExperienceLevel.INTERMEDIATE,
    ExperienceLevel.EXPERT,
    Availability.OPEN,
    Availability.BUSY,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    if (
      Object.keys(value).filter(ole => ole === 'freelancerExperienceLevel')
        .length !== 0
    ) {
      value.freelancerExperienceLevel.toUpperCase();
      if (
        this.isStatusValid(value.freelancerExperienceLevel) &&
        this.isStatusValid(value.freelancerAvailability)
      ) {
        return value;
      }
      throw new BadRequestException(`value is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    if (this.allowedStatuses.indexOf(status) !== -1) return true;
    return false;
  }
}
