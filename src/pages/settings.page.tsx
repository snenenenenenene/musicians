import React, { useContext } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { MdAttachMoney, MdAutoGraph, MdMusicNote, MdPerson, MdPersonAdd } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import Container from '../components/common.components/container.component';
import { TitleWithGoBack } from '../constants/Layout';
import { GlobalContext } from '../services/store';
import { ThemeContext } from '../services/theme-provider';

export default function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setJwt, setUser, user, jwt, setBand, setCurrentSong } = useContext(GlobalContext);

  const SettingEntry = ({ link, title, icon }) => {
    return (
      <Link data-cy={`link-to-${title}`} to={link}>
        <div
          className="w-full md:h-16 p-3 rounded-3xl my-1 cursor-pointer hover:bg-main-2 dark:hover:bg-main-dark-2 overflow-hidden items-center flex "
          cy-data={`link-to-${title}`}>
          {icon}
          <h1 className="p-3">{title}</h1>
        </div>
      </Link>
    );
  };

  const DarkModeToggleSwitch = () => (
    <div className="w-full md:h-16 p-3 rounded-3xl my-1 cursor-pointer hover:bg-main-2 dark:hover:bg-main-dark-2 overflow-hidden items-center flex ">
      {theme === 'dark' ? <IoMdMoon /> : <IoMdSunny />}
      <h1 className="p-3">Dark Mode</h1>
      {/* @ts-ignore ts(2786) */}
      <Switch
        cy-data="toggle-dark-mode"
        className="ml-auto"
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        checked={theme === 'dark' ? true : false}
      />
    </div>
  );

  const LogoutButton = () => {
    const navigate = useNavigate();

    return (
      <div
        className="w-full md:h-16 p-3 rounded-3xl my-1 cursor-pointer dark:hover:bg-main-dark-2 hover:bg-main-2 overflow-hidden items-center flex "
        cy-data="logout-button"
        onClick={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('currentBand');
          setJwt(null);
          setCurrentSong(null);
          setUser(null);
          setBand({ id: -1, name: 'NO_BAND' });
          navigate('/login');
        }}>
        <MdPerson />
        <h1 className="p-3">Log Out</h1>
      </div>
    );
  };

  return (
    <Container>
      <TitleWithGoBack title={'Settings'} />
      <section className="mt-7">
        <DarkModeToggleSwitch />
        {jwt ? (
          <>
            <SettingEntry title={'Transactions'} icon={<MdAttachMoney />} link={'/transactions'} />
            {user.roleName === 'Musician' ? (
              <>
                <SettingEntry
                  title={'Manage Bands'}
                  icon={<MdPersonAdd />}
                  link={'/manage-bands'}
                />
                <SettingEntry title={'Analytics'} icon={<MdAutoGraph />} link={'/analytics'} />
              </>
            ) : (
              <>
                <SettingEntry
                  title={'Become Musician'}
                  icon={<MdMusicNote />}
                  link={'/become-musician'}
                />
              </>
            )}
            <LogoutButton />
          </>
        ) : null}
      </section>
    </Container>
  );
}
