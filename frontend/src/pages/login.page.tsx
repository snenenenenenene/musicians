import React, { useContext, useState } from 'react';
import { FiLock, FiUsers } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import { LoginData } from '../constants/types';
import { login } from '../services/api-calls';
import { GlobalContext } from '../services/store';
import Logo from '../assets/icon.svg';
export const LoginInput = ({
  icon,
  name,
  type,
  placeholder,
  onChange,
}: {
  icon: any;
  name: string;
  type: any;
  placeholder?: string;
  onChange: (e: any) => any;
}) => {
  return (
    <div className="relative m-4 w-full text-main-text dark:text-main-dark-text dark:focus-within:text-main-dark-important-text focus-within:text-main-important-text">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">{icon}</span>
      <input
        type={type}
        name={name}
        data-cy={name}
        className="py-4 z-40 w-full bg-transparent border-b border-main-text dark:border-main-dark-text pl-14 focus:outline-none"
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
};
export const Login = () => {
  const { setUser, setJwt } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation((user: LoginData) => login(user), {
    onSuccess: (res: any) => {
      if (res.status === 403) {
        toast('Wrong email or password', { type: 'error' });
        return;
      }
      setJwt(res.data.access_token);
      setUser(res.data.user_details);
      queryClient.invalidateQueries('auth');
      navigate('/account');
    },
    onError: () => {
      toast('Wrong email or password', { type: 'error' });
    },
  });

  const [loginUser, setLoginUser] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(loginUser);
  };

  return (
    <Container className="items-center">
      <div className={`text-4xl font-bold flex md:hidden my-20 text-main-dark-1 dark:text-main-1`}>
        <img src={Logo} loading={'lazy'} className="w-9 h-9 mr-1 object-cover" alt="logo" />
        Musicians
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex sm:px-4 md:px-8 lg:px-32 xl:px-48 md:py-24 flex-col z-20 w-10/12 md:w-full xl:w-9/12 mb-20 h-full px-10 items-center justify-center">
        <LoginInput
          icon={<FiUsers className="w-5 h-5" />}
          name="email"
          placeholder="Email"
          type="email"
          onChange={(e: any) => {
            setLoginUser({ ...loginUser, email: e.target.value });
          }}
        />
        <LoginInput
          icon={<FiLock className="w-5 h-5" />}
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            setLoginUser({ ...loginUser, password: e.target.value });
          }}
        />
        <div className="w-full my-8">
          <Button name="login-button" className="w-full h-14" type="submit">
            Login
          </Button>
        </div>
        <div className="my-7">
          <Link data-cy="link-to-register" to="/register">
            <p>Or Sign up</p>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
