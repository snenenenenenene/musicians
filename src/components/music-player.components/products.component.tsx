import { useEffect, useRef, useState } from 'react';
import Button, { SecondaryButton } from '../common.components/button.component';

export const Product = ({
  track,
  album,
  name,
  price,
  image,
  index,
}: {
  track: any;
  album: any;
  name: string;
  price: any;
  image: any;
  index: any;
}) => {
  return (
    <div className="rounded-3xl justify-center h-16 cursor-pointer overflow-hidden flex flex-col hover:bg-main-2">
      <div className="flex w-full items-center">
        <div className=" flex-col flex justify-center items-center align-middle mx-3"></div>
        <div className="flex flex-col justify-center overflow-hidden">
          <img src={image} alt="album cover" className="w-10 h-10 bg-white rounded-lg"></img>
        </div>
        <div className="flex flex-col w-1/2 pl-3 justify-center">
          <h2 className="font-light">{name}</h2>
        </div>

        <div className="w-1/5 mr-5 h-full justify-center items-center flex flex-col text-center ml-auto">
          {price ? (
            <Button name="product-price" className="rounded-3xl text-xs w-24">
              € {price}
            </Button>
          ) : (
            <SecondaryButton className="rounded-3xl text-xs w-24">Place Bid</SecondaryButton>
          )}
        </div>
      </div>
    </div>
  );
};
