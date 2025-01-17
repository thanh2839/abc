// LoginForm.tsx
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginFormProps {
  onSubmit: (username: string, password: string, rememberMe: boolean) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    onSubmit(username, password, rememberMe);
  };

  return (

    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
        <input
          type="email"
          id="email"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tên đăng nhập"
        />
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="flex items-center justify-between mb-6">
        {/* <label className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          Remember password
        </label> */}
        <button className="text-blue-500 text-sm font-medium">Quên mật khẩu?</button>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Đăng nhập
      </button>
    </form>
  );
};

export default LoginForm;
