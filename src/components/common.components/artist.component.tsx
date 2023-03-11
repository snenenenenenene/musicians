import React, { useState } from 'react';
import { MdCheck, MdMusicNote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Band } from '../../constants/types';

export const Artist = ({
  className = '',
  band,
  artistScreen = false,
  ownAccount = false,
  currUserId,
}: {
  className?: string;
  band: Band;
  artistScreen?: boolean;
  ownAccount?: boolean;
  currUserId: number;
}) => {
  //   const queryClient = useQueryClient();
  //   const mutation = useMutation((bandId: number) => deleteBand(item?.id), {
  //     onSuccess: () => queryClient.invalidateQueries('bands'),
  //   });

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex w-full pr-4 items-center ${className}`}>
      <div className="w-14 h-14 mr-4 shadow flex justify-center items-center rounded-lg cursor-pointer backdrop-filter backdrop-brightness-100 hover:backdrop-brightness-50 overflow-hidden bg-main-dark-1">
        {band.picture ? <img src={band.picture} alt="ART" /> : <MdMusicNote className="text-3xl" />}
      </div>
      <div>
        <Link to={`/bands/${band?.id}`}>
          <h2 className=" text-sm font-medium hover:underline">
            {band?.name ? band.name : 'As it was'}
          </h2>
        </Link>
        <h1 className="font-normal text-xs text-main-important-text">
          {band?.location ? band.location : 'Band'}
        </h1>
      </div>
      <section className="ml-auto font-normal mr-4 text-xs text-main-important-text">
        {!isHovered ? (
          band.subscribedUserIds && band.subscribedUserIds.includes(currUserId) ? (
            // IF SUBSCRIBED
            <p>Subscribed</p>
          ) : band.followedUserIds && band.followedUserIds.includes(currUserId) ? (
            // IF FOLLOWED
            <p>Joined</p>
          ) : (
            // IF NOT FOLLOWED AND NOT SUBSCRIBED
            <p></p>
          )
        ) : null}
      </section>
    </div>
  );
};
