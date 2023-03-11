import React from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../../services/api-calls';
import { Error } from '../../pages/erorr.page';
import { Product } from '../../constants/types';
import { Loader } from '../common.components/loader.component';
import { Carousel } from '../../constants/Layout';

export const TrendingProducts = () => {
  const {
    data,
    error,
    status,
  }: { data: Product[] | undefined; error: { message: string } | null; status: string } = useQuery(
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
        data && data.length > 0 && <Carousel items={data} />
      )}
    </>
  );
};
