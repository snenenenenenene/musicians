import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-spring-bottom-sheet/dist/style.css';

import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Analytics from './pages/analytics.page';
import { SwipingModal } from './components/modal.components/swiping.modal.component';
import { TrackModal } from './components/modal.components/track.modal.component';
import Navbar from './components/common.components/navbar.component';
import { MusicPlayer } from './pages/music-player.page';

import {
  BecomeMusician,
  EditBand,
  GoalDonation,
  GoalsPage,
  Home,
  LikedSongs,
  Login,
  ManageBands,
  Musician,
  NewBand,
  NewGoal,
  NewProduct,
  Payment,
  Products,
  Register,
  Settings,
  Transactions,
  User,
} from './pages';
import { GlobalContext } from './services/store';
import { Fandoms } from './pages/fandoms.page';
import { UserProductsPage } from './pages/users-products.page';
import { GoalPayment } from './pages/goals-payment.page';
import ReactPlayer from 'react-player';
import { Bids } from './pages/bids.page';

export function App() {
  const {
    jwt,
    user,
    currentSong,
    handlePlay,
    handlePause,
    handleDuration,
    handleProgress,
    muted,
    playing,
    volume,
  } = useContext(GlobalContext);

  const handleKeyboard = ({ repeat, metaKey, ctrlKey, key }) => {
    if (repeat) return;

    // Handle both, `ctrl` and `meta`.
    if ((metaKey || ctrlKey) && key === 'p') alert('YAAAA');
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    // Important to remove the listeners.
    return () => document.removeEventListener('keydown', handleKeyboard);
  });

  return (
    <Router>
      <ReactPlayer
        url={currentSong?.audio}
        playing={playing}
        volume={volume}
        muted={muted}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={(e) => console.log('onSeek', e)}
        onError={(e) => console.log('onError', e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="0"
        height="0"
      />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<TrackModal />} />
        <Route path="/swipe" element={<SwipingModal />} />

        <Route path="/music" element={<MusicPlayer />} />
        <Route path="/bands/:id" element={<Musician ownAccount={false} />} />
        <Route path="/bands/:id/products" element={<Products ownAccount={false} />} />
        <Route path="/bands/:id/goals" element={<GoalsPage ownAccount={false} />} />

        <Route path="/bands/:id/products/:id" element={<TrackModal />} />

        <Route path="/payment/products/:id" element={<Payment />} />
        <Route path="/payment/goals/:id" element={<GoalPayment />} />
        <Route path="/payment/subscription/:id/amount/:amount" element={<Payment />} />

        <Route path="/bands/products/:id" element={<TrackModal />} />
        <Route path="/goal/:id/donate" element={<GoalDonation />} />
        <Route path="/bands/:id/goals/donate" element={<GoalDonation />} />
        <Route path="/bands/:id/products/:id" element={<TrackModal />} />
        <Route path="/settings" element={<Settings />} />
        {jwt ? (
          <>
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/likes" element={<LikedSongs />} />
          </>
        ) : null}

        {user?.roleName === 'Musician' || user?.userName === 'musician' ? (
          <>
            <Route path="/manage-bands" element={<ManageBands />} />
            <Route path="/bands/new" element={<NewBand />} />
            <Route path="bands/:id/edit" element={<EditBand />} />
            <Route path="/account" element={<Musician />} />
            <Route path="/user" element={<User />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/fandoms" element={<Fandoms />} />
            <Route path="/products/:id/open-bids" element={<Bids />} />
            <Route path="/products" element={<Products ownAccount={true} />} />
            <Route path="/products/:id" element={<TrackModal />} />
            <Route path="/goals/new" element={<NewGoal />} />
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/owned-products" element={<UserProductsPage />} />
            <Route path="/analytics" element={<Analytics />} />{' '}
          </>
        ) : user?.roleName === 'User' || user?.userName === 'user' ? (
          <>
            <Route path="/become-musician" element={<BecomeMusician />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<User />} />
            <Route path="/fandoms" element={<Fandoms />} />
            <Route path="/likes" element={<User />} />
            <Route path="/owned-products" element={<UserProductsPage />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}
export default App;
