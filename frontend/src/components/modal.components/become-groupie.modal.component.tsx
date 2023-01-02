import React, { useContext, useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { IoMdArrowDown } from 'react-icons/io';
import { CheckBox } from '../../constants/Layout';
import Button from '../common.components/button.component';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../services/theme-provider';
import { Band } from '../../constants/types';

export const BecomeGroupieModal = ({
  band,
  open = false,
  setOpen = () => {},
}: {
  band: Band;
  open: boolean;
  setOpen: any;
}) => {
  const onDismiss = () => {
    console.log(open);
    setOpen(!open);
  };
  const { theme } = useContext(ThemeContext);
  const [check, setCheck] = useState('1 Euro');
  const [amount, setAmount] = useState(1);
  const handleCheck = (value: string, amount: number) => {
    setCheck(value);
    setAmount(amount);
  };

  const GroupieCheckBox = ({ title, amount }: { title: string; amount: number }) => {
    return (
      <CheckBox
        title={title}
        className={`w-full mb-2 p-8 dark:text-main-1 text-main-dark-1 ${
          check === title ? 'shadow-lg bg-main-2 dark:bg-main-dark-2 rounded-3xl  ' : null
        }`}
        check={check}
        handleCheck={() => handleCheck(title, amount)}
      />
    );
  };

  return (
    <BottomSheet
      style={{
        // @ts-ignore
        '--rsbs-bg': theme === 'light' ? '#fff' : '#000',
        '--rsbs-handle-bg': theme === 'light' ? '#000' : '#FFF',
      }}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
      className="z-50 relative"
      open={open}>
      <button
        onClick={() => onDismiss()}
        className="absolute lg:flex mb-4 p-2 items-center rounded-xl text-2xl text-main-dark-1 dark:text-main-1 hidden left-10 z-10 top-5">
        <IoMdArrowDown />
      </button>
      <div className="flex-col flex p-8 dark:bg-main-dark-1 w-screen bg-main-1 h-screen">
        <section className="pb-6 mb-6 flex md:pb-12 md:mb-12 border-b border-main-border">
          <header className="w-full flex">
            <div className="ml-5 flex flex-col">
              <h1 className=" text-2xl font-medium">{band ? band.name : 'Band'}</h1>
            </div>
          </header>
        </section>
        <div className="flex h-full flex-col items-center">
          <GroupieCheckBox title={'1 Euro'} amount={1} />
          <GroupieCheckBox title={'2 Euros'} amount={2} />
          <GroupieCheckBox title={'5 Euros'} amount={5} />
          <GroupieCheckBox title={'10 Euros'} amount={10} />
          <Button name="link-to-subscription-payment" className="w-3/4 mx-auto h-24 mt-auto mb-10">
            <Link to={`/payment/subscription/${band.id}/amount/${amount}`}>
              <span className="w-full h-full flex justify-center items-center">Become Groupie</span>
            </Link>
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};
