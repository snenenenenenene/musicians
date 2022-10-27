import React, { useContext } from 'react';
import { MdHomeFilled, MdLibraryMusic, MdPerson, MdSettings } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../services/store';
import { Player } from '../music-player.components/music-player-widget.component';
import Logo from '../../assets/icon.svg';

const NavbarItem = ({
  icon,
  link,
  title,
  smallDisplayVisibility = true,
}: {
  icon: any;
  link: string;
  title: string;
  smallDisplayVisibility?: boolean;
}) => {
  return (
    <div
      className={`${
        smallDisplayVisibility ? 'flex' : 'hidden md:flex'
      } w-full md:h-12 md:mb-2 justify-center md:justify-start`}>
      <NavLink
        data-cy={`navbar-item-${title}`}
        to={link}
        className={({ isActive }) =>
          isActive ? 'text-main-dark-1 dark:text-main-1' : 'text-main-cross'
        }>
        <div className="flex flex-col md:flex-row justify-center  items-center h-full">
          <div className="md:mr-4 w-full text-3xl md:text-2xl">{icon}</div>
          <p className={`md:w-2/3 font-medium hidden md:flex pt-1`}>{title}</p>
        </div>
      </NavLink>
    </div>
  );
};

const Navbar = () => {
  const { user, jwt, currentSong } = useContext(GlobalContext);

  return (
    <>
      <nav
        className={`flex md:p-10 z-30 w-full md:w-72 md:h-full ${
          currentSong ? 'h-40 items-end' : 'h-20'
        } md:top-0 bottom-0 md:m-0 fixed items-start md:border-r sm:bg-main-1 sm:dark:bg-main-dark-1 bg-gradient-to-t from-main-1 to-main-1-transparent dark:from-main-dark-1 dark:to-main-dark-1-transparent backdrop-filter backdrop-blur-lg sm:backdrop-filter-none md:border-main-border md:dark:border-main-dark-1`}>
        <Player />
        <div className="flex md:flex-col h-20 sm:h-full w-full text-main-important-text   md:mx-0 sm:px-20 px-10 md:px-0 sm:py-1">
          <div
            className={`text-xl font-bold md:flex hidden mb-5 text-main-dark-1 dark:text-main-1`}>
            <img src={Logo} loading={'lazy'} className="w-6 h-6 mr-1 object-cover" alt="logo" />
            Musicians
          </div>
          <NavbarItem icon={<MdHomeFilled />} link="/" title="Home" />
          {jwt ? (
            <>
              {jwt !== null && user ? (
                user.roleName === 'Musician' ? (
                  <>
                    <NavbarItem icon={<MdLibraryMusic />} link="/user" title="Library" />
                    <NavbarItem icon={<MdPerson />} link="/account" title="Band" />
                  </>
                ) : (
                  <NavbarItem icon={<MdLibraryMusic />} link="/account" title="Library" />
                )
              ) : null}
            </>
          ) : (
            <NavbarItem icon={<MdPerson />} link="/login" title="Login" />
          )}
          <NavbarItem
            icon={<MdSettings />}
            smallDisplayVisibility={false}
            link="/settings"
            title="Settings"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
