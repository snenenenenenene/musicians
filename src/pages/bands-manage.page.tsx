import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
import { MdMusicNote, MdSettings } from 'react-icons/md';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import Container from '../components/common.components/container.component';
import { Loader } from '../components/common.components/loader.component';
import { TitleWithGoBack } from '../constants/Layout';
import { Band } from '../constants/types';
import { getUserBandsById } from '../services/api-calls';
import { GlobalContext } from '../services/store';
import { Error } from './erorr.page';

export default function ManageBands() {
  const { setBand, band, user } = useContext(GlobalContext);
  const {
    data,
    error,
    status,
  }: { data: Band[] | undefined; error: { message: string } | null; status: string } = useQuery(
    ['userBands', user.id],
    () => getUserBandsById(user.id)
  );

  const navigate = useNavigate();

  return (
    <Container>
      <TitleWithGoBack title={'Bands'} addLinkTitle="link-to-new-band" addLink="/bands/new" />
      <div className="flex flex-col w-full h-full justify-start mt-7 px-5">
        {status === 'loading' ? (
          <Loader />
        ) : status === 'error' ? (
          <Error message={error!.message} />
        ) : data && data.length > 0 ? (
          data.map((_band: Band) => (
            <button
              key={nanoid(5)}
              data-cy={`link-to-${_band.name}-account`}
              onClick={() => {
                setBand(_band);
                navigate('/account');
              }}
              className="md:flex-wrap md:flex-row text-xl w-full md:h-16 p-3 rounded-xl my-1 cursor-pointer dark:hover:bg-main-dark-2 hover:bg-main-2 overflow-hidden items-center flex">
              {_band.picture ? (
                <img
                  src={_band.picture}
                  alt="band-pic"
                  className="w-10 h-10 overflow-hidden object-cover rounded-full mr-3 "
                />
              ) : (
                <div className="flex justify-center w-10 h-10 rounded-full bg-main-2 dark:bg-main-dark-2 mr-3 items-center">
                  <MdMusicNote className="  " />
                </div>
              )}

              <h1>{_band.name}</h1>
              <p className="ml-3 text-xs font-medium">{_band === band && 'Current'}</p>
              <div className="ml-auto text-3xl">
                <Link
                  onClick={(e: any) => e.stopPropagation()}
                  data-cy="link-to-edit-band"
                  to={`/bands/${_band.id}/edit`}>
                  <MdSettings />
                </Link>
              </div>
            </button>
          ))
        ) : (
          <>No Bands</>
        )}
      </div>
    </Container>
  );
}
