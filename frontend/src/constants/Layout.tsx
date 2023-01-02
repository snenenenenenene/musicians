import React, { ReactNode } from 'react';
import { MdCircle, MdChevronLeft, MdEuro } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { AddButton } from '../components/common.components/button.component';
import { Block } from '../components/common.components/block.component';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export const Flex = ({ children, className }: any) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export const FlexCol = ({ children, className }: any) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export const CheckBox = ({
  title,
  className = '',
  handleCheck,
  check,
  children = <></>,
}: {
  title: string;
  className?: string;
  handleCheck: () => void;
  check: any;
  children?: ReactNode;
}) => {
  return (
    <section className={className}>
      <span className="flex items-center">
        <div className="relative mr-2 flex justify-center items-center w-10 h-10">
          <input
            className="appearance-none border-2 absolute rounded-full border-main-dark-1 dark:border-main-1 w-7 h-7 cursor-pointer"
            type="checkbox"
            checked={check === title}
            onChange={handleCheck}
            value={title}
            name={title}
          />
          {check === title ? <MdCircle className="absolute w-7 h-7 p-1 cursor-pointer" /> : null}
        </div>
        <h1 className="font-semibold text-xl">{title}</h1>
      </span>
      {check === title ? children : null}
    </section>
  );
};

export const Select = ({
  children,
  onChange,
  className,
}: {
  children: any;
  onChange: any;
  className: string;
}) => {
  return (
    <select
      className={`py-2 ring-1 my-2 bg-main-1 dark:bg-main-dark-2 focus:bg-main-2 px-4 ring-main-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-main-1 focus:border-main-1 ${className}`}
      onChange={onChange}>
      {children}
    </select>
  );
};

export const Title = ({
  title,
  type,
  className,
}: {
  title?: string;
  type?: string;
  className?: string;
}) => {
  switch (type) {
    case 'small':
      return <h1 className={`text-xl font-bold ${className}`}>{title}</h1>;
    default:
      return <h1 className={`text-3xl font-bold ${className}`}>{title}</h1>;
  }
};

export function GoBack() {
  const navigate = useNavigate();
  return (
    <MdChevronLeft
      data-cy={'title-go-back-button'}
      className="text-4xl cursor-pointer"
      onClick={() => {
        navigate(-1);
      }}
    />
  );
}

export const Carousel = ({ items = [], type = 'products' }: { items: any[]; type?: string }) => {
  const carouselConfig = {
    className: 'center',
    centerMode: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: true,
    centerPadding: '60px',
    adaptiveHeight: true,
    swipeToSlide: true,
    dots: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          arrows: false,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Slider {...carouselConfig}>
      {items && items.length > 0
        ? items.map((item, index): any => <Block item={item} type={type} key={index} />)
        : null}
    </Slider>
  );
};

export const TitleWithGoBack = ({
  title,
  addLink,
  addLinkTitle,
  ownAccount,
}: {
  title?: string;
  addLink?: string;
  addLinkTitle?: string;
  ownAccount?: boolean;
}) => {
  return (
    <div className="flex items-center justify-start">
      <div className="rounded-full hover:bg-main-dark-2 transition-colors ease-in-out duration-200 dark:hover:bg-main-2 hover:text-main-2 dark:hover:text-main-dark-2 hover:shadow mr-2 text-2xl">
        <GoBack />
      </div>
      <div>
        <h1 className="font-semibold text-2xl">{title}</h1>
      </div>
      {ownAccount !== false && addLink && (
        <div className="ml-auto">
          <Link to={addLink}>
            <AddButton name={`link-to-${addLinkTitle}`} onClick={() => {}} />
          </Link>
        </div>
      )}
    </div>
  );
};

export const GoalBar = ({ max, current }: { max: any; current: any }) => {
  let completion = (current / max) * 100;
  return (
    <div
      className={`border border-main-dark-2 ${
        completion >= 70 ? 'text-main-1 dark:text-main-dark-1' : 'text-main-dark-1 dark:text-main-1'
      } flex overflow-hidden w-11/12 h-10 bg-main-1 relative`}>
      <div
        className={` ${
          completion >= 100 ? 'bg-main-3 dark:bg-main-dark-3' : 'bg-main-dark-1 dark:bg-main-dark-4'
        }`}
        style={{
          width: completion + '%',
        }}></div>
      <span className="text-sm flex w-full h-full justify-center absolute items-center">
        <MdEuro />
        &nbsp;{current}/{max}
      </span>
    </div>
  );
};

export default Flex;
