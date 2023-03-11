import { nanoid } from 'nanoid';
import React from 'react';
import { useQuery } from 'react-query';
import { Product } from '../../constants/types';
import { Error } from '../../pages/erorr.page';
import { getOwnedProductByUserId } from '../../services/api-calls';
import { Loader } from '../common.components/loader.component';
import { Track } from '../common.components/track.component';

export function UserProducts({
  productScreen = false,
  currUserId,
}: {
  productScreen?: boolean;
  currUserId: number;
}) {
  const {
    data,
    error,
    status,
  }: { data?: Product[]; error: { message: string } | null; status: string } = useQuery(
    ['products'],
    () => getOwnedProductByUserId(currUserId)
  );

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
      {' '}
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error!.message} />
      ) : data && data?.length !== 0 ? (
        data.length > 0 &&
        data.map((product: Product) => (
          <Track
            userId={currUserId}
            item={product}
            key={nanoid(5)}
            productScreen={productScreen}
            ownAccount={true}
          />
        ))
      ) : (
        <>No Likes</>
      )}
    </div>
  );
}
