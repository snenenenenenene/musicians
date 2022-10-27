import React, { useContext } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Container from '../components/common.components/container.component';
import { UserFollowing } from '../components/user.components/user-following.component';
import { UserLikes } from '../components/user.components/user-likes.component';
import { UserProducts } from '../components/user.components/user-products.component';
import Flex, { FlexCol } from '../constants/Layout';
import { GlobalContext } from '../services/store';

export default function User({ ownAccount = true }: { ownAccount?: boolean }) {
  const { user } = useContext(GlobalContext);
  return (
    <Container>
      <div className="absolute right-10 z-10 top-5 md:hidden block mb-4 p-2 items-center rounded-xl hover:bg-main-1 dark:hover:bg-main-dark-1 text-2xl md:invisible">
        <Link to="/settings">
          <MdMenu />
        </Link>
      </div>

      <button className="mr-auto mb-6 flex justify-center items-center">
        <img
          src={user?.picture}
          className="w-14 h-14 overflow-hidden rounded-full mr-4 object-cover"
          alt="PIC"
        />
        <h1 className="text-xl">{user?.name !== undefined ? user.name : 'Band'}</h1>
      </button>

      <FlexCol className="md:flex pb-32 md:pb-0">
        <div className="flex w-full md:h-full">
          {/* CHECKING IF LOOKING AT OWN PAGE OR VISITING */}
          {ownAccount ? (
            <FlexCol className="w-full">
              <section className="flex flex-col md:mb-12 md:pb-12 border-b border-main-border pb-6 mb-6">
                <Flex className="pb-7 flex justify-center items-center">
                  <h1 className="font-semibold text-2xl">Owned Products</h1>
                  <h2 className="font-medium ml-4 text-base text-main-important-text mr-auto">
                    <Link to="/owned-products">view all</Link>
                  </h2>
                </Flex>
                <UserProducts currUserId={user?.id} />
              </section>
              <section className="flex flex-col md:mb-12 md:pb-12 border-b border-main-border pb-6 mb-6">
                <Flex className="justify-center pb-7 items-center">
                  <h1 className="font-semibold text-2xl">Fandoms</h1>
                  <h2 className="font-medium ml-4 text-base text-main-important-text mr-auto">
                    <Link to="/fandoms">view all</Link>
                  </h2>
                </Flex>
                <UserFollowing currUserId={user?.id} />
              </section>
              <section className="flex flex-col md:mb-12 md:pb-12 border-b border-main-border pb-6 mb-6">
                <Flex className="justify-center pb-7 items-center">
                  <h1 className="font-semibold text-2xl">Liked Products</h1>
                  <h2 className="font-medium ml-4 text-base text-main-important-text mr-auto">
                    <Link to="/likes">view all</Link>
                  </h2>
                </Flex>
                <UserLikes currUserId={user?.id} />
              </section>
            </FlexCol>
          ) : (
            <FlexCol className="w-full">
              <section className="flex flex-col md:mb-12 md:pb-12 border-b border-main-border pb-6 mb-6">
                <Flex className="pb-7 flex justify-center items-center">
                  <h1 className="font-semibold text-2xl">Owned Products</h1>
                  <h2 className="font-medium ml-4 text-base text-main-important-text mr-auto">
                    <Link to="/products">view all</Link>
                  </h2>
                </Flex>
                <UserProducts currUserId={user?.id} />
              </section>
              <section className="flex flex-col">
                <Flex className="justify-center pb-7 items-center">
                  <h1 className="font-semibold text-2xl">Fandoms</h1>
                  <h2 className="font-medium ml-4 text-base text-main-important-text mr-auto">
                    <Link to="/goals">view all</Link>
                  </h2>
                </Flex>
                <UserFollowing currUserId={user?.id} />
              </section>
              <section className="flex flex-col">
                <Flex className="justify-center pb-7 items-center">
                  <h1 className="font-semibold text-2xl">Likes</h1>
                  <h2 className="font-medium ml-4 text-base text-main-important-text mr-auto">
                    <Link to="/goals">view all</Link>
                  </h2>
                </Flex>
                <UserLikes currUserId={user?.id} />
              </section>
            </FlexCol>
          )}
        </div>
      </FlexCol>
    </Container>
  );
}
