import React, { useState } from 'react';
import { MdPayment, MdQrCode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoalBar } from '../../constants/Layout';
import Button from './button.component';
import { QRCodeModal } from '../modal.components/qr-code.modal.component';
import { Goals } from '../../constants/types';

export const Goal = ({ goal, ownAccount }: { goal: Goals; ownAccount?: boolean }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full py-5 relative justify-center items-center rounded-xl flex shadow dark:bg-main-dark-2 flex-col">
      <section className="px-5 flex w-full mb-4">
        <h1 className="text-xl font-medium">{goal?.name ? goal.name : 'Loop Pedal'}</h1>
        <div className="ml-auto flex space-x-4">
          <Link to={`/payment/goals/${goal.id}`}>
            <Button name="link-to-payment" className=" rounded-full">
              <MdPayment />
            </Button>
          </Link>
          <Button
            name="open-qr-code"
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className=" rounded-full">
            <MdQrCode />
          </Button>
        </div>
      </section>
      <GoalBar max={goal.amountToAchieve} current={goal.currentAmount} />
      <QRCodeModal
        open={openModal}
        setOpen={setOpenModal}
        url={`${process.env.REACT_APP_BASEURL}/payment/goals/${goal.id}`}
      />
    </div>
  );
};
