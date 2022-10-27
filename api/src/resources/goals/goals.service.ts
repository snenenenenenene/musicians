import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntitiesConstants } from '../../database/entities.constants';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './models/goal.model';

@Injectable()
export class GoalsService {

  constructor(
    @Inject(EntitiesConstants.GOALS_REPOSITORY)
    private GoalRepository: typeof Goal,
  ) { }
  
  
  /* Add a new goal to a band
    
    EXCEPTIONS:
      You cannot create goals for another band
      Given band id does not exist
  */
  async create(ownerId: number, goalDto: CreateGoalDto) {
    const goal = new Goal(goalDto);
    goal.ownerId = ownerId;
    
    return goal.save();  
  }
  
  /* Retrieve all goals stored in the database
  
  */
  async findAll() {
    return await this.GoalRepository.findAll()
  }

  
  /* Retrieve a goal by its primary key.
  
  */
  async findByPk(id: number): Promise<Goal> {
    const foundRecord = await this.GoalRepository.findByPk(id);
    
    if(!foundRecord) 
      throw new NotFoundException;
    else 
      return foundRecord;
  }
  
    
  /* Update the goal of a band
    
    EXCEPTIONS:
      You cannot update the goals of another band
  */
  async update(id: number, goalDto: UpdateGoalDto) {
    return this.GoalRepository.update({goalDto}, {
      where: { id: +id }
    })
  }

  
  /* A band cant delete a goal unless it hasn't yet been bought by a user.
    Otherwise, it can only hide the goal
    TODO Add a 'hidden' tag thingy to goals
    
    EXCEPTIONS:
      You cannot delete the goals of another band
      Given goal id does not exist
  */
  async remove(id: number) {
    return this.GoalRepository.destroy({
      where: { id: +id }
    })
  }
}
