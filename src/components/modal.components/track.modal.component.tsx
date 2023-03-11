import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { MdClear, MdMusicNote, MdPause, MdPlayArrow } from 'react-icons/md';
import { IoMdHeart, IoMdHeartEmpty, IoMdWallet } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById, likeProduct, unlikeProduct } from '../../services/api-calls';
import Button from '../common.components/button.component';
import { FaChevronDown, FaChevronRight, FaEthereum } from 'react-icons/fa';
import { Product } from '../../constants/types';
import { GlobalContext } from '../../services/store';
import { Loader } from '../common.components/loader.component';
import { Error } from '../../pages/erorr.page';

export const TrackModal = () => {
  const { user, setCurrentSong, currentSong, playing, handlePlay, handlePlayPause } =
    useContext(GlobalContext);

  const params = useParams();
  const productId = Number(params.id);
  const navigate = useNavigate();
  const {
    data,
    error,
    status,
  }: {
    data: Product | undefined;
    error: any;
    status: string;
  } = useQuery(['products', productId], () => getProductById(productId));

  const queryClient = useQueryClient();
  const likeMutation = useMutation((productId: number) => likeProduct(productId, user?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const unlikeMutation = useMutation((productId: number) => unlikeProduct(productId, user?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  return status === 'loading' ? (
    <Loader />
  ) : status === 'error' ? (
    <Error message={error.message} />
  ) : data ? (
    <div
      onClick={(e) => navigate(-1)}
      className="modal-background h-screen w-screen fixed z-40 flex bg-main-1-transparent dark:bg-main-dark-1-transparent justify-end">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        animate={{ x: 0, transition: { duration: 0.2 } }}
        initial={{ x: '100%' }}
        exit={{ x: '100%', transition: { duration: 0.2 } }}
        className="lg:w-1/2 xl:w-1/3 md:w-3/4 z-50 relative w-full h-full overflow-y-scroll flex flex-col text-main-dark-1 shadow-2xl  dark:text-main-1 bg-main-1 dark:bg-main-dark-1">
        <button
          className="absolute z-50 rounded-full bg-main-1 cursor-pointer shadow-xl w-10 h-10 right-10 top-10 flex mb-4 p-2 items-center hover:bg-main-1 dark:bg-main-dark-1 dark:hover:bg-main-dark-1 text-2xl"
          onClick={() => navigate(-1)}>
          <MdClear />
        </button>
        <header className="bg-main-2 dark:bg-main-dark-2 mb-10 h-64 p-10 flex justify-between">
          <div className="h-full my-auto mr-3 flex justify-center rounded-lg bg-main-1 shadow-lg items-center overflow-hidden">
            {data?.picture !== '' ? (
              <img src={data?.picture} className="h-48 w-48 object-cover" alt="" />
            ) : (
              <MdMusicNote className="text-3xl" />
            )}
          </div>
          <div className="w-7/12 flex flex-col">
            <span className="text-main-important-text font-normal after:content-['_↗'] truncate overflow-hidden">
              <Link
                data-cy={`link-to-${data?.band?.name}-on-track`}
                to={`/bands/${data?.band?.id}`}>
                {data?.band ? data.band.name : 'Band'}
              </Link>
            </span>
            <h2 className="font-semibold text-xl w-10/12 overflow-hidden max-h-20">
              {data?.name ? data.name : 'Product'}
            </h2>
            <span className="text-main-important-text font-normal text-sm">
              {data?.releaseDate ? data.releaseDate : '2022'}&nbsp;•&nbsp;
              {data?.type ? data.type : 'Sound'}
            </span>
            <div className="w-full flex mt-auto">
              <Button
                name="play-song"
                onClick={() => {
                  if (currentSong === data) {
                    handlePlayPause();
                  } else {
                    setCurrentSong(data);
                    handlePlay();
                  }
                }}
                className="w-1/2 mr-3">
                <span className="flex justify-center items-center">
                  {currentSong === data && playing ? (
                    <>
                      <MdPause className="text-3xl" />
                      <p className="w-14">&nbsp;Pause</p>
                    </>
                  ) : (
                    <>
                      <MdPlayArrow className="text-3xl" />
                      <p className="w-14">&nbsp;Play</p>
                    </>
                  )}
                </span>
              </Button>
              {data && user?.id !== -1 ? (
                data?.likedBy && data?.likedBy.includes(user?.id) ? (
                  <button
                    data-cy="track-modal-unlike-product-button"
                    className="text-main-3 text-4xl"
                    onClick={() => unlikeMutation.mutate(data.id!)}>
                    <IoMdHeart />
                  </button>
                ) : (
                  <button
                    className="text-4xl"
                    onClick={() => likeMutation.mutate(data.id!)}
                    data-cy="-track-modal-like-product-button">
                    <IoMdHeartEmpty />
                  </button>
                )
              ) : null}
            </div>
          </div>
        </header>
        <section className="px-10 w-full flex flex-col h-full">
          <ModalSection title="Description">
            <>
              <span className="flex flex-col text-main-important-text font-normal">
                <span className="flex">
                  <p>Created by&nbsp;</p>
                  <div className="text-main-3 font-medium">
                    <Link
                      data-cy={`link-to-${data?.band?.name}-on-track`}
                      to={`/bands/${data?.band?.id}`}>
                      {data?.band ? data.band.name : <>Band</>}
                    </Link>
                  </div>
                </span>
                <span className="flex">
                  <p>Owned by &nbsp;</p>
                  <div className="text-main-3 font-medium">
                    {data?.ownedByUserName ? data.ownedByUserName : <>User</>}
                  </div>
                </span>
                {data?.description ? <div>{data.description}</div> : null}
              </span>
            </>
          </ModalSection>

          {data?.bids && data.bids.length > 0 && (
            <ModalSection title="Bids">
              <span className="flex flex-col">
                {data.bids
                  .sort((a, b) => b.amount - a.amount)
                  .map((bid) => (
                    <div className="flex w-full">
                      <p className="w-full overflow-hidden font-medium">
                        {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                          bid.amount
                        )}
                      </p>
                      <p className="w-20 overflow-hidden text-main-text font-normal">
                        {bid.user.name}
                      </p>
                    </div>
                  ))}
              </span>
            </ModalSection>
          )}

          <span className="mt-auto w-full flex flex-col mb-10">
            <section className="flex w-full justify-between">
              <span className="flex justify-between">
                <h2 className="font-medium text-main-important-text mb-4">Starting Price</h2>
              </span>
              <span className="flex items-center text-xl mb-5">
                <p>
                  {data?.price
                    ? Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                        data.price
                      )
                    : 100}
                </p>
                <span className="flex text-main-important-text items-center text-sm">
                  &nbsp;(
                  <FaEthereum />
                  <p>{data?.price ? (data.price * 0.66).toFixed(2) : (100 * 0.66).toFixed(2)}</p>)
                </span>
              </span>
            </section>
            <Button name="place-bid" className="flex w-full justify-center items-center h-20">
              <Link to={`/payment/products/${data?.id}`}>
                <span className="w-full h-full flex justify-center items-center">
                  <IoMdWallet className="text-xl" />
                  &nbsp; Place Bid
                </span>
              </Link>
            </Button>
          </span>
        </section>
      </motion.div>
    </div>
  ) : null;
};

const ModalSection = ({ children, title = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-5 flex flex-col">
      <span className="flex justify-between">
        <h1 className="font-semibold text-xl mb-4">{title}</h1>
        <button cy-data="track-modal-show-hide-description" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronDown /> : <FaChevronRight />}
        </button>
      </span>
      <div className={`${isOpen ? 'block h-auto max-h-48 overflow-y-scroll' : 'hidden'}`}>
        {children}
      </div>
    </section>
  );
};
