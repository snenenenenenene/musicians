import { PartialType } from '@nestjs/swagger';
import { CreateSoundDto } from './create-sound.dto';

export class UpdateSoundDto extends PartialType(CreateSoundDto) {}
