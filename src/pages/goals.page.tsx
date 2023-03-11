import React from 'react';

import BandGoals from '../components/band.components/band-goals.component';
import Container from '../components/common.components/container.component';
import { TitleWithGoBack } from '../constants/Layout';

export const Goals = ({ ownAccount }: { ownAccount?: boolean }) => {
  return (
    <Container>
      <TitleWithGoBack title="Goals" ownAccount={ownAccount} addLink={'/goals/new'} />
      <section className="flex flex-col mt-7">
        <BandGoals ownAccount={ownAccount} />
      </section>
    </Container>
  );
};

export default Goals;
