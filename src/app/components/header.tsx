import * as React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-8 w-full bg-white min-h-[100px]">
      {/* H1 sang bên trái */}
      <h1 className="text-2xl font-bold text-stone-900 ml-11">SENTUARY</h1>

      {/* Navigation ở giữa */}
      <nav className="flex gap-10 items-center text-lg font-medium text-stone-900 text-opacity-50">
        <Link href="/pages/shop" className="text-stone-900">Home</Link>
        <Link href="/pages/products">Products</Link>
        <a href="/pages/contacts">Contacts</a>
      </nav>

      {/* Các icon sang bên phải */}
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
        <Link href="/pages/">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c1cddf7c5f7acc137287dd0bd39afefe86c82c18d43208f970203d73fb8cdb52?apiKey=107937b03e68408b93e8f13d8a143773&"
            alt="Profile"
            className="w-6 h-6 object-contain"
          />
        </Link>
      </div>
    </header>

  );
}

export default Header;