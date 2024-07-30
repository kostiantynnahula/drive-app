import { File, FileValidationOptions } from '@app/common';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe {
  constructor(public readonly options: FileValidationOptions) {}
  async transform(value: File[], metadata: ArgumentMetadata): Promise<File[]> {
    if (metadata.type === 'custom') {
      const files = value.filter(
        (file) => file.fieldname === this.options.fieldName,
      );

      if (files.length > this.options.maxCount) {
        throw new BadRequestException(
          `Max files count is ${this.options.maxCount}`,
        );
      }

      const totalSize = files.reduce((acc, file) => acc + file.size, 0);

      if (totalSize > this.options.totalSize) {
        throw new BadRequestException(
          `Max total size is ${this.options.totalSize}`,
        );
      }
    }

    return value;
  }
}
