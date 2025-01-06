'use client'
import * as React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client';

const Header = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const UserId = sessionStorage.getItem('UserId')
  useEffect(() => {
    // This ensures the code runs only in the browser
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('accessToken');
      setAccessToken(token);

    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const getNotifications = async () => {
      try {
        const userId = 437
        const response = await fetch(
          `http://localhost:3001/api/notification/getAll/${UserId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        console.log(data);

        // Lưu toàn bộ đối tượng thông báo
        if (data.errorCode === 0) {
          setNotifications(data.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const socket = io(`ws://localhost:3001`, {
      query: { token },
    });

    socket.on('connect', () => {
      console.log('Socket connected: ', socket.id);
      getNotifications(); // Gọi lại API khi kết nối socket
    });

    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      // Lưu toàn bộ đối tượng thông báo từ socket
      setNotifications((prevNotifications) => {
        const updatedNotifications = [data, ...prevNotifications];
        setHasNewNotification(true);
        return updatedNotifications;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const handleClickButton = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setHasNewNotification(false); // Đánh dấu là đã mở thông báo, không còn mới
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false); // Đóng dropdown nếu click ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const Token = sessionStorage.getItem('accessToken')
  // console.log(Token)
  // const username = sessionStorage.getItem('nameUser') || ""
  // const email = sessionStorage.getItem('email') || ""
  // const Aavatar = sessionStorage.getItem('avatar') || 'https://res.cloudinary.com/dsymtu3j5/image/upload/v1735603112/jhwzpv1ktpvydjr6la7d.jpg';
  return (
    <header className="flex justify-between items-center px-4 py-8 w-full bg-white min-h-[100px]">
      <a href="/pages/shop">
        <h1 className="text-2xl font-bold text-stone-900 ml-11">SENTUARY</h1>
      </a>


      <nav className="flex gap-10 items-center text-lg font-medium text-stone-900 text-opacity-50">
        <Link href="/pages/shop" className="text-stone-900">Home</Link>
        <Link href="/pages/sellProduct">Sản phẩm</Link>
        <a href="/pages/shop">Liên hệ</a>
      </nav>

      <div className="flex gap-6 items-center mr-11">
        {accessToken && (
          <Link href="/pages/Cart">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e3336ab25626fe3b5c5abb853a09d644e965873a3f36238841e482a47f674aa1?apiKey=107937b03e68408b93e8f13d8a143773&"
              alt="Cart"
              className="w-6 h-6 object-contain"
            />
          </Link>
        )}

        {!accessToken && (
          <Link href="/pages/login">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/107614b8bd30b90ad6042f214756f9a599c97b7a03136ceddecbf8c855dab209?apiKey=107937b03e68408b93e8f13d8a143773&"
              alt="Login"
              className="w-6 h-6 object-contain"
            />
          </Link>
        )}

        <div className="w-0 h-6 border-l border-stone-900"></div>
        {/* Notification Dropdown wrapper */}
        <div className="relative group">
          <div className="flex items-center">
            <button
              ref={buttonRef}
              className="w-6 h-6 rounded-full flex items-center justify-center"
              onClick={handleClickButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  d="M18 16V8a6 6 0 0 0-12 0v8a2 2 0 0 0-2 2h16a2 2 0 0 0-2-2z"
                />
                <path
                  d="M12 20a2 2 0 1 0-2-2 2 2 0 0 0 2 2z"
                />
              </svg>

              {/* Dấu thông báo mới */}
              {hasNewNotification && (
                <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500"></div>
              )}
            </button>
          </div>

          {/* Dropdown thông báo */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="
            absolute right-0 mt-3 w-96
            bg-white 
            rounded-lg 
            shadow-lg 
            overflow-hidden
            opacity-100 visible 
            transition-all duration-300 ease-in-out
            z-50
          "
            >
              <div className="py-2">
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-2 text-gray-600">Không có thông báo</li>
                  ) : (
                    notifications.map((notification: any, index: number) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-gray-600 border-b last:border-b-0"
                      >
                        {/* Thẻ <a> với href để điều hướng */}
                        <a
                          onClick={() => {
                            // Chuyển trang với URL mong muốn
                            window.location.href = `/pages/userInfor?activePage=Đơn hàng của tôi`;
                          }}
                          className="block cursor-pointer"
                        >
                          {/* Hiển thị message */}
                          <span>{notification.message}</span>
                          {/* Hiển thị createAt */}
                          <span className="block text-xs text-gray-400 mt-1">
                            {new Date(notification.createAt).toLocaleString()} {/* Định dạng thời gian */}
                          </span>
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>

            </div>
          )}
        </div>

        {/* Avatar and Dropdown wrapper */}
        <div className="relative group">
          <div className="flex items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c1cddf7c5f7acc137287dd0bd39afefe86c82c18d43208f970203d73fb8cdb52?apiKey=107937b03e68408b93e8f13d8a143773&"
              alt="Profile"
              className="w-6 h-6 object-contain cursor-pointer"
            />
          </div>
          {accessToken && (
            <>
              <div
                className="
          absolute right-0 mt-3 w-56 
          bg-white 
          rounded-lg 
          shadow-lg 
          overflow-hidden
          opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible 
          transition-all duration-300 ease-in-out
          z-50
        "
              >
                <div className="py-2">
                  <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 flex items-center">
                    <img
                      // src="https://res.cloudinary.com/dsymtu3j5/image/upload/v1735603112/jhwzpv1ktpvydjr6la7d.jpg"
                      src={sessionStorage.getItem('avatar') || 'https://res.cloudinary.com/dsymtu3j5/image/upload/v1735603112/jhwzpv1ktpvydjr6la7d.jpg'}
                      alt="User"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{sessionStorage.getItem('nameUser')}</div>
                      <div className="text-xs text-gray-500">{sessionStorage.getItem('email')}</div>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <a
                        href="/pages/userInfor"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Thông tin
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href="/settings"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Settings
                      </a>
                    </li> */}
                    {/* <li>
                      <a
                        href="/pages/add-Product"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Add product
                      </a>
                    </li> */}
                    <li>
                      <a
                        href="/logout"
                        className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        onClick={(e) => {
                          e.preventDefault(); // Ngừng hành vi mặc định của thẻ <a>
                          sessionStorage.clear(); // Xóa tất cả dữ liệu trong sessionStorage
                          window.location.href = '/pages/shop'; // Điều hướng người dùng về trang chủ (hoặc trang đăng nhập)
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
