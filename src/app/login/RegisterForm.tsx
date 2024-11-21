// RegisterForm.tsx
import { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (username: String, password: String, fullname:String, email: String) => void;
  passwordError: string;
  setPasswordError: (error: string) => void;
  // setPasswordError2: (error: string) => void;
}

const RegisterForm = ({ onSubmit, passwordError, setPasswordError}: RegisterFormProps) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Error, setError] = useState('');
  //Password regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  
  const handleSubmit = () => {
    // if (password !== confirmPassword) {
    //   setPasswordError('Passwords do not match!');
    //   return;
    // } else if (!passwordRegex.test(password)) {
    //   setPasswordError('Password must be at least 8 characters long, include uppercase, lowercase and a number.');
    //   return;
    // }
    onSubmit(username, password, fullname, email);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="name"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email Address"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">User Name</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="User Name"
        />
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
          }}
          onBlur={() => {
            // Kiểm tra Regex khi người dùng rời khỏi input field
            if (passwordRegex.test(password) || password =="") {
              setPasswordError(''); // Ẩn lỗi nếu mật khẩu hợp lệ
            }
            else {
              setPasswordError(
                'Password must be at least 8 characters long, include uppercase, lowercase and a number.'
              ); // Hiển thị lỗi nếu mật khẩu không hợp lệ
            }
          }}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
        />
        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => {
            // Kiểm tra Regex khi người dùng rời khỏi input field
            if (confirmPassword === password || confirmPassword == '') {
              setError(""); // Ẩn lỗi nếu mật khẩu hợp lệ
            }
            else {
              setError('Passwords do not match!'); // Hiển thị lỗi nếu mật khẩu không hợp lệ
            }
          }}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm Password"
        />
        {Error && <p className="text-red-500 text-sm mt-2">{Error}</p>}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
