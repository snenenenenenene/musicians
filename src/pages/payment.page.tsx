import React, { useContext, useEffect, useState } from 'react';
import { MdArrowBackIos, MdEuro, MdMusicNote } from 'react-icons/md';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import {
  becomeGroupieOfBandWithId,
  buyProduct,
  donateToGoal,
  getBandById,
  getGoalById,
  getProductById,
  placeBid,
} from '../services/api-calls';
import { CheckBox, TitleWithGoBack } from '../constants/Layout';
import { toast } from 'react-toastify';
import { Band, Goals, Product, User } from '../constants/types';
import { GlobalContext } from '../services/store';

export const Payment = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [path, setPath] = useState(useLocation().pathname);
  const idParam = Number(params.id);
  const [amount, setAmount] = useState<number | undefined>(Number(params.amount));
  const { user }: { user: User } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [data, setData] = useState<Product | Goals | Band | any | undefined>();

  const results = useQueries([
    {
      queryKey: ['products'],
      queryFn: () => getProductById(idParam),
      onSuccess: (data: Product) => {
        console.log(data);
        setData(data);
      },
      enabled: path === 'products',
    },
    {
      queryKey: ['bands', 'users'],
      queryFn: () => getBandById(idParam),
      onSuccess: (data: Band) => {
        setData(data);
      },
      enabled: path === 'subscription',
    },
  ]);

  const location = useLocation();
  const [bidPrice, setBidPrice] = useState<number>(
    path === 'products' ? data?.price : data?.amountToAchieve
  );
  const [check, setCheck] = useState('Credit Card');
  const handleCheck = (value) => {
    setCheck(value);
  };

  const buyProductMutation = useMutation(
    (productId: number) => buyProduct(productId, user.id!, bidPrice),
    {
      onSuccess: () => {
        toast(`Purchased ${data.name}`, { type: 'success' });
        queryClient.invalidateQueries('products');
        navigate(`/account`);
      },
    }
  );

  const placeBidMutation = useMutation(
    (productId: number) => placeBid(productId, user, data, bidPrice),
    {
      onSuccess: () => {
        toast(`Bid placed for ${data.name}`, { type: 'success' });
        queryClient.invalidateQueries('products');
        navigate(`/account`);
      },
    }
  );

  const becomeGroupieMutation = useMutation(
    (bandId: number) => becomeGroupieOfBandWithId(bandId, user.id!, amount!),
    {
      onSuccess: () => {
        toast(`Welcome to the group!`, { type: 'success' });
        queryClient.invalidateQueries('bands');
        navigate(`/`);
      },
    }
  );

  useEffect(() => {
    console.log(path);
    location.pathname.split('/').map((path) => {
      if (path.includes('products')) {
        setPath('products');
      } else if (path.includes('subscription')) {
        setPath('subscription');
        setAmount(Number(params.amount));
      }
    });
  }, [location, path]);

  return (
    <Container>
      <TitleWithGoBack title="Payment" />
      <section className="pb-6 my-6 flex md:pb-12 md:mb-12 border-b border-main-border">
        <header className="w-full flex">
          {path === 'products' || path === 'subscription' ? (
            <div className="h-40 w-40 justify-center flex rounded-lg bg-main-1 shadow-lg items-center overflow-hidden">
              {data?.picture ? (
                <img src={data.picture} className="h-40 w-40 object-cover" alt="" />
              ) : (
                <MdMusicNote className="text-3xl" />
              )}
            </div>
          ) : null}
          <div className="ml-5 flex flex-col">
            <span className="text-main-important-text font-normal">
              {data?.band ? data.band.name : 'Band'}
            </span>
            <h2 className="font-semibold text-3xl">{data?.name ? data.name : 'Product'}</h2>
            <div className="mt-auto">
              <p className="flex items-center text-main-text">
                {path === 'products' || path === 'goals' ? <> Minimum&nbsp;</> : null}
                <MdEuro />
                &nbsp;
                {path === 'products'
                  ? data?.price
                  : data?.amountToAchieve
                  ? data.amountToAchieve
                  : amount
                  ? amount
                  : '0'}
              </p>
              {path === 'products' || path === 'goals' ? (
                <Input
                  type="number"
                  name="price"
                  placeholder={data?.price ? data.price : '100.00'}
                  onChange={(e) => setBidPrice(e.target.value)}
                />
              ) : null}
            </div>
          </div>
        </header>
      </section>
      <CheckBox title="Credit Card" check={check} handleCheck={() => handleCheck('Credit Card')}>
        <div className="shadow p-5 rounded-3xl mb-5">
          <label>Cardholder name</label>
          <Input name="credit-card-holder" placeholder="Jane Doe" />{' '}
          <label>Credit card number</label>
          <Input name="credit-card-number" placeholder="*******" />
          <section className="flex space-x-5">
            <Input name="expiration-date" placeholder="MM/YY" />
            <Input name="cvv" placeholder="CVV" />
          </section>
          <Button
            name="buy-product"
            onClick={() => {
              switch (path) {
                case 'products':
                  placeBidMutation.mutate(idParam);
                  break;
                case 'subscription':
                  becomeGroupieMutation.mutate(idParam);
                  break;
              }
            }}
            className="w-full h-20 mt-5">
            <span className="flex justify-center items-center">
              Pay <MdEuro />
              &nbsp;{bidPrice}
            </span>
          </Button>
        </div>
      </CheckBox>
      <CheckBox title="Bancontact" check={check} handleCheck={() => handleCheck('Bancontact')}>
        <></>
      </CheckBox>
      <CheckBox title="Paypal" check={check} handleCheck={() => handleCheck('Paypal')}>
        <></>
      </CheckBox>
    </Container>
  );
};
