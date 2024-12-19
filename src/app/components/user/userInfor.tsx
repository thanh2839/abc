'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import InputField from './inputField';
import { getUserInfo, deleteUserAccount } from './user';  // Thêm hàm deleteUserAccount từ file user

const UserInfor: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
    avatar: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const token = 'YOUR_ACCESS_TOKEN'; // Thay bằng token thực tế.

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(token);
        setUserInfo({
          username: data.username,
          password: data.password,
          fullname: data.fullname,
          email: data.email,
          avatar: data.avatar,
        });
        setPreviewImage(data.avatar); // Set ảnh avatar ban đầu
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    // Logic để cập nhật thông tin người dùng hoặc avatar ở đây.
    alert('Changes saved!');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await deleteUserAccount();  // Gọi API deleteUserAccount
        alert('Account deleted successfully');
        // Có thể thêm logic để điều hướng sau khi xóa tài khoản
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account.');
      }
    }
  };

  return (
    <main className="flex flex-col pb-32 bg-white max-md:pb-24">
      <header className="flex overflow-hidden flex-col justify-center items-start py-3.5 w-full text-2xl font-bold text-black bg-slate-300 max-md:max-w-full">
        <div className="flex flex-col px-12 max-md:px-5">
          <h1 className="gap-2.5 p-2.5">User Information</h1>
        </div>
      </header>

      <div className="self-center mt-12 w-full max-w-[1339px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <section className="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full font-medium max-md:mt-9 max-md:max-w-full">
              <form className="flex overflow-hidden flex-col items-start p-2.5 mt-14 w-full bg-white rounded max-md:mt-10 max-md:max-w-full">
                <InputField
                  label="Full name"
                  value={userInfo.fullname}
                  onChange={(e) => setUserInfo({ ...userInfo, fullname: e.target.value })}
                />
                <div className="mt-8">
                  <InputField
                    label="Email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                </div>
                <div className="mt-8">
                  <InputField
                    label="Password"
                    type="password"
                    value={userInfo.password}
                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                  />
                </div>
              </form>
              <div className="flex gap-4 justify-end items-center mt-12 mr-11 max-md:mr-2.5">
                <button
                  className="px-6 py-3 text-lg whitespace-nowrap rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleSaveChanges}
                >
                  Save
                </button>
                {/* Nút Delete Account */}
                <button
                  className="px-6 py-3 text-lg whitespace-nowrap rounded-lg bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </section>

          <aside className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-center px-4 py-14 m-auto w-full rounded-xl bg-slate-300 min-h-[576px] max-md:mt-10 max-md:max-w-full">
              <h2 className="text-4xl font-medium leading-none text-zinc-600">Avatar Preview</h2>
              <div className="flex flex-col items-center gap-6 mt-10">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Avatar Preview"
                    className="w-40 h-40 object-cover rounded-full border border-gray-300"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-gray-200 rounded-full border border-gray-300">
                    No Image
                  </div>
                )}
                <label htmlFor="upload-avatar" className="cursor-pointer px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-gray-400 mt-4">
                  Choose File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-avatar"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default UserInfor;
