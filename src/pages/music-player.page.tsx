import 'rc-slider/assets/index.css';

import React, { useContext } from 'react';
import { MdMusicNote } from 'react-icons/md';

import ReactPlayer from 'react-player';
import Container from '../components/common.components/container.component';
import { FlexCol } from '../constants/Layout';
import { convertSecondsToHHMMSS } from '../services/helpers';
import { GlobalContext } from '../services/store';

export const MusicPlayer = () => {
  const { currentSong, duration, played, playedSeconds, handleSeekChange } =
    useContext(GlobalContext);

  return currentSong !== null ? (
    <Container className={`items-center h-full  px-5`}>
      <div className="flex flex-col xl:w-6/12 lg:w-9/12 w-96">
        <FlexCol className="items-center">
          <div className="object-cover justify-center items-center flex rounded-3xl text-main-dark-1 bg-main-dark-1 w-96 dark:text-main-1 overflow-hidden md:w-full aspect-w-1 aspect-h-1">
            {currentSong.audio && currentSong?.fileType === 'video/mp4' ? (
              <div className="h-full w-full flex bg-main-dark-1">
                <ReactPlayer
                  url={currentSong.audio}
                  width="100%"
                  height="100%"
                  playing={true}
                  volume={0}
                  className="w-full object-cover"
                />
              </div>
            ) : currentSong.picture ? (
              <>
                <ReactPlayer
                  url={currentSong.audio}
                  height={0}
                  width={0}
                  volume={0}
                  className="w-full object-cover"
                  controls={false}
                />
                <img
                  src={currentSong.picture}
                  alt="ART"
                  className=" object-cover h-full overflow-hidden"
                />
              </>
            ) : (
              <div className="h-full w-full flex justify-center bg-main-1 dark:bg-main-dark-1 items-center">
                <MdMusicNote className="text-5xl" />
              </div>
            )}
          </div>
          <FlexCol className="w-full py-4">
            <p className="text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
              <p>{currentSong?.name}</p>
            </p>
            <p className="text-main-important-text dark:text-main-dark-text text-base sm:text-lg lg:text-base xl:text-lg font-medium">
              {currentSong?.band.name}
            </p>
          </FlexCol>
        </FlexCol>

        <div className="sm:hidden flex justify-between w-full text-sm font-medium">
          {played ? <div>{convertSecondsToHHMMSS(playedSeconds)}</div> : <div>00:00</div>}
          <input
            className="mx-2"
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
          />
          {duration ? <div>{convertSecondsToHHMMSS(duration)}</div> : <div>00:00</div>}
        </div>
      </div>
    </Container>
  ) : null;
};
