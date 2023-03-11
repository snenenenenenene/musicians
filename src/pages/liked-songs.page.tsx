import React, { useContext, useState } from 'react';

import Container from '../components/common.components/container.component';
import { UserLikes } from '../components/user.components/user-likes.component';
import Flex, { TitleWithGoBack } from '../constants/Layout';
import { GlobalContext } from '../services/store';

export const LikedSongs = () => {
  const { user } = useContext(GlobalContext);

  return (
    <Container>
      <TitleWithGoBack title="Liked Products" />
      <section className="flex flex-col mt-7">
        <UserLikes currUserId={user.id} />
      </section>
    </Container>
  );
};
