import { useQuery } from 'react-query';
import { getProducts } from '../../services/api-calls';
import { Error } from '../../pages/erorr.page';
import React from 'react';
import { Track } from '../common.components/track.component';
import { Loader } from '../common.components/loader.component';
import { Product } from '../../constants/types';

export const NewProducts = ({ currUserId }: { currUserId: number }) => {
  const {
    data,
    error,
    status,
  }: { data?: Product[]; error: { message: string } | null; status: string } = useQuery(
    'products',
    getProducts
  );

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        error && <Error message={error.message} />
      ) : (
        <>
          {data &&
            data.length > 0 &&
            data.map((track, i) => <Track userId={currUserId} key={i} item={track} />)}
        </>
      )}
    </>
  );
};
