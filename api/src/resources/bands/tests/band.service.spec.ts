import { Test, TestingModule } from '@nestjs/testing';
import { BandMember } from '../../../associations/BandMembers/BandMember.model';
import { FanRecord } from '../../../associations/FanRecords/fanRecord.model';
import { GroupieRecord } from '../../../associations/GroupieRecords/GroupieRecord.model';
import { EntitiesProviders_BandMembers, EntitiesProviders_Bands, EntitiesProviders_FanRecords, EntitiesProviders_GroupieRecords } from '../../../database/entities.providers';
import { BandService } from '../band.service';
import { Band } from '../models/band.model';
import { mockBands } from './mocks/bands.mock';

jest.mock('../models/band.model')

describe('~~~~ BandService ~~~~', () => {
  let service: BandService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BandService,
        ...EntitiesProviders_Bands,
        ...EntitiesProviders_FanRecords,
        ...EntitiesProviders_GroupieRecords,
        ...EntitiesProviders_BandMembers,
      ],
    }).compile();

    service = module.get<BandService>(BandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  //----------------------------------------------------------------------------------
  describe('Registering a new Band', () => { 
    it('calls the method to create the new Band', async () => {
      const expectedResult = mockBands[0];
      jest.spyOn(Band, "create").mockResolvedValue(mockBands[0] as Band)
      
      const receivedResult = await service.create({
        name: "De soepkes",
        location: "Hoboken",
        description: "What am I doing?",
        members: []
      });
      
      // expect(Band).toHaveBeenCalledTimes(1); 
      // expect(Band.cre).toHaveBeenCalledTimes(1); 
      await expect(receivedResult).toBe(expectedResult);
    });
    
    it('adds all the given members', async () => {
      
    });
  });

  //----------------------------------------------------------------------------------
  describe('Adding new members to a Band', () => { 
    it('adds all the given members to a band', async () => {
      const mockInput = ['6', '8']
      const mockOutput = [
        {
          bandId: 1,
          musicianId: '6'
        }, {
          bandId: 1,
          musicianId: '8'
        }
      ]
      const expectedResult = mockOutput
      jest.spyOn(BandMember, "bulkCreate").mockResolvedValue(mockOutput as BandMember[])
      
      const receivedResult = await service.registerBandMembers(69, mockInput)
      
      expect(receivedResult).toBe(expectedResult)
    });
    
    it('does not allow members to add that are not Musicians', async () => {
      
    });
    
    it('does not allow duplicate members', async () => {
      
    });
    
    it('removes all the given members from a band', async () => {
      const mockInput = ['6', '8']
      jest.spyOn(BandMember, "destroy").mockResolvedValue(2)
      
      const receivedResult = await service.removeBandMembers(1, mockInput)
      
      const expectedResult = 2
      expect(receivedResult).toBe(expectedResult)
    });
    
  });
  
  //----------------------------------------------------------------------------------
  describe('Adding a new Fan', () => {     
    it('calls the method to create a new Fan', async () => {
      const mockOutput = {
        bandId: 55, 
        fanId: 'userid'
      }
      jest.spyOn(FanRecord, "create").mockResolvedValue(mockOutput)
      const receivedResult = await service.registerFan(55, 'userid')
      
      const expectedResult = mockOutput
      expect(receivedResult).toBe(expectedResult)
    });
  });
  
  //----------------------------------------------------------------------------------
  describe('Adding a new Groupie', () => {     
    it('calls the method to create a new Groupie', async () => {
      const mockOutput = {
        bandId: 55, 
        fanId: 'userid'
      }
      jest.spyOn(GroupieRecord, "create").mockResolvedValue(mockOutput)
      const receivedResult = await service.registerGroupie(55, 'userid')
      
      const expectedResult = mockOutput
      expect(receivedResult).toBe(expectedResult)
    });
    
    it('registers a new subscription between the band and the Groupie', async () => {
      
    });
  });
  
  //----------------------------------------------------------------------------------
  describe('Creating a payment request', () => {     
    it('calls the method to create the new payment request', async () => {
      const mockOutput = {}
    });
  });
  
  //----------------------------------------------------------------------------------
  describe('Setting payment information', () => {     
    it('calls the method to set payment information', async () => {
      
    });
  });
  
  //----------------------------------------------------------------------------------
  describe('Retrieving all executed payments', () => {     
    it('calls the method to retrieve all executed payments', async () => {
      
    });
  });
  
  //----------------------------------------------------------------------------------
  describe('Receiving payment confirmations', () => {     
    it('sends a confirmation mail to receiving and sending parties', async () => {
      
    });
  });
  
});
