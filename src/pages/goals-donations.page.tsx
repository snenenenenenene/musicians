import React, { useState } from 'react';
import { MdArrowBackIos, MdAttachMoney } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';

export const GoalDonation = () => {
  const [, setGoalData] = useState({ amountToAchieve: 0 });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <section className="pb-6 mb-6 flex md:pb-12 md:mb-12 border-b border-main-border">
        <header className="w-full flex">
          <div className="ml-5 flex flex-col">
            <span className="font-semibold text-3xl">New Goal</span>
          </div>
        </header>
      </section>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-10 w-1/2">
          <label>Amount to achieve</label>
          <Input
            name="set-amount-to-achieve"
            placeholder="€ 1.000.000,00"
            onChange={(e) => setGoalData({ amountToAchieve: e.target.value })}
          />
        </div>
        <section className="flex space-x-4">
          <Button name="go-back" className="w-40" onClick={() => navigate(-1)}>
            <span className="flex items-center justify-center">
              <MdArrowBackIos />
              &nbsp;Go Back
            </span>
          </Button>
          <Button name="donate-money" type="submit" className="w-40" onClick={() => navigate(-1)}>
            <span className="flex items-center justify-center">
              <MdAttachMoney className="text-xl" />
              &nbsp;Donate
            </span>
          </Button>
        </section>
      </form>
    </Container>
  );
};
