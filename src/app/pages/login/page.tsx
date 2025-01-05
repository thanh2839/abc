'use client'
import { useState } from 'react';
import jwt from 'jsonwebtoken';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ApiRoutes from '@/app/services/Api';
import Header from '../../components/header';
import { Footer } from '../../components/Footer'


const Page = () => {
  const [isRegister, setIsRegister] = useState(false); // Quản lý trạng thái hiển thị form
  const [passwordError, setPasswordError] = useState('');


  // Handle Login
  const handleLogin = async (username: string, password: string, rememberMe: boolean) => {
    const body = {
      username: username,
      password: password,
    }
    try {
      const response = await fetch(ApiRoutes.login, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data.data.accessToken);
        const decode = jwt.decode(data.data.accessToken);
        const role = decode.roles[0]
        sessionStorage.setItem('role', role)
        sessionStorage.setItem('accessToken', data.data.accessToken);
        sessionStorage.setItem('UserId', data.data.id);
        sessionStorage.setItem('nameUser', data.data.fullname);
        sessionStorage.setItem('email', data.data.email);
        sessionStorage.setItem('avatar', data.data.avatar);

        window.location.href = '/pages/sellProduct';

        //remember me
        if (rememberMe) {
          localStorage.setItem('login', data)
        }
      }
      else {
        const errorData = await response.json();
        console.log(`Login failed: ${errorData.message || 'Unknown error'}`);
      }
    }
    catch (error) {
      console.log('Error during login:', error);
    }
  };

  // call Api Login lấy token
  const memberLogin = async (bodyLogin: any) => {
    try {
      const response = await fetch(ApiRoutes.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyLogin)
      })
      if (response.ok) {
        const data = await response.json();
        return data.data.accessToken;
      }
      else {
        const errorData = await response.json();
        console.log(`Login failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  }
  // call api update Member
  const memberPOST = async (memberId: number, memberToken: string | null, bodyMember: any) => {
    try {
      const response = await fetch(ApiRoutes.Member_Update(memberId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${memberToken}`
        },
        body: JSON.stringify(bodyMember)
      })
      if (!response.ok) {
        const errorData = await response.json();
        console.log(`Login failed: ${errorData.message || 'Unknown error'}`);
      }
      const memberInfor = await response.json();
      console.log("body: ", memberInfor)
    }
    catch (e) {
      console.log('Error during login:', e);
    }
  }

  // Handle Register 
  const handleRegister = async (username: String, password: String, fullname: String, email: String, gender: string, date: Date | undefined, memberTag: number[]) => {
    const body = {
      username: username,
      password: password,
      fullname: fullname,
      email: email,
      avatar: ""
    }
    const bodyMember = {
      gender: gender,
      dateOfBirth: date,
      bio: "",
      memberTags: memberTag,
    }
    const bodyLogin = {
      username: username,
      password: password,
    }
    console.log(body)
    try {
      const response = await fetch(ApiRoutes.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful', data.data.id);
        const memberToken = await memberLogin(bodyLogin);
        await memberPOST(data.data.id, memberToken, bodyMember);

        setIsRegister(false);
      }
    }
    catch (error) {
      console.error('Error during registration:', error);

    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div
          className={`bg-white shadow-lg rounded-lg p-8 ${isRegister ? 'w-[800px]' : 'w-96'
            } transition-all duration-300`}
        >
          <h1 className="text-2xl font-bold text-center mb-4">Welcome to Sentuary.com</h1>

          <div className="flex justify-between mb-6">
            <button
              onClick={() => setIsRegister(false)} // Hiển thị form đăng nhập
              className={`text-gray-700 pb-1 ${!isRegister ? 'font-bold border-b-2 border-blue-500' : 'font-normal'}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setIsRegister(true)} // Hiển thị form đăng ký
              className={`text-gray-700 pb-1 ${isRegister ? 'font-bold border-b-2 border-blue-500' : 'font-normal'}`}
            >
              Register
            </button>
          </div>

          {isRegister ? (
            <RegisterForm onSubmit={handleRegister} passwordError={passwordError} setPasswordError={setPasswordError} />
          ) : (
            <LoginForm onSubmit={handleLogin} />
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Page;

