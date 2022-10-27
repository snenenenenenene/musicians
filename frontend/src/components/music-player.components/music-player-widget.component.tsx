import React, { useContext, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty, IoMdVolumeHigh } from 'react-icons/io';
import { MdMusicNote, MdPause, MdPlayArrow, MdVolumeMute } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { likeProduct, unlikeProduct } from '../../services/api-calls';
import { convertSecondsToHHMMSS } from '../../services/helpers';
import { GlobalContext } from '../../services/store';
import Button from '../common.components/button.component';
export const Player = () => {
  const {
    currentSong,
    setCurrentSong,
    volume,
    setVolume,
    user,
    handleToggleMuted,
    muted,
    duration,
    setMuted,
    played,
    setPlayed,
    playing,
    playedSeconds,
    setPlaying,
    handlePlay,
    handlePause,
    handleSeekChange,
    handleProgress,
    handlePlayPause,
    handleVolumeChange,
    handleDuration,
  } = useContext(GlobalContext);

  const queryClient = useQueryClient();

  const likeMutation = useMutation((productId: number) => likeProduct(productId, user?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
  const navigate = useNavigate();

  const unlikeMutation = useMutation((productId: number) => unlikeProduct(productId, user?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const [liked, setLiked] = useState(
    currentSong?.likedBy && currentSong?.likedBy.includes(user?.id)
  );

  const handleLike = () => {
    setLiked(!liked);
  };

  return currentSong ? (
    <div className="fixed sm:mx-0 text-main-1 dark:text-main-1 md:flex items-center px-2 sm:px-0 sm:bottom-0 bottom-20 sm:dark:bg-main-dark-1 w-full sm:h-24 h-20 sm:rounded-none filter drop-shadow-2xl sm:justify-start justify-center flex left-0  z-50">
      <div
        onClick={() => navigate('/music')}
        className="flex bg-main-dark-1 rounded-xl w-full pr-8 h-full sm:rounded-none items-center">
        <section className="flex w-full md:w-1/3">
          <div className="h-full flex w-full pr-2 shadow justify-start ml-2 sm:items-center items-start mr-3 cursor-pointer overflow-hidden">
            <div className="w-16 h-16 mr-3">
              {currentSong?.picture ? (
                <img
                  loading="lazy"
                  alt="ART"
                  className="h-16 w-16 rounded-lg object-cover"
                  src={currentSong.picture}
                />
              ) : (
                <MdMusicNote className="text-3xl" />
              )}
            </div>
            <div className="w-1/2">
              <h2 className=" text-sm font-medium overflow-ellipsis text-main-1 ">
                {currentSong?.name ? currentSong.name : 'As it was'}
              </h2>
              <h1 className=" font-normal text-xs sm:text-main-2 text-main-2 ">
                {currentSong?.band.name ? currentSong.band.name : 'Harry Styles'}
              </h1>
            </div>
          </div>

          <div className="flex sm:w-40 sm:mr-0 mr-2 sm:mx-8 sm:justify-around text-4xl sm:px-10 md:px-0 items-center ml-auto">
            <button
              className="mx-auto rounded-full flex justify-center items-center p-2 sm:border-2 border-main-border"
              onClick={handlePlayPause}
              cy-data="music-widget-play-pause-product">
              {playing ? <MdPause /> : <MdPlayArrow />}
            </button>
          </div>
        </section>

        <section className="items-center hidden sm:flex justify-center w-5/12 px-4 mx-auto">
          {played ? (
            <div className="w-14">{convertSecondsToHHMMSS(playedSeconds)}</div>
          ) : (
            <div>00:00</div>
          )}
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
            className="mx-4 w-full"
          />
          {duration ? (
            <div className="w-14">{convertSecondsToHHMMSS(duration)}</div>
          ) : (
            <div>00:00</div>
          )}
        </section>
        <section className="flex sm:w-1/4 justify-end items-center">
          <button
            className="relative mr-1 text-3xl hidden md:flex"
            onClick={(e) => e.stopPropagation()}>
            {muted ? (
              <span title="Unmute" onClick={handleToggleMuted}>
                <MdVolumeMute />
              </span>
            ) : (
              <span title="Mute" onClick={handleToggleMuted}>
                <IoMdVolumeHigh />
              </span>
            )}
          </button>
          <section className={`text-3xl px-3 hidden sm:flex `}>
            {liked ? (
              <button
                className={`${liked && 'text-main-3'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                  unlikeMutation.mutate(currentSong.id!);
                }}>
                <IoMdHeart />
              </button>
            ) : (
              <button
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                  likeMutation.mutate(currentSong.id!);
                }}>
                <IoMdHeartEmpty />
              </button>
            )}
          </section>
          <Link to={`/payment/products/${currentSong?.id}`}>
            <Button
              name="music-player-link-to-product-payment"
              className="xs:w-20 w-20 h-20text-xs xs:text-md"
              onClick={(e) => e.stopPropagation()}>
              €&nbsp;{currentSong?.price ? currentSong.price : 89}
            </Button>
          </Link>
        </section>
      </div>
    </div>
  ) : null;
};
