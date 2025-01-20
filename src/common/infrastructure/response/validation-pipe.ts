import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { createResponseObj } from 'src/common/domain/utils/response-factory';

export const generateValidationPipe: () => ValidationPipe = () => {
  const validationPipe = new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const formattedErrors = errors.map((err) => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));

      return new BadRequestException(
        createResponseObj({ errors: formattedErrors }),
      );
    },
  });

  return validationPipe;
};
