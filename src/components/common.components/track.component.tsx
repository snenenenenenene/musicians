import React, { useContext, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty, IoMdMusicalNote, IoMdPause, IoMdPlay } from 'react-icons/io';
import { MdMonetizationOn } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { Product } from '../../constants/types';
import { deleteProduct, likeProduct, unlikeProduct } from '../../services/api-calls';
import { GlobalContext } from '../../services/store';
import Button from './button.component';

export const Track = ({
  className = '',
  item,
  productScreen,
  ownAccount,
  userId,
  isMusician,
}: {
  className?: string;
  item: Product;
  productScreen?: boolean;
  ownAccount?: boolean;
  userId: number;
  isMusician?: boolean;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((productId: number) => deleteProduct(productId), {
    onSuccess: () => queryClient.invalidateQueries('products'),
  });

  const likeMutation = useMutation((productId: number) => likeProduct(productId, userId), {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const unlikeMutation = useMutation((productId: number) => unlikeProduct(productId, userId), {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const { currentSong, setCurrentSong, user, playing, handlePlay, handlePlayPause } =
    useContext(GlobalContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isMusicHovered, setIsMusicHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseMusicEnter = () => {
    setIsMusicHovered(true);
  };
  const handleMouseMusicLeave = () => {
    setIsMusicHovered(false);
  };

  return item ? (
    <div
      data-cy={`track-${item.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex w-full items-center pr-4 ${className}`}>
      <div
        className="w-14 h-14 min-w-14 min-h-14 bg-main-dark-1 shadow flex mr-4 justify-center items-center rounded-lg cursor-pointer relative overflow-hidden"
        onMouseEnter={handleMouseMusicEnter}
        onMouseLeave={handleMouseMusicLeave}
        onClick={() => {
          setCurrentSong(item);
          handlePlay();
          if (currentSong === item) {
            handlePlayPause();
            return;
          }
        }}>
        {isMusicHovered && (
          <div className="absolute bg-main-dark-2-transparent text-main-1 w-full h-full flex justify-center items-center text-3xl">
            {currentSong === item && playing ? <IoMdPause /> : <IoMdPlay />}
          </div>
        )}
        {item.picture ? (
          <img
            src={item.picture}
            width="w-full"
            height="h-full"
            className="object-cover w-full h-full"
            alt="ART"
            loading="lazy"
          />
        ) : (
          <IoMdMusicalNote className="text-3xl" />
        )}
      </div>
      <div className="w-40">
        <Link data-cy={`link-to-${item?.name}-on-track`} to={`/products/${item?.id}`}>
          <h2 className="text-sm font-medium hover:underline truncate overflow-hidden">
            {item?.name ? item.name : 'TRACK_NAME'}
          </h2>
        </Link>
        <Link data-cy={`link-to-${item?.band?.name}-on-track`} to={`/bands/${item?.band?.id}`}>
          <h1 className="font-normal hover:underline text-xs text-main-important-text truncate">
            {item?.band ? item.band?.name : 'BAND_NAME'}
          </h1>
        </Link>
      </div>
      <section className="ml-auto font-normal mr-4 text-xs text-main-important-text">
        {isHovered && userId !== -1 ? (
          <div className="text-3xl">
            {item?.band?.members?.includes(user?.id) ? (
              <Link to={`/products/${item?.id}/open-bids`}>
                <button
                  className="bg-main-dark-1 text-main-1 text-2xl rounded-full"
                  onClick={() => mutation.mutate(item.id!)}>
                  <MdMonetizationOn />
                </button>
              </Link>
            ) : item?.likedBy && item?.likedBy?.includes(user?.id) ? (
              <button className="text-main-3" onClick={() => unlikeMutation.mutate(item.id!)}>
                <IoMdHeart />
              </button>
            ) : (
              <button
                name={`like-product-${item?.id}`}
                id={`like-product-${item?.id}`}
                data-cy={`like-product-${item?.id}`}
                onClick={() => likeMutation.mutate(item.id!)}>
                <IoMdHeartEmpty />
              </button>
            )}
          </div>
        ) : item.duration ? (
          <>{item?.duration}</>
        ) : (
          <>3:12</>
        )}
      </section>
      <Link
        data-cy={`link-to-product-${item.name}-payment-on-track`}
        to={`/payment/products/${item?.id}`}>
        <Button
          name={`product-${item.name}-payment-on-track-button`}
          className="xs:mr-4 xs:w-20 w-20 text-xs xs:text-md">
          €&nbsp;{item?.price ? item.price : 89}
        </Button>
      </Link>
    </div>
  ) : null;
};
