import React from 'react';
import { Button, Input } from '../components/Form';
import { BiLogInCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo">
        <img
          src="/images/slide-bar.png"
          alt="logo"
          className="w-64 h-64 object-contain"
        />
        <div className="flex flex-col gap-4 w-full mb-6">
          <Input
            label="Email"
            type="email"
            color={true}
            placeholder={'admin@gmail.com'}
          />
          <Input
            label="Password"
            type="password"
            color={true}
            placeholder={'*********'}
          />
        </div>
        <Button
          label="Login"
          Icon={BiLogInCircle}
          onClick={() => navigate('/dashboard')}
        />
      </form>
    </div>
  );
}

export default Login;
