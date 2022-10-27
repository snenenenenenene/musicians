export type Band = {
  id?: number;
  name: string;
  location: string;
  fans: number;
  picture?: string;
  groupies: number;
  members: number[];
  subscribedUserIds?: number[];
  followedUserIds?: number[];
};

export type Goals = {
  id?: number;
  bandId: number;
  name: string;
  amountToAchieve: number;
  currentAmount: number;
};

export type Subscription = {
  id?: number;
  name: string;
  bandId: number;
  userId: number;
  amount: number;
  startDate: string;
};

export type RegisterData = {
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type Product = {
  id?: number;
  name: string;
  likedBy?: number[];
  price: number;
  sound?: Sound;
  audio?: string | any;
  bandId: number;
  duration?: number;
  releaseDate?: string;
  likes?: number;
  type?: string;
  fileType?: string;
  picture?: any;
  band: Band;
  album?: string;
  ownedByUserId?: number;
  ownedByUserName?: string;
  description?: string;
  bids?: Bid[];
};

export type Bid = {
  id?: number;
  product: Product;
  user: User;
  amount: number;
  createdAt: string;
};

export type Sound = {
  name: string;
  owner: number;
  file: string;
  productId: number;
  product: Product;
};

export type Transaction = {
  id?: number;
  recipient: Band;
  sender: User;
  transactionType: Goals | Product | Subscription;
  amount: number;
  date: string;
};

export type User = {
  id?: number;
  name: string;
  products?: Product[];
  picture?: string;
  email?: string;
  password?: string;
  bands?: Band[];
  roleName: string;
  followingBands?: Band[];
  subscribedTo?: Band[];
  likedProducts?: Product[];
  ownedProducts?: Product[];
  totalEarned?: number;
  monthlyAnalytics?: any[];
};

export interface IGlobalContext {
  currentSong: Product;
  setCurrentSong: any;
  vol: number;
  user: any;
  setVol: any;
  audio: any;
  playing: boolean;
  muted: boolean;
  toggle: () => void;
  muteToggle: () => void;
  currentTime: any;
  duration: any;
}
