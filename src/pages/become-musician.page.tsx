import React, { useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import { TitleWithGoBack } from '../constants/Layout';
import { becomeMusician } from '../services/api-calls';
import { GlobalContext } from '../services/store';

export const BecomeMusician = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const mutation = useMutation(() => becomeMusician(user.id), {
    onSuccess: ({ data }) => {
      toast('You are now a musician!', { type: 'success' });
      queryClient.invalidateQueries('users');
      setUser(data);
      navigate('/account');
    },
    onError: () => {
      toast('Something went wrong!', { type: 'error' });
    },
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Container>
      <TitleWithGoBack title="Are you ready?" />
      <p className="m-7">
        You are about to become a musician. This means you will be able to sell your music to other
        users. This music will be available for sale in the Musicians music store.
      </p>
      <div className="flex justify-around">
        <img
          src="https://i.scdn.co/image/ab67616d0000b2734c6f36b0b3fdedcb70b97aee"
          className="w-40 h-40"
          alt="musician-img"
        />
        <img
          alt="musician-img"
          src="https://media.s-bol.com/r8Nn2M8vEDL2/550x550.jpg"
          className="w-40 h-40"
        />

        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/65d41ffa467f4d16adf8bf876c586c78.jpg#65d41ffa467f4d16adf8bf876c586c78"
          className="w-40 h-40"
          alt="musician-img"
        />

        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/7771d707e0ac83c2b3b1fc85787ac7fc.jpg#7771d707e0ac83c2b3b1fc85787ac7fc"
          className="w-40 h-40"
          alt="musician-img"
        />

        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/4c1587e2fb5dbbd80caf7e704c3b2b58.jpg#4c1587e2fb5dbbd80caf7e704c3b2b58"
          className="w-40 h-40"
          alt="musician-img"
        />
      </div>
      <div className="flex justify-around mt-10">
        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/a9c961c8da0d4427b7d7a4018738f5df.jpg#a9c961c8da0d4427b7d7a4018738f5df"
          className="w-40 h-40"
          alt="musician-img"
        />
        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/28700d076e5afb3bc0fba47ab8e71975.jpg#28700d076e5afb3bc0fba47ab8e71975"
          className="w-40 h-40"
          alt="musician-img"
        />

        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/52b106f7b3b3b41fa298ca16ce0dc6e4.jpg#52b106f7b3b3b41fa298ca16ce0dc6e4"
          className="w-40 h-40"
          alt="musician-img"
        />

        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/81a09737009d022561ff5d54055a405b.jpg#81a09737009d022561ff5d54055a405b"
          className="w-40 h-40"
          alt="musician-img"
        />

        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/05646a91f163b15d9f08642bbe170abf.jpg#05646a91f163b15d9f08642bbe170abf"
          className="w-40 h-40"
          alt="musician-img"
        />
      </div>
      <Button
        name="become-musician"
        onClick={(e) => handleSubmit(e)}
        className="w-full h-20 mt-auto"
        type="submit">
        Join the club!
      </Button>
    </Container>
  );
};

// export const Screen1 = () => {
//   return (
//     <div className="shadow-md w-11/12 h-11/12">
//       <p className="text-main-important-text text-sm font-bold">STEP 1 OF 4</p>
//       <Title title="Genre" />
//       <p>Pick your genre!</p>
//       <CheckBox title="Pop" />
//       <CheckBox title="Rock" />
//       <CheckBox title="Indie" />
//       <CheckBox title="Metal" />
//       <CheckBox title="Electro" />
//       <CheckBox title="Folk" />
//       <CheckBox title="Country" />
//       <Button>Continue</Button>
//     </div>
//   );
// };

// export const Screen2 = () => {
//   return (
//     <div className="shadow-md w-11/12 h-11/12">
//       <p className="text-main-important-text text-sm font-bold">STEP 2 OF 4</p>
//       <Title title="Is your work explicit?" />
//       <p>Is your work explicit</p>
//       <CheckBox title="No, my work is not explicit" />
//       <CheckBox title="Yes, my work is explicit" />
//       <SecondaryButton>Back</SecondaryButton>
//       <Button>Continue</Button>
//     </div>
//   );
// };

// export const Screen3 = () => {
//   return (
//     <div className="shadow-md w-11/12 h-11/12">
//       <p className="text-main-important-text text-sm font-bold">STEP 3 OF 4</p>
//       <Title title="Currencies??" />
//       <p>Pick your currency!</p>
//       <CheckBox title="Euro" />
//       <CheckBox title="US Dollars" />
//       <CheckBox title="Canadian Dollars" />
//       <CheckBox title="Australian Dollars" />
//       <SecondaryButton>Back</SecondaryButton>
//       <Button>Continue</Button>
//     </div>
//   );
// };

// export const Screen4 = () => {
//   return (
//     <div className="shadow-md w-11/12 h-11/12">
//       <p className="text-main-important-text text-sm font-bold">STEP 4 OF 4</p>
//       <Title title="Social Medias" />
//       <p>Do you want to connect any social medias?</p>
//       <SocialLink icon={<FaFacebook />} name="Facebook" connected={false} />
//       <SocialLink icon={<FaInstagram />} name="Instagram" connected={false} />
//       <SocialLink icon={<FaTwitch />} name="Twitch" connected={false} />
//       <SocialLink icon={<FaTwitter />} name="Twitter" connected={false} />
//       <SocialLink icon={<FaTiktok />} name="TikTok" connected={false} />
//       <SocialLink icon={<FaYoutube />} name="Youtube" connected={false} />
//       <SocialLink icon={<FaSpotify />} name="Spotify" connected={true} />
//       <SecondaryButton>Back</SecondaryButton>
//       <Button>Continue</Button>
//     </div>
//   );
// };
