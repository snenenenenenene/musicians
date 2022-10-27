import React from 'react';
import Logo from '../../assets/icon.svg';
export const Footer = () => {
  return (
    <div className="md:h-80 h-48 md:pb-40 px-20 grid sm:grid-cols-2 grid-cols-1 bg-main-dark-1 text-main-1 md:ml-72 md:py-14 py-8">
      <div className=" w-full items-center">
        <section className="flex space-x-4 items-center">
          <img src={Logo} loading={'lazy'} className="w-12 h-12 object-cover" alt="logo" />
          <p className="text-3xl font-medium">Musicians</p>
        </section>
      </div>
      <div className="sm:flex flex-col hidden w-full font-medium">
        <p>Antwerp</p>
        <p>Veldkant 33B</p>
        <p>2550 Kontich</p>
        <p>België</p>
      </div>
    </div>
  );
};
