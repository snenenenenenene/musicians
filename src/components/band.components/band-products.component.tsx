import { nanoid } from 'nanoid';
import React from 'react';
import { useQuery } from 'react-query';
import { Product } from '../../constants/types';

import { Error } from '../../pages/erorr.page';
import { getProductsByBandId } from '../../services/api-calls';
import { Loader } from '../common.components/loader.component';
import { Track } from '../common.components/track.component';

export const BandProducts = ({
  ownAccount,
  currUserId,
  bandId,
  productScreen,
}: {
  ownAccount?: boolean;
  currUserId: number;
  bandId: number;
  productScreen?: boolean;
}) => {
  const {
    data,
    error,
    status,
  }: { data?: Product[]; error: { message: string } | null; status: string } = useQuery(
    ['products', bandId],
    () => getProductsByBandId(bandId)
  );

  return (
    <div
      className={`grid w-full ${
        ownAccount && productScreen
          ? 'grid-cols-1 space-y-4'
          : 'lg:grid-cols-2 grid-cols-1 lg:space-x-4'
      }`}>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error!.message} />
      ) : data !== undefined && data.length > 0 ? (
        data &&
        data.length > 0 &&
        data.map((product: Product) => (
          <Track
            userId={currUserId}
            item={product}
            key={nanoid(5)}
            productScreen={productScreen}
            ownAccount={ownAccount}
          />
        ))
      ) : (
        <>No Products</>
      )}
    </div>
  );
};

export default BandProducts;
