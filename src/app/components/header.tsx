'use client'
import * as React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-8 w-full bg-white min-h-[100px]">
      <h1 className="text-2xl font-bold text-stone-900 ml-11">SENTUARY</h1>


      <nav className="flex gap-10 items-center text-lg font-medium text-stone-900 text-opacity-50">
        <Link href="/pages/shop" className="text-stone-900">Home</Link>
        <Link href="/pages/sellProduct">Products</Link>
        <a href="/pages/contacts">Contacts</a>
      </nav>

      <div className="flex gap-6 items-center mr-11">
        <Link href="/pages/cart">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e3336ab25626fe3b5c5abb853a09d644e965873a3f36238841e482a47f674aa1?apiKey=107937b03e68408b93e8f13d8a143773&"
            alt="Cart"
            className="w-6 h-6 object-contain"
          />
        </Link>

        <Link href="/pages/login">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/107614b8bd30b90ad6042f214756f9a599c97b7a03136ceddecbf8c855dab209?apiKey=107937b03e68408b93e8f13d8a143773&"
            alt="Login"
            className="w-6 h-6 object-contain"
          />
        </Link>

        <div className="w-0 h-6 border-l border-stone-900"></div>

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
                  src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c1cddf7c5f7acc137287dd0bd39afefe86c82c18d43208f970203d73fb8cdb52?apiKey=107937b03e68408b93e8f13d8a143773&"
                  alt="User"
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-gray-800">John Doe</div>
                  <div className="text-xs text-gray-500">john.doe@example.com</div>
                </div>
              </div>
              <ul>
                <li>
                  <a
                    href="/pages/userInfor"
                    className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    User Info
                  </a>
                </li>
                <li>
                  <a
                    href="/settings"
                    className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="/pages/add-Product"
                    className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Add product
                  </a>
                </li>
                <li>
                  <a
                    href="/logout"
                    className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



//abc 
// import * as React from "react";
// import Link from "next/link";

// const Header = () => {
//   // Trạng thái đăng nhập
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Thay đổi giá trị này sau khi login thành công

//   return (
//     <header className="flex justify-between items-center px-4 py-8 w-full bg-white min-h-[100px]">
//       <h1 className="text-2xl font-bold text-stone-900 ml-11">SENTUARY</h1>

//       <nav className="flex gap-10 items-center text-lg font-medium text-stone-900 text-opacity-50">
//         <Link href="/pages/shop" className="text-stone-900">Home</Link>
//         <Link href="/pages/products">Products</Link>
//         <a href="/pages/contacts">Contacts</a>
//       </nav>

//       <div className="flex gap-6 items-center mr-11">
//         <Link href="/pages/cart">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e3336ab25626fe3b5c5abb853a09d644e965873a3f36238841e482a47f674aa1?apiKey=107937b03e68408b93e8f13d8a143773&"
//             alt="Cart"
//             className="w-6 h-6 object-contain"
//           />
//         </Link>

//         {/* Chỉ hiển thị icon login khi chưa đăng nhập */}
//         {!isLoggedIn && (
//           <Link href="/pages/login">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/107614b8bd30b90ad6042f214756f9a599c97b7a03136ceddecbf8c855dab209?apiKey=107937b03e68408b93e8f13d8a143773&"
//               alt="Login"
//               className="w-6 h-6 object-contain"
//             />
//           </Link>
//         )}

//         <div className="w-0 h-6 border-l border-stone-900"></div>

//         {/* Avatar và Dropdown chỉ hiển thị khi đã đăng nhập */}
//         {isLoggedIn && (
//           <div className="relative group">
//             <div className="flex items-center">
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c1cddf7c5f7acc137287dd0bd39afefe86c82c18d43208f970203d73fb8cdb52?apiKey=107937b03e68408b93e8f13d8a143773&"
//                 alt="Profile"
//                 className="w-6 h-6 object-contain cursor-pointer"
//               />
//             </div>

//             <div
//               className="
//               absolute right-0 mt-3 w-56 
//               bg-white 
//               rounded-lg 
//               shadow-lg 
//               overflow-hidden
//               opacity-0 invisible 
//               group-hover:opacity-100 group-hover:visible 
//               transition-all duration-300 ease-in-out
//               z-50
//             "
//             >
//               <div className="py-2">
//                 <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 flex items-center">
//                   <img
//                     src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c1cddf7c5f7acc137287dd0bd39afefe86c82c18d43208f970203d73fb8cdb52?apiKey=107937b03e68408b93e8f13d8a143773&"
//                     alt="User"
//                     className="w-8 h-8 rounded-full mr-3"
//                   />
//                   <div>
//                     <div className="font-medium text-gray-800">John Doe</div>
//                     <div className="text-xs text-gray-500">john.doe@example.com</div>
//                   </div>
//                 </div>
//                 <ul>
//                   <li>
//                     <a
//                       href="/user-info"
//                       className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
//                     >
//                       User Info
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/settings"
//                       className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
//                     >
//                       Settings
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/logout"
//                       className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                     >
//                       Logout
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
