import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@src/assets/logo";
import React from "react";

//************************************
// Description: Phần Header cho trang chung của người dùng.
//************************************

// Mảng lưu trữ thông tin chuyển hướng cho navigation section trên header.
//  const navigation = [
//   { name: "DS công bố", href: "/auction-list", current: false },
//   { name: "Sim sắp đấu giá", href: "/upcomming-auction-list", current: false },
//   { name: "Kết quả đấu giá", href: "/auction/completed", current: false },
//   { name: "Thông báo đấu giá", href: "/", current: false },
// ];

function CommonHeader() {
  const token = localStorage.getItem("token");

  const logoutFunc = (token) => {
    if (token) {
      localStorage.removeItem("token");
    }
  };

  return (
    <Disclosure as="nav" className="bg-background z-50">
      {({ open }) => (
        <>
          <div className="lg:mx-2 mx-auto px-4 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <a
                href="/"
                className="text-black flex text-bold text-4xl font-logo"
              >
                <Logo />
              </a>

              <div className="absolute right-0 flex lg:relative lg:block">
                {!token && (
                  <Disclosure.Button className="flex items-center float-right rounded-lg p-2 hover:text-currentText text-orange-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <a href="/signup" className="font-bold">
                      Register
                    </a>
                  </Disclosure.Button>
                )}
                {/* Nút đăng nhập --> Chuyển hướng sang trang đăng nhập tài khoản. */}
                <Disclosure.Button
                  onClick={logoutFunc}
                  className="flex items-center float-right rounded-lg p-2 hover:text-currentText text-orange-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <a href="/login" className="font-bold">
                    {token ? "Log out" : "Log in"}
                  </a>
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default CommonHeader;
export {};
