import React from 'react';
import { MdMusicNote } from 'react-icons/md';
import { Link } from 'react-router-dom';

// block component that is used to display artists and products on the home page

export const Block = ({ item, type = 'products' }) => {
  return (
    <div data-cy={`block-${item.id}`} className="p-3">
      <div className="bg-main-2 dark:bg-main-dark-2 shadow aspect-w-1 aspect-h-1 w-full flex justify-center items-center">
        {item.picture ? (
          <Link
            data-cy={`link-to-${item.name}`}
            to={{
              pathname: type === 'products' ? `/products/${item.id}` : `/bands/${item.id}`,
            }}>
            <img
              width="w-full"
              height="h-full"
              className="w-full h-full object-cover"
              src={item.picture}
              alt="art"
              loading="lazy"
            />
          </Link>
        ) : (
          <MdMusicNote className="text-6xl" />
        )}
      </div>
      <div className="mt-4">
        <Link
          data-cy={`link-to-${item.name}`}
          to={{
            pathname: type === 'products' ? `/products/${item.id}` : `/bands/${item.id}`,
          }}>
          <span className=" font-medium text-sm dark:text-main-1 text-main-dark-1 hover:underline">
            <p className="h-5 overflow-hidden">{item.name}</p>
          </span>
        </Link>
        <Link
          data-cy={`link-to-${item?.band?.name}`}
          to={{
            pathname: `/bands/${item.band?.id && item.band?.id}`,
          }}>
          <p className="font-normal hover:underline text-xs text-main-important-text">
            {item.band?.name ? item.band.name : item?.location}
          </p>
        </Link>
      </div>
    </div>
  );
};
