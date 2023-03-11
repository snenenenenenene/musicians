import React from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { MdAdd, MdPlayArrow } from 'react-icons/md';

const Button = ({
  name,
  className,
  children,
  onClick,
  type,
}: {
  name: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: (e?: any) => any;
  type?: any;
}) => {
  return (
    <button
      className={`font-medium bg-main-dark-1 dark:bg-main-1 hover:opacity-80 rounded-3xl text-main-2 dark:text-main-dark-2 py-2 px-4 ${className}`}
      data-cy={name}
      name={name}
      id={name}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
};

export const LikeButton = ({ liked = false, onClick, className = '' }) => {
  return (
    <button
      className={`bg-transparent ${className} p-2 border-2 border-main-border rounded-full flex justify-center items-center text-main-dark-1 dark:text-main-1 py-2 text-3xl w-12 h-12`}
      onClick={onClick}>
      {liked ? <IoMdHeart className="text-main-3" /> : <IoMdHeartEmpty />}
    </button>
  );
};

export const PlayButton = ({ onClick, className = '' }) => {
  return (
    <button
      className={`bg-transparent border ${className} shadow rounded-full flex justify-center items-center text-main-dark-1 dark:text-main-1 py-2 text-3xl w-12 h-12`}
      onClick={onClick}>
      <MdPlayArrow />
    </button>
  );
};

export const AddButton = ({
  onClick,
  className = '',
  name,
}: {
  onClick?: (e?: any) => any;
  className?: string;
  name?: string;
}) => {
  return (
    <button
      className={`bg-transparent border ${className} shadow rounded-full flex justify-center items-center text-main-dark-1 dark:text-main-1 py-2 text-3xl w-12 h-12`}
      onClick={onClick}
      name={name}
      id={name}
      data-cy={name}>
      <MdAdd />
    </button>
  );
};

export const SecondaryButton = ({ className, children, onClick }: any) => {
  return (
    <button
      className={`bg-transparent border ${className} dark:border-main-dark-text border-main-text dark:hover:text-main-dark-3 hover:text-main-3 dark:hover:border-main-dark-3 hover:border-main-3  rounded-2xl px-3 text-main-text dark:text-main-dark-text py-2`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
