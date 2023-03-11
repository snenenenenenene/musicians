import React, { createContext, useEffect, useRef, useState } from 'react';
import { Band, Product, User } from '../constants/types';

// const initialSong: Product = {
//   id: 3,
//   name: 'Love, Death, Distraction',
//   price: 100,
//   bandId: 1,
//   band: {
//     id: 1,
//     name: 'Gengahr',
//     location: 'Liverpool',
//     fans: 100,
//     groupies: 200,
//   },
//   user: null,
//   releaseDate: '2022-01-01',
//   likes: 100,
//   type: 'Rock',
//   audio: 'http://docs.google.com/uc?export=open&id=13_ydPWNqShxZgLO3MFpWBVBxGiSybtyR',
//   picture: 'https://i1.sndcdn.com/artworks-000647865616-edshyi-t500x500.jpg',
//   likedBy: [],
// };

export const GlobalContext = createContext<any>(null);

export const Store = ({ children }: { children: any }) => {
  const [currentSong, setCurrentSong] = useState<Product | null>(null);

  const [user, setUser] = useState<User | { id: number; roleName: string; name: string }>({
    id: -1,
    roleName: 'Visitor',
    name: 'Visitor',
  });

  const [jwt, setJwt] = useState<string | null>();
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(false);

  const [band, setBand] = useState<Band | { id: -1; name: string }>({ id: -1, name: 'NO_BAND' });
  const [volume, setVolume] = useState(1.0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleToggleMuted = () => {
    setMuted(!muted);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };
  const handleProgress = (e) => {
    setPlayedSeconds(e.playedSeconds);
    setPlayed(e.played);
  };

  useEffect(() => {
    if (localStorage.getItem('currentBand') && band.id === -1) {
      setBand(JSON.parse(localStorage.getItem('currentBand')!));
      return;
    }
    if (band && band.id !== -1) {
      localStorage.setItem('currentBand', JSON.stringify(band));
      console.log(`Changed band to ${band.name}`);
    }
  }, [band]);

  useEffect(() => {
    if (localStorage.getItem('user') && user.id === -1) {
      setUser(JSON.parse(localStorage.getItem('user')!));
      setJwt('token');
      return;
    }
    if (user && user.id !== -1) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log(`Changed user to ${user.name}`);
      return;
    }
  }, [user]);

  const player = useRef<any>();

  return (
    <GlobalContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        volume,
        setVolume,
        muted,
        setMuted,
        player,
        played,
        setPlayed,
        playedSeconds,
        playing,
        setPlaying,
        duration,
        setDuration,
        user,
        setUser,
        jwt,
        setJwt,
        band,
        setBand,
        handlePlay,
        handlePause,
        handleSeekChange,
        handlePlayPause,
        handleToggleMuted,
        handleProgress,
        handleDuration,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Store;
