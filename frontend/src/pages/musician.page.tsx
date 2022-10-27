import React, { useContext, useEffect, useState } from 'react';
import { FaCross, FaPlus } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdMicrophone } from 'react-icons/io';
import { MdAdd, MdClose, MdMenu, MdPerson } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import BandGoals from '../components/band.components/band-goals.component';
import BandProducts from '../components/band.components/band-products.component';
import { AddButton } from '../components/common.components/button.component';
import { BecomeGroupieModal } from '../components/modal.components/become-groupie.modal.component';
import { Loader } from '../components/common.components/loader.component';
import Container from '../components/common.components/container.component';
import Flex, { FlexCol } from '../constants/Layout';
import { becomeFanOfBandWithId, getBandById, getUserBandsById } from '../services/api-calls';
import { GlobalContext } from '../services/store';
import { Error } from './erorr.page';
import { Band } from '../constants/types';
import { nanoid } from 'nanoid';

export const Musician = ({ ownAccount = true }: { ownAccount?: boolean }) => {
  const navigate = useNavigate();
  const { user, band, setBand } = useContext(GlobalContext);
  const params = useParams();
  const [changeBandsMenu, setChangeBandsMenu] = useState('-top-full');

  const { data, error, status }: any = useQuery(['bands', band], () =>
    getBandById(band.id || params.id)
  );

  useEffect(() => {
    if (ownAccount) setBand((band) => band);
    else band.id = params.id;
    if (band.id === -1) {
      navigate('/manage-bands');
    }
  }, [band, ownAccount, setBand, params.id, navigate]);

  return (
    <Container className="min-h-screen h-auto">
      <div className="flex justify-between">
        {ownAccount ? (
          <button
            className="mr-auto xs:mb-6 mb-2"
            onClick={() => {
              if (changeBandsMenu === '-top-full') setChangeBandsMenu('');
              else setChangeBandsMenu('-top-full');
            }}>
            <h1 className="text-xl flex items-center">
              {data?.name !== undefined ? data.name : user.name}&nbsp;
              <IoMdArrowDropdown className="text-3xl" />
            </h1>
          </button>
        ) : (
          <div className="mr-auto xs:mb-6 mb-2">
            <h1 className="text-xl flex items-center">
              {data?.name !== undefined ? data.name : 'Band'}
            </h1>
          </div>
        )}

        <div className="xs:top-5 top-0 md:hidden block xs:mb-4 xs:p-2 items-center rounded-xl hover:bg-main-1 dark:hover:bg-main-dark-1 text-2xl md:invisible">
          <Link to="/settings">
            <MdMenu />
          </Link>
        </div>
      </div>

      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error.message} />
      ) : (
        <FlexCol className="md:flex md:pb-0">
          <Flex className="flex items-center sm:items-end sm:justify-between flex-col sm:flex-row w-full h-auto mb-10 md:h-full">
            <div className="bg-main-dark-1 text-main-text overflow-hidden relative w-full flex justify-center h-80">
              {data.picture ? (
                <img
                  src={data.picture}
                  className="w-full filter brightness-50 h-full object-cover"
                  alt="profile pic"
                />
              ) : (
                <div className="flex justify-center items-center">
                  <IoMdMicrophone className="text-9xl text-main-1" />
                </div>
              )}
              <FollowersDisplay currUserId={user.id} ownAccount={ownAccount} band={data} />
            </div>
          </Flex>
          <div className="flex w-full md:h-full">
            {/* CHECKING IF LOOKING AT OWN PAGE OR VISITING */}
            {ownAccount ? (
              <FlexCol className="w-full">
                <section className="flex flex-col md:mb-12 md:pb-12 border-b border-main-border pb-6 mb-6">
                  <Flex className="pb-7 flex justify-center items-center">
                    <h1 className="font-semibold text-2xl">Products</h1>
                    <h2 className="font-medium ml-4 text-base text-main-important-text">
                      <Link to="/products">view all</Link>
                    </h2>

                    <div className="ml-auto">
                      <Link data-cy="link-to-new-product" to="/products/new">
                        <AddButton onClick={() => {}} />
                      </Link>
                    </div>
                  </Flex>
                  <BandProducts currUserId={user.id} bandId={band.id} ownAccount={true} />
                </section>
                <section className="flex flex-col">
                  <Flex className="justify-center pb-7 items-center">
                    <h1 className="font-semibold text-2xl">Goals</h1>
                    <h2 className="font-medium ml-4 text-base text-main-important-text">
                      <Link to="/goals">view all</Link>
                    </h2>
                    <div className="ml-auto">
                      <Link data-cy="link-to-new-goal" to="/goals/new">
                        <AddButton onClick={() => {}} />
                      </Link>
                    </div>
                  </Flex>
                  <BandGoals />
                </section>
              </FlexCol>
            ) : (
              <FlexCol className="w-full">
                <section className="flex flex-col md:mb-12 md:pb-12 border-b border-main-border pb-6 mb-6">
                  <Flex className="pb-7 flex justify-start items-center">
                    <h1 className="font-semibold text-2xl">Products</h1>
                    <h2 className="font-medium ml-4 text-base text-main-important-text">
                      <Link to={`/bands/${band.id}/products`}>view all</Link>
                    </h2>
                  </Flex>
                  <BandProducts currUserId={user.id} ownAccount={ownAccount} bandId={band.id} />
                </section>
                <section className="flex flex-col">
                  <Flex className="justify-start pb-7 items-center">
                    <h1 className="font-semibold text-2xl">Goals</h1>
                    <h2 className="font-medium ml-4 text-base text-main-important-text">
                      <Link to={`/bands/${band.id}/goals`}>view all</Link>
                    </h2>
                  </Flex>
                  <BandGoals ownAccount={ownAccount} />
                </section>
              </FlexCol>
            )}
          </div>
        </FlexCol>
      )}
      <BottomBar changeBandsMenu={changeBandsMenu} />
    </Container>
  );
};

export const BottomBar = ({ changeBandsMenu, isMusician = true }: any) => {
  const { setBand, user } = useContext(GlobalContext);
  const {
    data,
    error,
    status,
  }: { data?: Band[]; error: { message: string } | null; status: string } = useQuery(
    ['bands'],
    () => getUserBandsById(user.id)
  );

  return (
    <div
      className={`bg-main-2 transition-all ease-in-out duration-200 dark:bg-main-dark-2 left-0 h-auto overflow-y-scroll max-h-64 z-50 justify-end flex flex-col w-screen shadow-lg p-5 fixed bottom-0 ${changeBandsMenu}`}>
      {isMusician ? (
        status === 'loading' ? (
          <Loader />
        ) : status === 'error' ? (
          <Error message={error!.message} />
        ) : (
          <>
            {data &&
              data.length > 0 &&
              data.map((_band) => (
                <button key={nanoid(5)} className="h-10" onClick={() => setBand(_band)}>
                  <div className="flex mb-4 p-2 items-center rounded-xl hover:bg-main-1 dark:hover:bg-main-dark-1">
                    <IoMdMicrophone />
                    <p className="mx-3 font-light">{_band.name}</p>
                  </div>
                </button>
              ))}
            <button className="h-10" onClick={() => {}}>
              <Link to={`/user`}>
                <div className="flex w-full h-full mb-4 p-2 items-center rounded-xl hover:bg-main-1 dark:hover:bg-main-dark-1">
                  <MdPerson />
                  <p className="mx-3 font-light">{user.name}</p>
                </div>
              </Link>
            </button>
          </>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export const FollowersDisplay = ({
  ownAccount = true,
  band,
  currUserId,
}: {
  ownAccount: boolean;
  band: Band;
  currUserId: number;
}) => {
  const [openGroupiesModal, SetOpenGroupiesModal] = useState(false);
  const queryClient = useQueryClient();
  const [fansVisibility, setFansVisibility] = useState(true);
  const [groupiesVisibility, setGroupiesVisibility] = useState(true);

  const becomeFanOfBandWithIdMutation = useMutation(
    () => becomeFanOfBandWithId(band.id!, currUserId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bands');
        setFansVisibility(false);
      },
    }
  );

  return (
    <div className="md:w-full px-5 text-main-1 absolute w-full h-24 m-5 flex justify-between ">
      <FlexCol className="relative w-auto items-center">
        <div className=" font-bold">{band?.fans ? band.fans : 0}</div> Fans
        {ownAccount && fansVisibility ? (
          <></>
        ) : (
          <button
            name="become-fan-button"
            id="become-fan-button"
            data-cy="become-fan-button"
            className={`absolute text-xs -right-4 ${
              fansVisibility ? 'bg-main-3' : 'bg-main-dark-1 dark:bg-main-1'
            } text-main-1 dark:text-main-dark-1 dark:bg-main-1 -top-2 w-4 h-4 rounded-full flex items-center justify-center`}
            onClick={() => {
              becomeFanOfBandWithIdMutation.mutate();
            }}>
            {fansVisibility ? <MdAdd /> : <MdClose />}
          </button>
        )}
      </FlexCol>
      <FlexCol className="relative w-auto items-center">
        <div className="font-bold">{band?.groupies ? band.groupies : 0}</div> Groupies
        {ownAccount && groupiesVisibility ? (
          <></>
        ) : (
          <button
            name="open-become-groupie-modal"
            data-cy="open-become-groupie-modal"
            id="open-become-groupie-modal"
            className={`absolute text-xs -right-0 ${
              groupiesVisibility ? 'bg-main-3' : 'bg-main-dark-1 dark:bg-main-1'
            } text-main-1 dark:text-main-dark-1 dark:bg-main-1 -top-2 w-4 h-4 rounded-full flex items-center justify-center`}
            onClick={() => {
              SetOpenGroupiesModal(!openGroupiesModal);
              setGroupiesVisibility(false);
            }}>
            <MdAdd />
          </button>
        )}
        <BecomeGroupieModal setOpen={SetOpenGroupiesModal} open={openGroupiesModal} band={band} />
      </FlexCol>
    </div>
  );
};
export default Musician;
