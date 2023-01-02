import React from 'react';
import { useQuery } from 'react-query';
import { getJoinedAndFollowingBands } from '../../services/api-calls';
import { Error } from '../../pages/erorr.page';
import { Loader } from '../common.components/loader.component';
import { Artist } from '../common.components/artist.component';
import { Band } from '../../constants/types';
import { nanoid } from 'nanoid';

export function UserFollowing({
  artistScreen = false,
  currUserId,
}: {
  artistScreen?: boolean;
  currUserId: number;
}) {
  const { data, error, status }: any = useQuery(['bands', currUserId], () =>
    getJoinedAndFollowingBands(currUserId)
  );
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 space-y-4 w-full">
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error.message} />
      ) : data && data?.length !== 0 ? (
        data.length > 0 &&
        data.map((band: Band) => (
          <Artist
            band={band}
            key={nanoid(5)}
            currUserId={currUserId}
            artistScreen={artistScreen}
            ownAccount={true}
          />
        ))
      ) : (
        <>No Likes</>
      )}
    </div>
  );
}
