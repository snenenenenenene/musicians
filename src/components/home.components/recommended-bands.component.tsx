import React from 'react';
import { useQuery } from 'react-query';
import { Carousel } from '../../constants/Layout';
import { Band } from '../../constants/types';
import { Error } from '../../pages/erorr.page';
import getBands from '../../services/api-calls';
import { Loader } from '../common.components/loader.component';

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
