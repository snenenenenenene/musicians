import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import { Loader } from '../components/common.components/loader.component';
import { TitleWithGoBack } from '../constants/Layout';
import { Bid, Product } from '../constants/types';
import { acceptBid, getProductById } from '../services/api-calls';
import { Error } from './erorr.page';

export const Bids = () => {
  const params = useParams();
  const productId = Number(params.id);

  const {
    data,
    error,
    status,
  }: { data?: Product; error: { message: string } | null; status: string } = useQuery(
    ['products'],
    () => getProductById(productId)
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const acceptBidMutation = useMutation((bidId: number) => acceptBid(productId, bidId), {
    onSuccess: () => {
      toast(`Sold ${data?.name}`, { type: 'success' });
      queryClient.invalidateQueries('products');
      navigate(`/account`);
    },
  });
  return (
    <Container>
      <TitleWithGoBack title="Open bids" />
      <section className={`mt-7 grid space-y-4`}>
        {status === 'loading' ? (
          <Loader />
        ) : status === 'error' ? (
          <Error message={error!.message} />
        ) : (
          <>
            {data && data?.bids && data.bids.length > 0 ? (
              data.bids.map((b: Bid) => (
                <div className="flex w-full items-center rounded-xl hover:bg-main-2 dark:hover:bg-main-dark-2 p-4 hover:shadow-md">
                  <img
                    src={b.user.picture}
                    className="w-10 h-10 overflow-hidden rounded-full object-cover mr-3"
                    alt="pic"
                  />
                  <p className=" text-main-text font-normal">{b.user.name}</p>
                  <p className="text-main-dark-1 ml-7 dark:text-main-1 font-medium">
                    {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                      b.amount
                    )}
                  </p>
                  <Button
                    onClick={() => acceptBidMutation.mutate(b.id!)}
                    name="accept-bid"
                    className="xs:mr-4 xs:w-20 w-20 text-xs xs:text-md ml-auto">
                    Accept
                  </Button>
                </div>
              ))
            ) : (
              <>No bids yet</>
            )}
          </>
        )}
      </section>
    </Container>
  );
};
