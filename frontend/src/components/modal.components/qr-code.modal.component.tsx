import React, { useContext } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import QRCode from 'react-qr-code';
import { MdClear } from 'react-icons/md';
import { ThemeContext } from '../../services/theme-provider';

export const QRCodeModal = ({ url, open = false, setOpen = () => {} }: any) => {
  const onDismiss = () => {
    setOpen(!open);
  };
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
        onClick={() => onDismiss()}
        className="absolute md:flex mb-4 p-2 items-center rounded-xl text-2xl text-main-dark-1 dark:text-main-1 hidden left-10 z-10 top-5">
        <MdClear />
      </button>
      <div className="justify-center flex p-8 dark:bg-main-dark-1 w-screen bg-main-1 h-screen">
        <QRCode value={url} />
      </div>
    </BottomSheet>
  );
};
