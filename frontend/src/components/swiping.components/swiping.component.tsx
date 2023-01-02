import { createRef, useContext, useMemo, useRef, useState } from 'react';
import { FiMusic } from 'react-icons/fi';
import { IoMdHeart } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TinderCard from 'react-tinder-card';

import { Product } from '../../constants/types';
import { Error } from '../../pages/erorr.page';
import { getProducts, likeProduct, unlikeProduct } from '../../services/api-calls';
import { GlobalContext } from '../../services/store';
import { Loader } from '../common.components/loader.component';
import { Track } from '../common.components/track.component';
import ReactPlayer from 'react-player';

export const Swiping = ({ currUserId }: { currUserId: number }) => {
  const { data, error, status }: any = useQuery('products', getProducts);
  const [currentIndex, setCurrentIndex] = useState(data ? data!.length - 1 : 0);
  const [lastDirection, setLastDirection] = useState('');
  const currentIndexRef = useRef(currentIndex);

  const { user, setCurrentSong, handlePlay } = useContext(GlobalContext);

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

  const childRefs: any = useMemo(
    () =>
      Array(data?.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < data?.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, product: Product, index: any) => {
    if (direction === 'right') {
      likeMutation.mutate(product.id!);
    } else if (direction === 'left') {
      unlikeMutation.mutate(product.id!);
    }
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: any, idx: any) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    console.log(dir);
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="bg-main-2 dark:bg-main-dark-2 shadow justify-center align-middle md:w-1/3 w-full h-full flex relative">
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error.message} />
      ) : !data ? (
        <h1 className="">No Users Left</h1>
      ) : (
        data.length > 0 &&
        data.map((product: Product, index: number) => {
          return (
            <TinderCard
              ref={childRefs[index]}
              className="absolute cursor-pointer dark:text-main-1 text-main-text flex h-full w-full dark:bg-main-dark-1"
              onSwipe={(dir) => swiped(dir, product, index)}
              onCardLeftScreen={() => outOfFrame(product.name, index)}>
              <div className="rounded-3xl relative shadow w-full flex flex-col overflow-hidden bg-main-2 dark:bg-main-dark-2">
                {product.audio && product?.fileType === 'video/mp4' ? (
                  <div className="h-full w-full flex bg-main-dark-1">
                    <ReactPlayer
                      url={product.audio}
                      width="100%"
                      height="100%"
                      volume={0}
                      className="w-full object-cover"
                      controls={false}
                      playing={currentIndex === index ? true : false}
                      onStart={() => {
                        if (currentIndex === index) {
                          setCurrentSong(product);
                          handlePlay();
                        }
                      }}
                    />
                  </div>
                ) : product.picture ? (
                  <>
                    <ReactPlayer
                      url={product.audio}
                      height={0}
                      width={0}
                      volume={0}
                      className="w-full object-cover"
                      controls={false}
                      playing={currentIndex === index ? true : false}
                      onStart={() => {
                        if (currentIndex === index) {
                          setCurrentSong(product);
                          handlePlay();
                        }
                      }}
                    />
                    <img
                      src={product.picture}
                      alt="ART"
                      className=" object-cover h-full overflow-hidden"
                    />
                  </>
                ) : (
                  <div className="h-full w-full flex justify-center bg-main-1 dark:bg-main-dark-1 dark:bg-main-dark-1 items-center">
                    <FiMusic className="text-5xl" />
                  </div>
                )}
                <section className="p-3 h-52 bg-main-2 dark:bg-main-dark-2 w-full">
                  <Track userId={currUserId} item={product} />
                </section>
              </div>
            </TinderCard>
          );
        })
      )}
      <section className="absolute bottom-5 flex space-x-40">
        <button
          data-cy="swipe-left"
          onClick={() => swipe('left')}
          className="rounded-full relative lg:text-5xl text-4xl flex justify-center items-center xl:w-20 xl:h-20 lg:h-18 lg:w-18 h-14 w-14 dark:bg-main-dark-1 z-40 dark:text-main-1 bg-main-1 shadow-lg ">
          <MdClose />
        </button>
        <button
          data-cy="swipe-right"
          onClick={() => swipe('right')}
          className="rounded-full relative lg:text-5xl text-4xl flex justify-center z-40 items-center xl:w-20 xl:h-20 lg:h-18 lg:w-18 h-14 w-14 dark:bg-main-dark-1 dark:text-main-1 bg-main-1 shadow-lg ">
          <IoMdHeart />
        </button>
      </section>
    </div>
  );
};
