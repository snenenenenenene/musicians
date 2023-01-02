import { useQuery } from 'react-query';
import { Artist } from '../common.components/artist.component';
import { Loader } from '../common.components/loader.component';
import { getBands } from '../../services/api-calls';
import { Error } from '../../pages/erorr.page';
import React, { useContext } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { MdClear } from 'react-icons/md';
import { ThemeContext } from '../../services/theme-provider';
import { Band } from '../../constants/types';
import { nanoid } from 'nanoid';
import { GlobalContext } from '../../services/store';

export const SearchComp = ({ onChange }: { onChange: (e: any) => any }) => {
  return (
    <div className="relative w-full text-gray-600 focus-within:text-gray-400 shadow-md rounded-2xl">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        onChange={onChange}
        type="search"
        name="q"
        className="block w-full py-2 ring-1 my-2 bg-main-1 focus:bg-main-2 pl-12 ring-main-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-main-dark-1 focus:border-main-dark-1"
        placeholder="Search..."
        autoComplete="off"
      />
    </div>
  );
};

export default function SearchModal({
  open = false,
  setOpen = () => {},
}: {
  open: boolean;
  setOpen: any;
}) {
  const { user } = useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = React.useState('');

  const {
    data,
    error,
    status,
  }: { data?: Band[]; error: { message: string } | null; status: string } = useQuery(
    'bands',
    getBands
  );

  const onDismiss = () => {
    setOpen(!open);
  };
  const { theme } = useContext(ThemeContext);
  return (
    <BottomSheet
      style={{
        // @ts-ignore
        '--rsbs-bg': theme === 'light' ? '#fff' : '#000',
        '--rsbs-handle-bg': theme === 'light' ? '#000' : '#FFF',
      }}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
      className="z-50 relative"
      open={open}>
      <button
        onClick={() => onDismiss()}
        className="absolute md:flex p-2 items-center rounded-xl text-2xl text-main-dark-1 dark:text-main-1 hidden left-5 z-10 top-5">
        <MdClear />
      </button>
      <div className="min-h-screen px-5 pt-10 dark:text-main-1">
        <SearchComp onChange={(e) => setSearchQuery(e.target.value)} />
        <div className="flex w-full h-full justify-start mt-3">
          {status === 'loading' ? (
            <Loader />
          ) : status === 'error' ? (
            <Error message={error!.message} />
          ) : (
            <div className="w-full grid sm:grid-cols-2 space-y-4 grid-cols-1">
              {data &&
                data.length > 0 &&
                data.map((band) => (
                  <Artist
                    currUserId={user?.id}
                    band={band}
                    key={nanoid(5)}
                    className={
                      band.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ? 'flex'
                        : 'hidden'
                    }
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
