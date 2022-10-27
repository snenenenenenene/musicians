import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Product } from '../../constants/types';
import { Error } from '../../pages/erorr.page';
import { getBands, getProducts, getUserLikedProducts } from '../../services/api-calls';
import { Loader } from '../common.components/loader.component';
import { Track } from '../common.components/track.component';

export function UserLikes({
  productScreen = false,
  currUserId,
}: {
  productScreen?: boolean;
  currUserId: number;
}) {
  const { data, error, status }: any = useQuery(['likedProducts', currUserId], () =>
    getUserLikedProducts(currUserId)
  );

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error.message} />
      ) : data && data?.length !== 0 ? (
        data.length > 0 &&
        data.map((product: Product, index: number) => (
          <Track userId={currUserId} item={product} key={index} />
        ))
      ) : (
        <>No Liked Products</>
      )}
    </div>
  );
}
