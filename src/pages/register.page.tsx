import React, { useState } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import { User } from '../constants/types';
import { register } from '../services/api-calls';
import { LoginInput } from './login.page';
import Logo from '../assets/icon.svg';
export default function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation((user: User) => register(user), {
    onSuccess: (res: any) => {
      if (res.status === 403) {
        toast('Something went wrong....', { type: 'error' });
        return;
      }
      queryClient.invalidateQueries('auth');
      toast('Welcome to the Musicians family!', { type: 'success' });
      navigate('/login');
    },
    onError: () => {
      toast('Something went wrong...', { type: 'error' });
    },
  });

  const [registeringUser, setRegisteringUser] = useState<User>({
    email: '',
    password: '',
    roleName: 'User',
    name: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(registeringUser);
  }

  return (
    <Container className="items-center">
      <div className={`text-4xl font-bold flex md:hidden my-20 text-main-dark-1 dark:text-main-1`}>
        <img src={Logo} loading={'lazy'} className="w-9 h-9 mr-1 object-cover" alt="logo" />
        Musicians
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex sm:px-4 md:px-8 lg:px-32 xl:px-48 md:py-24 flex-col z-20 w-10/12 md:w-full lg:w-10/12 xl:w-9/12 mb-20 h-full px-10 items-center justify-center">
        <LoginInput
          icon={<FiUser className="w-5 h-5" />}
          name="name"
          placeholder="Name"
          type="text"
          onChange={(e: any) => {
            setRegisteringUser({ ...registeringUser, name: e.target.value });
          }}
        />
        <LoginInput
          icon={<FiUser className="w-5 h-5" />}
          name="email"
          placeholder="Email"
          type="email"
          onChange={(e: any) => {
            setRegisteringUser({ ...registeringUser, email: e.target.value });
          }}
        />
        <LoginInput
          icon={<FiLock className="w-5 h-5" />}
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            setRegisteringUser({ ...registeringUser, password: e.target.value });
          }}
        />

        <div className="w-full my-8">
          <Button
            name="register-button"
            children="Register"
            className="w-full h-14"
            type="submit"
          />
        </div>
        <div className="my-7">
          <Link data-cy="link-to-login" to="/login">
            <p>Already have an Account?</p>
          </Link>
        </div>
      </form>
    </Container>
  );
}
