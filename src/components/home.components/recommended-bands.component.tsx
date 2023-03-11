import React from 'react';
import { useQuery } from 'react-query';
import getBands from '../../services/api-calls';
import { Loader } from '../common.components/loader.component';
import { Error } from '../../pages/erorr.page';
import { Band, Product } from '../../constants/types';
import { Carousel } from '../../constants/Layout';

export const RecommendedBands = () => {
  const {
    data,
    error,
    status,
  }: { data?: Band[]; error: { message: string } | null; status: string } = useQuery(
    'bands',
    getBands
  );

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        error && <Error message={error.message} />
      ) : (
        data && data.length > 0 && <Carousel items={data} type="bands" />
      )}
    </>
  );
};
