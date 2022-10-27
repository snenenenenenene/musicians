import React, { useContext, useState } from 'react';

import Container from '../components/common.components/container.component';
import { UserFollowing } from '../components/user.components/user-following.component';
import Flex, { TitleWithGoBack } from '../constants/Layout';
import { GlobalContext } from '../services/store';

export const Fandoms = () => {
  const { user } = useContext(GlobalContext);

  return (
    <Container>
      <TitleWithGoBack title="Joined Fandoms" />
      <section className="flex flex-col mt-7">
        <UserFollowing currUserId={user.id} />
      </section>
    </Container>
  );
};
