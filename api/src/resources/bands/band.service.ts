
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import Stripe from 'stripe';
import { BandMember } from '../../associations/BandMembers/BandMember.model';
import { FanRecord } from '../../associations/FanRecords/fanRecord.model';
import { GroupieRecord } from '../../associations/GroupieRecords/GroupieRecord.model';
import { EntitiesConstants } from '../../database/entities.constants';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { Band } from './models/band.model';

@Injectable()
export class BandService {
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null,
  });
  
  constructor(
    @Inject(EntitiesConstants.BANDS_REPOSITORY)
    private BandRepository: typeof Band,

    @Inject(EntitiesConstants.FANRECORDS_REPOSITORY)
    private FanRecordRepository: typeof FanRecord,
    
    @Inject(EntitiesConstants.GROUPIERECORDS_REPOSITORY)
    private GroupieRecordRepository: typeof GroupieRecord,
    
    @Inject(EntitiesConstants.BANDMEMBERS_REPOSITORY)
    private BandMemberRepository: typeof BandMember,
    
  ) {}
  
  // ==================================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all bands saved in the database
  
  */
  async findAll(): Promise<Band[]> {
    return this.BandRepository.findAll({
      include: [
        "products",
        "goals", 
        "sounds",
        "fans",
        "groupies",
        "members"
      ]
    })
    .catch((err) => {
      if(err) return err;
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Create a new band
      When a band registers itself. It also needs a corresponding stripe account.
      Otherwise they cant accept any cash
      
    EXCEPTIONS:
      Fields invalid. Required fields missing
  */
  async create(bandDto: CreateBandDto): Promise<Band> {
    const savedBand = await this.BandRepository.create(bandDto);
    
    // add members to the band
    bandDto.members.forEach((memberId) => {
      this.BandMemberRepository.create({
        bandId: savedBand.id, 
        musicianId: memberId
      });
    });
    
    return await this.BandRepository.findByPk(savedBand.id, {
      include: ["members"]
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Get a band by its primary key
    
  */
  async findByPk(id: number): Promise<Band> {
    const foundRecord = await this.BandRepository.findByPk(id)
    
    if(foundRecord) return foundRecord;
    else throw new NotFoundException;
  }
  
  /* ----------------------------------------------------------------------------------
  Update a band
  
    EXCEPTIONS:
      You cannot update another man's band
  */
  async update(id: number, bandDto: UpdateBandDto): Promise<[number]> {
    return this.BandRepository.update(bandDto, {
      where: { id: id }
    })
    .catch(err => {console.log(err); return err;})
  } 
  
  /* ----------------------------------------------------------------------------------
  Delete a band
  
    EXCEPTIONS:
      You cannot delete another man's band
  */
  async remove(ids: number[]): Promise<number> {
    return this.BandRepository.destroy({
      where: { id: ids }
    })
  }
  
  /* ----------------------------------------------------------------------------------
  Upload a profile picture for a band
  
  
  */
  uploadProfilePicture(id: string, picture: any): Promise<Band> {
    return this.BandRepository.findByPk(id)
    
    .catch((err) => {
      if(err) return err;
    })
    
    .then((band) => {
      band.picture = picture.buffer.toString('base64');
      return band.save();
    })
  }
  
  // ==================================================================================
  
  /* ----------------------------------------------------------------------------------
  Adds new members to a band.
  
  */
  async registerBandMembers(id: number, members: string[]): Promise<BandMember[]> {
    //check if member is a musician
    //check if band exists
    const membersToCreate = members.map(memberId => { 
      return {
        bandId: id,
        musicianId: memberId
      }
    });
    
    return await this.BandMemberRepository.bulkCreate(membersToCreate);
  };
  
  /* ----------------------------------------------------------------------------------
  Get all members from the band.
  
  */  
  async getBandMembers(id: number): Promise<Band> {
    return await this.BandRepository.findByPk(id, {
      include: "members"
    })
  }
  
  /* ----------------------------------------------------------------------------------
  Remove members from the band.
  
  */
  async removeBandMembers(id: number, members: string[]): Promise<number> {
    return await this.BandMemberRepository.destroy({
      where: {
        [Op.and]: {
          bandId: id,
          musicianId: members
        }
      }
    });
  };
  
  // ==================================================================================
  
  /* ----------------------------------------------------------------------------------
  Register a fan to a band
    
  TODO:
    find a way to catch foreign key constraints
  */
  async registerFan(bandId: number, fanId: string): Promise<FanRecord> {
    const foundBand = await this.BandRepository.findByPk(bandId);
    if(!foundBand) 
      throw new NotFoundException("Band could not be found");
    
    foundBand.fansCount += 1;
    foundBand.save();
    
    return this.FanRecordRepository.create({
      fanId: fanId,
      likedBandId: bandId
    })
  }
  
  /* ----------------------------------------------------------------------------------
  Get all fans of a band
  
  */
  async getFans(id: number): Promise<Band> {
    return await this.BandRepository.findByPk(id, {
      include: "fans"
    });

  }
  
  /* ----------------------------------------------------------------------------------
  Remove a fan from a band
  
  */
  async removeFan(bandId: number, fanId: string): Promise<number> {
    return this.FanRecordRepository.destroy({
      where: {
        [Op.and]: {
          fanId: fanId,
          likedBandId: bandId
        }
      }
    })
  }
  
  // ==================================================================================
  
  /* ----------------------------------------------------------------------------------
  Register a new groupie
  
  TODO:
    find a way to catch foreign key constraints
  */
  async registerGroupie(bandId: number, groupieId: string): Promise<GroupieRecord> {
    const foundBand = await this.BandRepository.findByPk(bandId);
    if(!foundBand) 
      throw new NotFoundException("Band could not be found");
    
    foundBand.groupiesCount += 1;
    foundBand.save();
    
    return this.GroupieRecordRepository.create({
      subbedBandId: bandId,
      groupieId: groupieId,
    })
  }
  
  /* ----------------------------------------------------------------------------------
  Get all the groupies of a band
  
  */
  async getGroupies(id: number): Promise<Band> {
    return await this.BandRepository.findByPk(id, {
      include: "groupies"
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Remove a groupie from a band 
  
  */
  async removeGroupie(bandId: number, groupieId: string): Promise<number> {
    return await this.GroupieRecordRepository.destroy({
      where: {
        [Op.and]: {
          groupieId: groupieId,
          subbedBandId: bandId
        }
      }
    })
  }
  
  // ==================================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all products of a new band
  
  */
  async getProducts(id: number): Promise<Band> {
    const foundRecord = await this.BandRepository.findByPk(id, {
      include: "products"
    });
    
    if(!foundRecord) 
      throw new NotFoundException;
    else 
      return foundRecord; 
  }
  
  // ==================================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all goals of a new band
    
    EXCEPTIONS:
      Given band id does not exist
  */
  async getGoals(id: number): Promise<Band> {
    const foundRecord = await this.BandRepository.findByPk(id, {
      include: "goals"
    });
    
    if(!foundRecord) 
      throw new NotFoundException;
    else 
      return foundRecord;    
  }
  
  // ==================================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all sounds of a new band
    
    EXCEPTIONS:
      Given band id does not exist
  */
  async getSounds(id: number): Promise<Band> {
    const foundRecord = await this.BandRepository.findByPk(id, {
      include: "sounds"
    });
    
    if(!foundRecord) 
      throw new NotFoundException;
    else 
      return foundRecord;    
  }
  
}
