import React, { useContext } from 'react';

import BandProducts from '../components/band.components/band-products.component';
import Container from '../components/common.components/container.component';
import { TitleWithGoBack } from '../constants/Layout';
import { GlobalContext } from '../services/store';

export const Products = ({ ownAccount }: { ownAccount?: boolean }) => {
  const { user, band } = useContext(GlobalContext);

  return (
    <Container>
      <TitleWithGoBack ownAccount={ownAccount} addLink={'/products/new'} title="Products" />
      <section className="flex flex-col mt-7">
        <BandProducts
          currUserId={user.id}
          ownAccount={ownAccount}
          productScreen={true}
          bandId={band.id}
        />
      </section>
    </Container>
  );
};
