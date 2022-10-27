import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';

import React, { useContext, useState } from 'react';

import { Swiping } from '../swiping.components/swiping.component';
import { IoMdArrowDown } from 'react-icons/io';
import { GlobalContext } from '../../services/store';
import { ThemeContext } from '../../services/theme-provider';

export const SwipingModal = ({ open = false, setOpen = () => {} }: any) => {
  const onDismiss = () => {
    setOpen(!open);
  };
  const { user, playing } = useContext(GlobalContext);
  const { theme } = useContext(ThemeContext);

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
        data-cy="close-swiping-modal"
        name="close-swiping-modal"
        id="close-swiping-modal"
        onClick={() => onDismiss()}
        className="absolute md:flex mb-4 p-2 items-center rounded-xl text-2xl text-main-dark-1 dark:text-main-1 hidden left-10 z-10 top-5">
        <IoMdArrowDown />
      </button>
      <div className="justify-center flex p-8 dark:bg-main-dark-1 w-screen bg-main-1 h-screen">
        <Swiping currUserId={user?.id} />
      </div>
    </BottomSheet>
  );
};
