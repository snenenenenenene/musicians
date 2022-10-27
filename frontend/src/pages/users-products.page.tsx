import React, { useContext } from 'react';
import Container from '../components/common.components/container.component';
import { UserProducts } from '../components/user.components/user-products.component';
import { TitleWithGoBack } from '../constants/Layout';
import { GlobalContext } from '../services/store';

export const UserProductsPage = () => {
  const { user } = useContext(GlobalContext);

  return (
    <Container>
      <TitleWithGoBack title="Products" />
      <section className="flex flex-col mt-7">
        <UserProducts currUserId={user.id} productScreen={true} />
      </section>
    </Container>
  );
};
