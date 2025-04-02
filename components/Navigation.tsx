"use client";
import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { FcAbout } from "react-icons/fc";
import { useRouter } from "next/navigation";

export const Navigation = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const Menus = [
    { title: "Home", link: "/dashboard" },
    {
      title: "Barang",
      icon: <LuBoxes />,
      submenu: true,
      link: "/goods",
      submenuItems: [{ title: "Daftar Barang" }, { title: "Tambah Barang" }],
    },
    {
      title: "Transaksi",
      submenu: true,
      link: "/transaction",
      icon: <GrTransaction />,
      submenuItems: [
        { title: "Daftar Transaksi" },
        { title: "Buat Transaksi" },
      ],
    },
    { title: "Laporan", icon: <TbReport />, link: "/report" },
    { title: "About", icon: <FcAbout />, link: "/about" },
  ];
  return (
    <div
      className={`bg-dark-purple h-screen p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`bg-white text-dark-purple text-3xl 
        rounded-full absolute -right-3 top-9 border 
      border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex">
        <AiFillEnvironment
          className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
            !open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Loma Gemi
        </h1>
      </div>

      <div
        className={`flex items-center rounded-md bg-light-white mt-6 ${
          open ? "px-4" : "px-2.5"
        } py-2`}
      >
        <BsSearch
          className={`text-white text-lg block float-left cursor-pointer ${
            open && "mr-2"
          }`}
        />
        <input
          type={"search"}
          placeholder="Cari"
          className={`bg-transparent w-full text-base text-white focus:outline-none ${
            !open && "hidden"
          }`}
        />
      </div>
      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className="text-gray-300 text-sm flex 
            items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
          >
            <span
              className="text-2xl block float-left"
              onClick={() => {
                router.push(menu.link);
              }}
            >
              {menu.icon ? menu.icon : <MdDashboard />}
            </span>
            <span
              className={`text-base font-medium flex-1 ${!open && "hidden"}`}
              onClick={() => {
                router.push(menu.link);
              }}
            >
              {menu.title}
            </span>
            {menu.submenu && <BsChevronDown className="" onClick={() => {}} />}
          </li>
        ))}
      </ul>
    </div>
  );
};
