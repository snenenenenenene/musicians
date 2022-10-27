import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Goals } from '../../constants/types';
import { Error } from '../../pages/erorr.page';
import { getGoalsByBandId } from '../../services/api-calls';
import { GlobalContext } from '../../services/store';
import { Goal } from '../common.components/goal.component';
import { Loader } from '../common.components/loader.component';

export const BandGoals = ({ ownAccount }: { ownAccount?: boolean }) => {
  const { band } = useContext(GlobalContext);

  const {
    data,
    error,
    status,
  }: { data?: Goals[]; error: { message: string } | null; status: string } = useQuery(
    ['goals', band.id],
    () => getGoalsByBandId(band.id)
  );
  return (
    <div className="grid lg:grid-cols-2 gap-4 grid-cols-1 w-full">
      {' '}
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error!.message} />
      ) : data?.length !== 0 ? (
        data &&
        data.length > 0 &&
        data.map((goal: Goals) => <Goal goal={goal} key={nanoid(5)} ownAccount={ownAccount} />)
      ) : (
        <>No Goals</>
      )}
    </div>
  );
};

export default BandGoals;
