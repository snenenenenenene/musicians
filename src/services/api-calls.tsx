import axios from 'axios';
import { Band, Goals, LoginData, Product, User } from '../constants/types';

const mockApi: boolean = process.env.REACT_APP_API_MOCKING === 'enabled' ? true : false;
axios.defaults.baseURL = mockApi
  ? `${process.env.REACT_APP_FRONTEND_DOMAIN}`
  : `${process.env.REACT_APP_API_DOMAIN}`;
axios.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('jwt')!}`;

export async function register(user: User): Promise<User> {
  return axios.post(`/register`, user);
}

export async function login(user: LoginData): Promise<LoginData> {
  return axios.post(`/login`, user);
}

export async function getUserAnalytics(userId: number): Promise<any> {
  return axios.get(`/users/${userId}/analytics`).then((res) => res.data);
}

export async function getProducts(): Promise<Product[]> {
  return axios(`/products`).then((res) => res.data);
}

export async function getBands(): Promise<Band> {
  return axios(`/bands`).then((res) => res.data);
}

export async function getLikedProducts(userId: number): Promise<Product[]> {
  return axios(`users/${userId}/likedProducts`).then((res) => res.data);
}

export async function getSwipeProducts(userId: number): Promise<any> {
  return axios(`users/${userId}/swipe-products`).then((res) => res.data);
}

export async function getGoalsByBandId(bandId): Promise<any> {
  return axios(`/bands/${bandId}/goals`).then((res) => res.data);
}

export async function getBandById(id: any): Promise<Band> {
  return axios(`/bands/${id}`).then((res) => {
    return res.data;
  });
}

export async function getUserBandsById(id: number): Promise<Band[] | null | undefined> {
  return axios(`/users/${id}/bands`).then((res) => res.data);
}

export async function getProductsByBandId(id: any): Promise<Product[] | any> {
  return axios(`/bands/${id}/products`).then((res) => {
    return res.data;
  });
}

export async function getMusicians(): Promise<User[]> {
  return axios(`/users/musicians`).then((res) => res.data);
}

export async function postBand(band: Band, id: number): Promise<any> {
  return axios.post(`/users/${id}/bands`, band);
}

export async function postGoal(goalData: Goals, id: number): Promise<any> {
  return axios.post(`/bands/${id}/goals/`, goalData);
}

export async function becomeMusician(userId: number): Promise<any> {
  return axios.patch(`/users/${userId}/become-musician`);
}

export async function patchBand(band: Band): Promise<Band> {
  return axios.patch(`/bands/${band.id}`, band);
}

export async function deleteBand(id: number): Promise<any> {
  return axios.delete(`/bands/${id}`);
}

export async function postProduct(product: Product, bandId: number | null): Promise<any> {
  return axios.post(`/bands/${bandId}/products`, product);
}

export async function becomeFanOfBandWithId(bandId: number, userId: number): Promise<any> {
  return axios.patch(`/bands/${bandId}/follow`, userId);
}

export async function donateToGoal(goalId: number, donation: number, userId: number): Promise<any> {
  console.log(donation);
  return axios.patch(`/goals/${goalId}/donate`, { userId: userId, amount: donation });
}

export async function becomeGroupieOfBandWithId(
  bandId: number,
  userId: number,
  amount: number
): Promise<any> {
  return axios.patch(`/bands/${bandId}/join`, { userId: userId, amount: amount });
}

export async function placeBid(
  productId: number,
  user: User,
  product: Product,
  amount: number
): Promise<any> {
  return axios.post(`/products/${productId}/place-bid`, {
    user: user,
    product: product,
    amount: amount,
  });
}

export async function acceptBid(productId: number, bidId: number): Promise<any> {
  return axios.post(`/products/${productId}/accept-bid`, bidId);
}
export async function getProductById(id: number): Promise<Product> {
  return axios(`/products/${id}`).then((res) => {
    return res.data;
  });
}

export async function likeProduct(id: number, userId: number): Promise<any> {
  return axios.patch(`/products/${id}/like`, userId);
}

export async function unlikeProduct(id: number, userId: number): Promise<any> {
  return axios.patch(`/products/${id}/unlike`, userId);
}

export async function getUserLikedProducts(userId: number): Promise<Product[]> {
  return axios(`users/${userId}/liked-products`).then((res) => res.data);
}

export async function getOwnedProductByUserId(id: number): Promise<Product> {
  return axios(`/users/${id}/products/`).then((res) => {
    console.log(res.data);
    return res.data;
  });
}

export async function getGoalById(id: number): Promise<Goals> {
  return axios(`/goals/${id}`).then((res) => {
    console.log(id);
    console.log(res.data);
    return res.data;
  });
}

export async function deleteProduct(id: number): Promise<any> {
  return axios.delete(`/bands/${localStorage.getItem('bandId')}/products/${id}`);
}

export async function buyProduct(id: number, userId: number, price: number): Promise<any> {
  return axios.patch(`/products/${id}/purchase`, { userId: userId, price: price });
}

export async function getFollowingBands(userId: number): Promise<Band[]> {
  return axios(`/users/${userId}/following-bands`).then((res) => res.data);
}

export async function getGroupieBands(userId: number): Promise<Band[]> {
  return axios(`/users/${userId}/subscribed-bands`).then((res) => res.data);
}

export async function getJoinedAndFollowingBands(userId: number): Promise<Band[]> {
  return axios(`/users/${userId}/joined-and-following-bands`).then((res) => res.data);
}

export async function getUserTransactionHistoryById(userId: number): Promise<any> {
  console.log(userId);
  return axios(`/users/${userId}/transaction-history`).then((res) => {
    console.log(res.data);
    return res.data;
  });
}

export async function getProductTransactionHistoryById(productId: number): Promise<any> {
  return axios(`/products/${productId}/transaction-history`).then((res) => res.data);
}

export default getBands;
