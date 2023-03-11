import React, { useContext } from 'react';
import { MdArrowLeft, MdArrowRight, MdEuro } from 'react-icons/md';
import { useQuery } from 'react-query';
import Container from '../components/common.components/container.component';
import { Loader } from '../components/common.components/loader.component';
import { TitleWithGoBack } from '../constants/Layout';
import { Transaction } from '../constants/types';
import { getUserTransactionHistoryById } from '../services/api-calls';
import { GlobalContext } from '../services/store';
import { Error } from './erorr.page';
export default function Transactions() {
  const { user } = useContext(GlobalContext);

  const {
    data,
    error,
    status,
  }: { data?: Transaction[]; error: { message: string } | null; status: string } = useQuery(
    ['products', user.id],
    () => getUserTransactionHistoryById(user.id),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  return (
    <Container>
      <TitleWithGoBack title="Transactions" />
      <div className="grid grid-cols-1 gap-4 w-full mt-7">
        {status === 'loading' ? (
          <Loader />
        ) : error ? (
          <Error message={error!.message} />
        ) : data?.length !== 0 && data !== undefined ? (
          data &&
          data.map((transaction: Transaction, index: number) => (
            <section
              className="w-9/12 border border-main-border dark:border-main-dark-2 h-28 rounded-lg p-4 shadow-lg flex"
              key={index}>
              {transaction?.recipient?.picture && (
                <img
                  src={transaction?.recipient?.picture}
                  alt="user"
                  className="w-10 h-10 rounded-full mr-4"
                />
              )}
              <div className="flex flex-col w-full h-full">
                <span className="flex items-center w-full justify-between">
                  <h1 className="font-medium text-xl">{transaction?.transactionType?.name}</h1>
                  <p className="font-semibold text-xl">
                    {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                      transaction?.amount
                    )}
                  </p>
                </span>
                <section>
                  <span className="flex items-center">
                    {transaction?.sender?.name}
                    <MdArrowRight /> {transaction?.recipient?.name}
                  </span>
                </section>
                <p>at {transaction?.date}</p>
              </div>
            </section>
          ))
        ) : (
          <>No Transactions</>
        )}
      </div>
    </Container>
  );
}
