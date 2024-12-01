'use client'
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ApiRoutes from '../components/Api';
import Header from '../components/header';

const Page = () => {
  const [isRegister, setIsRegister] = useState(false); // Quản lý trạng thái hiển thị form
  const [passwordError, setPasswordError] = useState('');
// Handle Login
  const handleLogin = async (username: string, password: string, rememberMe: boolean) => {
    // alert(`Email: ${email}\nPassword: ${password}\nRemember Me: ${rememberMe}`);
    const body = {
      username: username,
      password: password,
    }    
    try {
      const response = await fetch (ApiRoutes.login, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data.data.accessToken);
        // const { accessToken } = data.token;
        // console.log('Access Token:', accessToken);

        // sessionStorage.setItem('accessToken', accessToken);

        //remember me
        if(rememberMe) {
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

// Handle Register 

  const handleRegister = async (username: String, password: String, fullname:String, email: String) => {
    try {
        const response = await fetch(ApiRoutes.register, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            username: username,
            "password": password,
            "fullname": fullname,
            "email": email,
            "avatar": ""
          })
        })
        if(response.ok) {
          const data = await response.json();
          console.log('Registration successful', data);
        }
      }
    catch (error) {
      console.error('Error during registration:', error);
      
      // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
      // alert(error.message || 'Registration failed, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Header/>
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome to AL1.com</h1>

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
    </div>
  );
};

export default Page;

// import { signup } from '@/app/actions/auth'
 
// export function SignupForm() {
//   return (
//     <form action={signup}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input id="name" name="name" placeholder="Name" />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" name="email" type="email" placeholder="Email" />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input id="password" name="password" type="password" />
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   )
// }