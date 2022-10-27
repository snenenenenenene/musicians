import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LikedSound } from '../../associations/LikedSounds/LikedSound.model';
import { EntitiesConstants } from '../../database/entities.constants';
import { CreateSoundDto } from './dto/create-sound.dto';
import { UpdateSoundDto } from './dto/update-sound.dto';
import { Sound } from './models/sound.model';

@Injectable()
export class SoundsService {
  
  constructor(
    @Inject(EntitiesConstants.SOUNDS_REPOSITORY)
    private SoundRepository: typeof Sound,
    
    @Inject(EntitiesConstants.SOUNDS_REPOSITORY)
    private LikedSoundRepository: typeof LikedSound,
  ) {}
    
  
  /* Add a new sound to a band
    
    EXCEPTIONS:
      You cannot create sounds for another band
      Given band id does not exist
  */
  async create(ownerId: number, soundDto: CreateSoundDto) : Promise<Sound> {
    const sound = new Sound(soundDto);
    sound.ownerId = ownerId;
    
    return sound.save();
  }
  
  
  /* Get all sounds
  
  */
  async findAll() : Promise<Sound[]> {
    return await this.SoundRepository.findAll({
      include: "owner"
    })
    .catch((err) => {
      if(err) return err;
    });
  }
  
  
  /*  
  find a sound by its primary key
  */
  async findByPk(id: number) {
    const foundRecord = await this.SoundRepository.findByPk(id);
      
    if(!foundRecord) 
      throw new NotFoundException;
    else 
      return foundRecord;
    }
  
  /*  
  update the properties of a sound
  */
  async update(id: number, soundDto: UpdateSoundDto): Promise<[number]> {
    return this.SoundRepository.update({soundDto}, {
      where: { id: +id }
    })
  }
  
  /* 
  remove a sound by its id
  */
  async remove(id: number | number[]): Promise<number> {
    return this.SoundRepository.destroy({
      where: { id: id }
    })
  }
  
  
  async like(id: number, userId: string) {
    // retrieve the correct sound
    const sound = await this.findByPk(id)
    
    // increase the field indicating the amount of likes.
    sound.increment('likesCount', { by: 1 })
    
    // have the user save this sound.
    this.LikedSoundRepository.create({
      soundId: id,
      userId: userId
    })
    
  }
  
  
  async dislike(id: number) {
    // retrieve the correct sound
    const sound = await this.findByPk(id)

    // increase the field indicating the amount of likes.
    sound.increment('likesCount', { by: 1 })
    
  }
}
