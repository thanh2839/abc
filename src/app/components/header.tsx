import * as React from "react";

const Header = () => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-10 justify-center items-center px-2.5 py-8 w-full bg-white min-h-[100px] max-md:max-w-full">
      <h1 className="self-stretch my-auto text-2xl text-stone-900">
        SENTUARY
      </h1>
      <nav className="flex gap-10 items-start self-stretch my-auto text-lg font-medium whitespace-nowrap min-w-[240px] text-stone-900 text-opacity-50">
        <a href="/" className="text-stone-900">Home</a>
        <a href="/products">Products</a>
        <a href="/contacts">Contacts</a>
      </nav>
      <div className="flex gap-10 items-center self-stretch my-auto">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e3336ab25626fe3b5c5abb853a09d644e965873a3f36238841e482a47f674aa1?apiKey=107937b03e68408b93e8f13d8a143773&"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/107614b8bd30b90ad6042f214756f9a599c97b7a03136ceddecbf8c855dab209?apiKey=107937b03e68408b93e8f13d8a143773&"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="shrink-0 self-stretch my-auto w-0 h-6 border border-solid bg-stone-900 border-stone-900" />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c1cddf7c5f7acc137287dd0bd39afefe86c82c18d43208f970203d73fb8cdb52?apiKey=107937b03e68408b93e8f13d8a143773&"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
      </div>
    </header>
  );
}

export default Header;