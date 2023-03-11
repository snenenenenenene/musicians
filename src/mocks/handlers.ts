import { rest } from 'msw';
import { Band, Bid, Goals, Product, Transaction, User } from '../constants/types';

import jonasProfilePicture from '../assets/jonas-picture.gif';
import lennyProfilePicture from '../assets/lenny-picture.gif';
import robinProfilePicture from '../assets/robin-picture.gif';
import senneProfilePicture from '../assets/senne-picture.gif';
import userProfilePicture from '../assets/user-picture.jpg';
import zitaProfilePicture from '../assets/zita-picture.gif';

const bands: Band[] = [
  {
    id: 1,
    name: 'Gengahr',
    location: 'Liverpool',
    fans: 100,
    groupies: 200,
    picture: 'https://i.scdn.co/image/ab6761610000e5eb3b1a7cbffc571df88567a02c',
    members: [1],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 2,
    name: 'Holy Holy',
    location: 'London',
    fans: 200,
    groupies: 300,
    picture: 'https://i.scdn.co/image/ab6761610000e5eb76548fd391d8306baf46dd82',
    members: [1],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 3,
    name: 'Angus & Julia Stone',
    location: 'London',
    fans: 200,
    groupies: 300,
    picture: 'https://i.scdn.co/image/ab6761610000e5eb6991d9d87155e48247e2caf0',
    members: [],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 4,
    name: 'The Vanns',
    location: 'Melbourne',
    fans: 200,
    groupies: 300,
    picture: 'https://pbs.twimg.com/media/E9cEbs3UYAAdlD2.jpg',
    members: [],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 5,
    name: 'Nothing But Thieves',
    location: 'London',
    fans: 200,
    groupies: 300,
    picture: 'https://i.scdn.co/image/ab6761610000e5eb90e8b4340fa061d702ecc693',
    members: [],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 6,
    name: 'The Wombats',
    location: 'London',
    fans: 200,
    groupies: 300,
    picture: 'https://i.scdn.co/image/ab6761610000e5ebf4b91dc8e4dda18b5adca9f9',
    members: [],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 7,
    name: 'The Smiths',
    location: 'Manchester',
    fans: 200,
    groupies: 300,
    picture: 'https://i.scdn.co/image/481b980af463122013e4578c08fb8c5cbfaed1e9',
    members: [],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 8,
    name: 'Declan McKenna',
    location: 'Leeds',
    fans: 200,
    groupies: 300,
    picture: 'https://i.scdn.co/image/ab6761610000e5ebb6b72d5ce4ea0f42585a6364',
    members: [],
    subscribedUserIds: [],
    followedUserIds: [],
  },
  {
    id: 9,
    name: 'Wallows',
    location: 'Orange County',
    fans: 200,
    groupies: 300,
    picture: 'https://i.scdn.co/image/ab6761610000e5ebb31e2c447cae669973be25b1',
    members: [],
    subscribedUserIds: [1],
    followedUserIds: [],
  },
  {
    id: 10,
    name: 'Dope Lemon',
    location: 'New York',
    fans: 64300,
    groupies: 54300,
    picture: 'https://i.scdn.co/image/ab6761610000e5eb83abe98ddf912c8e646326ca',
    members: [],
    subscribedUserIds: [],
    followedUserIds: [],
  },
];

const goals: Goals[] = [
  {
    id: 1,
    bandId: 1,
    name: 'Loop Pedal',
    amountToAchieve: 100,
    currentAmount: 80,
  },
  {
    id: 2,
    bandId: 3,
    name: 'First Venue',
    amountToAchieve: 12000,
    currentAmount: 15,
  },
];

const products: Product[] = [
  {
    id: 1,
    name: 'British Bombs',
    bandId: 8,
    likedBy: [0],
    price: 10,
    audio: 'https://www.youtube.com/watch?v=lWAO3ZGFZys',
    ownedByUserId: 1,
    ownedByUserName: 'Senne',
    band: bands[7],
    album: 'The Dream',
    likes: 100,
    picture:
      'https://i0.wp.com/the-phonograph.com/wp-content/uploads/2019/08/declan-mckenna-british-bombs.jpg?fit=1000%2C1000&ssl=1',
    bids: [],
  },
  {
    id: 2,
    name: "She's a Witch",
    bandId: 1,
    likedBy: [],
    price: 10,
    audio: 'https://www.youtube.com/watch?v=sHTLykxtwdc',
    band: bands[0],
    album: 'HOME',
    picture: 'https://i.scdn.co/image/ab67616d0000b273f0437a4189e1abee866b6911',
    likes: 98,
    bids: [],
  },
  {
    id: 3,
    name: 'Excuse Me',
    bandId: 5,
    price: 1078,
    likedBy: [],
    audio: 'https://www.youtube.com/watch?v=rjAiojfJMxs',
    band: bands[4],
    album: 'Nothing But Thieves',
    picture: 'https://media.s-bol.com/jYwPJ4A6zBvy/550x545.jpg',
    likes: 100,
    bids: [],
  },
  {
    id: 4,
    name: "If You Ever Leave I'm Coming With You",
    bandId: 6,
    price: 108,
    likedBy: [],
    audio: 'https://www.youtube.com/watch?v=3fe7lmZH7iw',
    picture: 'https://i.scdn.co/image/ab67616d0000b273d87714347f215c3e1432f2e1',
    band: bands[5],
    album: 'The Wombats',
    likes: 100,
    bids: [],
  },
  {
    id: 5,
    name: 'Living Underground',
    bandId: 3,
    price: 108,
    likedBy: [],
    audio: 'https://www.youtube.com/watch?v=ZspBu8DgvFk',
    picture: 'https://images.genius.com/dbba96845d08bf21f3e4d1aa351bbd8d.999x999x1.png',
    band: bands[2],
    album: 'The Wombats',
    likes: 100,
    bids: [],
  },
];

const users: User[] = [
  {
    id: 1,
    name: 'Senne',
    email: 'senne@musician.com',
    picture: senneProfilePicture,
    password: 'password',
    bands: [bands[0], bands[1]],
    roleName: 'Musician',
    followingBands: [bands[0], bands[1]],
    subscribedTo: [bands[0], bands[1]],
    likedProducts: [],
    ownedProducts: [],
    totalEarned: 300,
    monthlyAnalytics: [
      { month: 0, amount: 40 },
      { month: 1, amount: 50 },
      { month: 2, amount: 60 },
      { month: 3, amount: 70 },
      { month: 4, amount: 80 },
    ],
  },
  {
    id: 2,
    name: 'Jane',
    email: 'user@user.com',
    password: 'password',
    roleName: 'User',
    picture: userProfilePicture,
    followingBands: [bands[1]],
    subscribedTo: [bands[0]],
    likedProducts: [],
    ownedProducts: [],
  },
  {
    id: 3,
    name: 'Robin',
    email: 'robin@musician.com',
    password: 'password',
    bands: [],
    roleName: 'Musician',
    picture: robinProfilePicture,
    followingBands: [],
    subscribedTo: [],
    likedProducts: [],
    ownedProducts: [],
  },
  {
    id: 4,
    name: 'Lenny',
    email: 'lenny@musician.com',
    password: 'password',
    bands: [],
    picture: lennyProfilePicture,
    roleName: 'Musician',
    followingBands: [],
    subscribedTo: [],
    likedProducts: [],
    ownedProducts: [],
  },
  {
    id: 5,
    name: 'Zita',
    email: 'zita@musician.com',
    password: 'password',
    bands: [],
    roleName: 'Musician',
    followingBands: [],
    picture: zitaProfilePicture,
    subscribedTo: [],
    likedProducts: [],
    ownedProducts: [],
  },
  {
    id: 6,
    name: 'Jonas',
    email: 'jonas@musician.com',
    password: 'password',
    bands: [],
    roleName: 'Musician',
    picture: jonasProfilePicture,
    followingBands: [],
    subscribedTo: [],
    likedProducts: [],
    ownedProducts: [],
  },
];

const transactions: Transaction[] = [];

export const handlers: any = [
  // BANDS
  rest.get('/api/bands', (req, res, ctx) => {
    return res(ctx.json(bands));
  }),
  rest.get('/api/bands/:id', (req, res, ctx) => {
    const { id } = req.params;
    const band = bands.find((b) => b.id === Number(id));
    return res(ctx.json(band));
  }),
  rest.patch('/api/bands/:id', async (req, res, ctx) => {
    const { id }: any = req.params;
    const { body }: any = req;
    const band = bands.find((b) => b.id === Number(id));
    if (band) {
      const { name, location, fans, members, groupies, picture } = body;
      band.name = name;
      band.location = location;
      band.fans = fans;
      band.members = members;
      band.groupies = groupies;
      band.picture = picture;

      // add band to user bands
      band?.members.map((member) => {
        const user = users.find((u) => u.id === member);
        console.log(user);
        if (user && user.bands && !user.bands.includes(band)) {
          console.log('Pused user to band');
          user.bands.push(band);
        }
        return '';
      });

      return res(ctx.json(band));
    }
  }),
  rest.post('/api/bands', async (req, res, ctx) => {
    const { body }: any = req;

    const newBand = {
      id: bands.length + 1,
      ...body,
    };

    body.members.map((member) => {
      const user = users.find((u) => u.id === member);
      if (user && user.bands && !user.bands.includes(newBand)) {
        user.bands.push(newBand);
      }
      return 0;
    });

    bands.push(newBand);
    return res(ctx.json(newBand));
  }),
  rest.get(`/api/users/:id/bands`, (req, res, ctx) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));
    return res(ctx.json(user!.bands));
  }),

  rest.post(`/api/users/:id/bands`, async (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const user = users.find((u) => u.id === Number(id));
    if (user) {
      const newBand = {
        id: bands.length + 1,
        ...body,
      };
      bands.push(newBand);

      body.members.map((member) => {
        const user = users.find((u) => u.id === member);
        if (user!.bands === undefined) user!.bands = [];

        user!.bands.push(newBand);
        return 0;
      });
    }

    return res(ctx.json({}));
  }),

  rest.get(`/api/users/musicians`, (req, res, ctx) => {
    const musicians = users.filter((u) => u.roleName === 'Musician');
    return res(ctx.json(musicians));
  }),

  // FOLLOWING AND SUBSCRIBING

  rest.patch('/api/bands/:id/follow', (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const band: any = bands.find((b) => b.id === Number(id));

    const user: User = users.find((u) => u.id === Number(body))!;
    if (user.followingBands === undefined) user.followingBands = [];
    if (user.followingBands.includes(band)) {
    } else {
      user.followingBands.push(band);
      if (band.followingUserIds === undefined) band.followingUserIds = [];
      band.followingUserIds.push(user.id);
      band.fans += 1;
    }

    return res(ctx.json(band));
  }),
  rest.patch('/api/bands/:id/unfollow', (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const band: any = bands.find((b) => b.id === Number(id));
    band.fans -= 1;
    const user: User = users.find((u) => u.id === Number(body))!;

    if (user.followingBands === undefined) user.followingBands = [];
    user.followingBands = user.followingBands.filter((b) => b.id !== band.id);

    if (band.followingUserIds === undefined) band.followingUserIds = [];
    band.followingUserIds = band.followingUserIds.filter((u) => u !== user.id);
    band.followingUserIds.push(user.id);

    return res(ctx.json(band));
  }),
  rest.patch('/api/bands/:id/join', (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const band: any = bands.find((b) => b.id === Number(id));
    band.groupies += 1;
    const user: User = users.find((u) => u.id === Number(body.userId))!;
    if (user.subscribedTo === undefined) user.subscribedTo = [];
    user.subscribedTo.push(band);
    let transaction: Transaction = {
      id: transactions.length + 1,
      recipient: band,
      sender: user,
      amount: body.amount,
      transactionType: {
        id: 1,
        name: band.name,
        userId: user.id!,
        bandId: band.id!,
        amount: body.amount,
        startDate: new Date().toUTCString(),
      },
      date: new Date().toUTCString(),
    };
    transactions.push(transaction);
    if (band.subscribedUserIds === undefined) band.subscribedUserIds = [];
    band.subscribedUserIds!.push(user.id);

    const recipientUser = users.find((u) => u.id === band.members[0]);

    // add amount to respective user and month in analytics
    if (recipientUser) {
      if (recipientUser.totalEarned === undefined) recipientUser.totalEarned = 0;
      recipientUser.totalEarned += Number(body.amount);
      if (recipientUser.monthlyAnalytics === undefined) recipientUser.monthlyAnalytics = [];

      // check if month exists in analytics and if it does add amount to month
      const month = recipientUser.monthlyAnalytics.find((m) => m.month === new Date().getMonth());
      if (month) {
        month.amount += Number(body.amount);
      } else {
        // if month doesn't exist, create it and add amount
        const newMonth = {
          month: new Date().getMonth(),
          amount: Number(body.amount),
        };
        recipientUser.monthlyAnalytics.push(newMonth);
      }
    }
    return res(ctx.json(band));
  }),

  rest.get('/api/users/:id/swipe-products', (req, res, ctx) => {
    const { id } = req.params;
    const user: User = users.find((u) => u.id === Number(id))!;
    // return all products the user hasn't liked yet
    if (user.likedProducts === undefined) user.likedProducts = [];
    const swipeProducts = products.filter((p) => !user!.likedProducts!.includes(p));
    return res(ctx.json(swipeProducts));
  }),

  rest.post('/api/products/:id/place-bid', (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const product: any = products.find((p) => p.id === Number(id));
    if (product.bids === undefined) product.bids = [];
    // if user is already in bids, update bid

    const bid = product.bids.find((b) => b.user.id === Number(body.user.id));
    if (bid) {
      bid.amount = Number(body.amount);
    } else {
      // if user is not in bids, add bid
      const newBid: Bid = {
        id: product.bids.length + 1,
        user: body.user,
        product: body.product,
        amount: body.amount,
        createdAt: new Date().toUTCString(),
      };
      product.bids.push(newBid);
    }
    return res(ctx.json(product));
  }),

  rest.get('/api/users/:id/analytics', (req, res, ctx) => {
    const { id } = req.params;
    const user: User = users.find((u) => u.id === Number(id))!;
    // get monthlyAnalytics and totalEarned
    return res(ctx.json({ monthlyAnalyics: user.monthlyAnalytics, totalEarned: user.totalEarned }));
  }),
  rest.patch('/api/bands/:id/leave', (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const band: any = bands.find((b) => b.id === Number(id));
    band.groupies -= 1;
    const user: User = users.find((u) => u.id === Number(body.userId))!;
    if (user.subscribedTo === undefined) user.subscribedTo = [];
    user.subscribedTo = user.subscribedTo.filter((b) => b.id !== band.id);
    if (band.subscribedUserIds === undefined) band.subscribedUserIds = [];
    band.subscribedUserIds = band.subscribedUserIds.filter((u) => u !== user.id);
    return res(ctx.json(band));
  }),

  rest.get('/api/users/:id/following-bands', (req, res, ctx) => {
    const { id } = req.params;
    const user: User = users.find((u) => u.id === Number(id))!;
    return res(ctx.json(user.followingBands));
  }),
  rest.get('/api/users/:id/subscribed-bands', (req, res, ctx) => {
    const { id } = req.params;
    const user: User = users.find((u) => u.id === Number(id))!;
    return res(ctx.json(user.subscribedTo));
  }),

  rest.get('/api/users/:id/joined-and-following-bands', (req, res, ctx) => {
    const { id } = req.params;
    const user: User = users.find((u) => u.id === Number(id))!;
    // get subscribed bands and following bands which are not subcribed
    const joinedAndFollowingBands = user
      .subscribedTo!.filter((b) => !user.followingBands!.includes(b))
      .concat(user.followingBands!);
    return res(ctx.json(joinedAndFollowingBands));
  }),

  rest.patch(`/api/users/:id/become-musician`, (req, res, ctx) => {
    const { id } = req.params;
    const user: User = users.find((u) => u.id === Number(id))!;
    user.roleName = 'Musician';
    return res(ctx.json(user));
  }),

  // PRODUCTS

  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json(products));
  }),
  rest.get('/api/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === Number(id));
    return res(ctx.json(product));
  }),

  rest.post('/api/products/:id/accept-bid', (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    // add product to user's ownedProducts and remove bid from product
    const product: Product = products.find((p) => p.id === Number(id))!;
    const bid: Bid = product.bids!.find((b) => b.id !== Number(body.bidId))!;
    //get user from bid in product
    const user: User = users.find((u) => u.id === Number(bid.user.id))!;
    //change product price to have bid price
    product.price = bid.amount;
    let amount = bid.amount;
    if (user.ownedProducts === undefined) user.ownedProducts = [];
    else {
      amount = (bid.amount / 100) * 10;
    }
    user.ownedProducts.push(product);
    product.ownedByUserId = user.id;
    product.ownedByUserName = user.name;

    const band = bands.find((b) => b.id === Number(product.bandId))!;

    const transaction: Transaction = {
      id: transactions.length + 1,
      transactionType: product!,
      sender: user!,
      amount: bid.amount,
      recipient: band!,
      date: new Date().toUTCString(),
    };

    user!.ownedProducts.push(product!);
    transactions.push(transaction);

    const recipientUser = users.find((u) => u.id === Number(band!.members[0]))!;
    console.log(recipientUser);

    if (recipientUser.totalEarned === undefined) recipientUser.totalEarned = 0;
    recipientUser.totalEarned += Number(amount);
    if (recipientUser.monthlyAnalytics === undefined) recipientUser.monthlyAnalytics = [];

    // check if month exists in analytics and if it does add amount to month
    const month = recipientUser.monthlyAnalytics.find((m) => m.month === new Date().getMonth());
    if (month) {
      month.amount += Number(amount);
    } else {
      // if month doesn't exist, create it and add amount
      const newMonth = {
        month: new Date().getMonth(),
        amount: Number(amount),
      };
      recipientUser.monthlyAnalytics.push(newMonth);
    }

    return res(ctx.json(product));
  }),
  rest.patch('/api/products/:id/like', async (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;

    const product: Product = products.find((p) => p.id === Number(id))!;
    product.likes! += 1;
    if (product.likedBy === undefined) product.likedBy = [];
    product.likedBy.push(Number(body));

    const user: User = users.find((u) => u.id === Number(body))!;
    if (user.likedProducts === undefined) user.likedProducts = [];
    user.likedProducts.push(product);
    return res(ctx.json(product));
  }),

  rest.patch('/api/products/:id/unlike', async (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const product: any = products.find((p) => p.id === Number(id));
    product.likes! -= 1;
    if (product.likedBy === undefined) product.likedBy = [];
    product.likedBy = product.likedBy.filter((u) => u !== Number(body));
    const user: any = users.find((u) => u.id === Number(body));
    if (user.likedProducts === undefined) user.likedProducts = [];
    user.likedProducts = user.likedProducts.filter((p) => Number(p.id) !== Number(id));
    return res(ctx.json(product));
  }),

  rest.get('/api/bands/:id/products', (req, res, ctx) => {
    const { id } = req.params;
    const bandProducts = products.filter((p) => Number(id) === p.bandId);
    return res(ctx.json(bandProducts));
  }),

  rest.get('/api/users/:id/liked-products', (req, res, ctx) => {
    const { id } = req.params;
    const likedProducts = products.filter((p) => p.likedBy && p.likedBy.includes(Number(id)));
    return res(ctx.json(likedProducts));
  }),

  rest.post('/api/bands/:id/products', async (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;

    const newProduct = {
      id: products.length + 1,
      picture: body.picture,
      audio: body.audio,
      ...body,
      bandId: Number(id),
      user: null,
      band: bands.find((b) => b.id === Number(id)),
      likes: 0,
    };
    products.push(newProduct);
    return res(ctx.json(newProduct));
  }),

  rest.patch('/api/goals/:id/donate', async (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const goal: Goals = goals.find((g) => g.id === Number(id))!;
    goal.currentAmount += Number(body.amount);
    const user: User = users.find((u) => u.id === Number(body.userId))!;
    const band: Band = bands.find((b) => b.id === Number(goal.bandId))!;

    const transaction: Transaction = {
      id: transactions.length + 1,
      recipient: band,
      sender: user,
      amount: body.amount,
      transactionType: goal,
      date: new Date().toUTCString(),
    };
    transactions.push(transaction);

    const recipientUser = users.find((u) => u.id === Number(goal.bandId))!;
    // add amount to totalEarned and to month

    if (recipientUser) {
      if (recipientUser.totalEarned === undefined) recipientUser.totalEarned = 0;
      recipientUser.totalEarned += Number(body.amount);
      if (recipientUser.monthlyAnalytics === undefined) recipientUser.monthlyAnalytics = [];

      // check if month exists in analytics and if it does add amount to month
      const month = recipientUser.monthlyAnalytics.find((m) => m.month === new Date().getMonth());
      if (month) {
        month.amount += Number(body.amount);
      } else {
        // if month doesn't exist, create it and add amount
        const newMonth = {
          month: new Date().getMonth(),
          amount: Number(body.amount),
        };
        recipientUser.monthlyAnalytics.push(newMonth);
      }
    }

    return res(ctx.json(goal));
  }),
  rest.get('/api/goals/:id', (req, res, ctx) => {
    const { id } = req.params;
    console.log(goals);
    const goal = goals.find((g) => g.id === Number(id));
    console.log(goal);
    return res(ctx.json(goal));
  }),
  rest.get('/api/goals', (req, res, ctx) => {
    return res(ctx.json(goals));
  }),

  rest.post('/api/bands/:id/goals', (req, res, ctx) => {
    const { body }: any = req;
    const newGoal = {
      id: goals.length + 1,
      ...body,
    };
    goals.push(newGoal);
    return res(ctx.json(newGoal));
  }),
  rest.get('/api/bands/:id/goals', (req, res, ctx) => {
    const { id } = req.params;
    const bandGoals = goals.filter((g) => Number(id) === g.bandId);
    return res(ctx.json(bandGoals));
  }),
  rest.post('/api/login', (req, res, ctx) => {
    const { body }: any = req;
    const { email, password } = body;
    if (email === '' || password === '') {
      return res(ctx.status(403), ctx.json({}));
    }
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      return res(
        ctx.json({
          access_token: 'mockedJwt',
          user_details: { ...user },
        })
      );
    }
    return res(ctx.status(403));
  }),
  rest.post('/api/register', (req, res, ctx) => {
    const { body }: any = req;
    const { email, password } = body;
    if (email === '' || password === '') {
      return res(ctx.status(403));
    }
    const newUser = {
      id: users.length + 1,
      ...body,
    };
    console.log(newUser);
    users.push(newUser);
    return res(ctx.json(newUser));
  }),
  rest.get('/api/users/:id/products', (req, res, ctx) => {
    const { id } = req.params;
    const userProducts = products.filter((p) => p.ownedByUserId && p.ownedByUserId === Number(id));
    return res(ctx.json(userProducts));
  }),

  rest.patch(`/api/products/:id/purchase`, (req, res, ctx) => {
    const { id } = req.params;
    const { body }: any = req;
    const product: Product | undefined = products.find((p) => p.id === Number(id));

    const user = users.find((u) => u.id === Number(body.userId));
    let amount = body.price;

    if (product!.ownedByUserId !== undefined) {
      amount = (amount / 100) * 10;
    }
    product!.ownedByUserId = user!.id;
    product!.ownedByUserName = user?.name;
    if (user!.ownedProducts === undefined) user!.ownedProducts = [];

    const band = bands.find((b) => b.id === product!.bandId);

    const transaction: Transaction = {
      id: transactions.length + 1,
      transactionType: product!,
      sender: user!,
      amount: body.price,
      recipient: band!,
      date: new Date().toUTCString(),
    };

    product!.price = body.price;
    user!.ownedProducts.push(product!);
    transactions.push(transaction);

    const recipientUser = users.find((u) => u.id === Number(band!.id))!;

    if (recipientUser) {
      if (recipientUser.totalEarned === undefined) recipientUser.totalEarned = 0;
      recipientUser.totalEarned += Number(amount);
      if (recipientUser.monthlyAnalytics === undefined) recipientUser.monthlyAnalytics = [];

      // check if month exists in analytics and if it does add amount to month
      const month = recipientUser.monthlyAnalytics.find((m) => m.month === new Date().getMonth());
      if (month) {
        month.amount += Number(amount);
      } else {
        // if month doesn't exist, create it and add amount
        const newMonth = {
          month: new Date().getMonth(),
          amount: Number(amount),
        };
        recipientUser.monthlyAnalytics.push(newMonth);
      }
    }

    return res(ctx.json(product));
  }),

  rest.get('/api/users/:id/transaction-history', (req, res, ctx) => {
    const { id } = req.params;
    console.log(id);
    console.log(transactions);
    const userTransactions = transactions.filter((t) => t.sender.id === Number(id));
    return res(ctx.json(userTransactions));
  }),
  rest.get('api/products/:id/transaction-history', (req, res, ctx) => {
    const { id } = req.params;
    const productTransactions = transactions.filter((t) => t.transactionType.id === Number(id));
    return res(ctx.json(productTransactions));
  }),
];
