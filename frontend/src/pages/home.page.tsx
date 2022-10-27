import React, { Suspense, useContext, useState } from 'react';
import { MdSearch, MdSwipe } from 'react-icons/md';
import Button from '../components/common.components/button.component';
import { Loader } from '../components/common.components/loader.component';
import { SwipingModal } from '../components/modal.components/swiping.modal.component';
import Container from '../components/common.components/container.component';
import Flex, { FlexCol } from '../constants/Layout';
import { GlobalContext } from '../services/store';
import { TrendingProducts } from '../components/home.components/trending-products.component';
import { NewProducts } from '../components/home.components/new-products.component';
import { RecommendedBands } from '../components/home.components/recommended-bands.component';
import SearchModal from '../components/modal.components/search.modal.component';
import { Footer } from '../components/common.components/footer.component';

// following & implementing https://web.dev/code-splitting-suspense/?utm_source=lighthouse&utm_medium=devtools to improve performance by using suspense

const renderLoader = () => <Loader />;

export default function Home() {
  const [openSwiping, setOpenSwiping] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { user } = useContext(GlobalContext);

  return (
    <>
      <Container>
        <FlexCol className="min-h-screen">
          <section className="pb-6 mb-6 md:pb-12 md:mb-12 border-b border-main-border">
            <section className="flex">
              <span className="mb-7">
                <h2 className="font-medium text-base text-main-important-text">Hip and</h2>
                <h1 className=" text-2xl font-semibold">Trending</h1>
              </span>
              <span
                onClick={() => {
                  setOpenSearch(!openSearch);
                }}
                className="ml-auto text-3xl cursor-pointer">
                <MdSearch />
              </span>
            </section>

            <Suspense fallback={renderLoader()}>
              <TrendingProducts />
            </Suspense>
          </section>
          <Flex className="w-full xl:flex-row flex-col ">
            <section className="w-full pb-6 mb-6 md:pb-12 md:mb-12 border-b border-main-border">
              <h2 className="font-medium text-base text-main-important-text">On</h2>
              <h1 className=" mb-8 text-2xl font-semibold">Fire</h1>
              <section className="flex mr-4 gap-4 flex-col">
                <Suspense fallback={renderLoader()}>
                  <NewProducts currUserId={user?.id} />
                </Suspense>
              </section>
            </section>
            <section className="w-full overflow-hidden pb-6 mb-6 md:pb-12 md:mb-12 border-b border-main-border">
              <h2 className="font-medium text-base text-main-important-text">New</h2>
              <h1 className="mb-8 text-2xl font-semibold">Horizons</h1>
              <div className="w-full h-full flex -mt-6 py-8">
                <div
                  onClick={() => {
                    setOpenSwiping(!openSwiping);
                  }}
                  className="bg-main-2 cursor-pointer w-full h-64 xl:h-full flex justify-center items-center relative">
                  <img
                    className="w-full object-cover h-full absolute filter brightness-50"
                    src="https://i0.wp.com/www.iconvsicon.com/wp-content/uploads/2021/01/The-Killers-Imploding-The-Mirage-Deluxe.jpg?fit=1920%2C1920"
                    alt=""
                  />
                  <Button name="open-swiping" className="z-20">
                    <section className="flex w-48 h-20 justify-around items-center text-2xl">
                      <MdSwipe /> Start Swiping
                    </section>
                  </Button>
                </div>
              </div>
            </section>
          </Flex>
          <section className="pb-6 mb-6 md:pb-12 md:mb-12 border-b border-main-border">
            <span className="mb-7">
              <h2 className="font-medium text-base text-main-important-text">Recommended</h2>
              <h1 className=" text-2xl font-semibold">Artists</h1>
            </span>
            <Suspense fallback={renderLoader()}>
              <RecommendedBands />
            </Suspense>
          </section>
          <SearchModal open={openSearch} setOpen={setOpenSearch} />
          <SwipingModal open={openSwiping} setOpen={setOpenSwiping} />
        </FlexCol>
      </Container>
      <Footer />
    </>
  );
}
