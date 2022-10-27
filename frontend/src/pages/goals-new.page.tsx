import React, { useContext, useState } from 'react';
import { MdArrowBackIos, MdPostAdd } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import { Title, TitleWithGoBack } from '../constants/Layout';
import { Goals } from '../constants/types';
import { postGoal } from '../services/api-calls';
import { GlobalContext } from '../services/store';

export const NewGoal = () => {
  const navigate = useNavigate();
  const { band } = useContext(GlobalContext);

  const [goalData, setGoalData] = useState<Goals>({
    name: '',
    amountToAchieve: 0,
    currentAmount: 0,
    bandId: band.id,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation((goalData: Goals) => postGoal(goalData, band.id), {
    onSuccess: () => {
      toast('Created new goal!', { type: 'success' });
      queryClient.invalidateQueries('goals');
      navigate('/goals');
    },
    onError: () => {
      toast('Something went wrong!', { type: 'error' });
    },
  });

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    mutation.mutate(goalData);
  };

  return (
    <Container>
      <TitleWithGoBack title="New Goal" />

      <Title title="Goal Title" type="small" className="mt-7" />
      <Input
        name="set-goal-name"
        placeholder="Jane and John Doe's Chicken Rotisserie Goal"
        onChange={(e) => setGoalData({ ...goalData, name: e.target.value })}
      />
      <Title title="Amount to achieve" type="small" />
      <Input
        name="set-amount-to-achieve"
        placeholder="€ 1.000.000,00"
        onChange={(e) => setGoalData({ ...goalData, amountToAchieve: e.target.value })}
      />

      <Button
        name="create-goal"
        type="submit"
        className="w-full mt-auto h-20"
        onClick={(e) => handleSubmit(e)}>
        <span className="flex items-center justify-center ">
          <MdPostAdd className="text-xl" />
          &nbsp;Create Goal
        </span>
      </Button>
    </Container>
  );
};

export default NewGoal;
