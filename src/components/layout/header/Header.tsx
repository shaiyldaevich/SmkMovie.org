"use client";
import scss from "./Header.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { links } from "@/constants/links";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { IoClose, IoMenu } from "react-icons/io5";

const Header = () => {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { isMobile, setIsMobile } = useHeaderStore();

  const changeIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
    // if (window.innerWidth <= 768) {
    //   setIsMobile(true);
    // } else {
    //   setIsMobile(false);
    // }
  };

  useEffect(() => {
    changeIsMobile();
    window.addEventListener("resize", changeIsMobile);
    return () => {
      window.removeEventListener("scroll", changeIsMobile);
    };
  }, []);
  return (
    <header
      className={
        mobileMenu ? `${scss.Header} ${scss.active}` : `${scss.Header}`
      }
    >
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.logo}>
              <Link href="/">
                <h1>Ai-Movie</h1>
              </Link>
            </div>
          </div>
          <div className={scss.right}>
            <nav className={scss.nav}>
              {!isMobile ? (
                <ul>
                  {links.map((item, index) => (
                    <li key={index}>
                      <Link
                        className={
                          pathname === item.href
                            ? `${scss.link} ${scss.active}`
                            : `${scss.link}`
                        }
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {session.data ? (
                    <div>
                      {session.data ? (
                        <img
                          onClick={() => setOpenMenu(!openMenu)}
                          style={{
                            width: "30px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          src={session.data.user?.image!}
                          alt="user"
                        />
                      ) : null}
                    </div>
                  ) : (
                    <button onClick={() => router.push("/api/auth/signin")}>
                      Sign in
                    </button>
                  )}
                </ul>
              ) : (
                <span
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className={scss.mobileMenu}
                >
                  {mobileMenu ? <IoClose /> : <IoMenu />}
                </span>
              )}
            </nav>
            {openMenu ? (
              <div onClick={() => setOpenMenu(false)} className={scss.openMenu}>
                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                >
                  Sign Out
                </button>
              </div>
            ) : null}
            <div
              onClick={() => setMobileMenu(false)}
              className={`${scss.mobile} ${mobileMenu ? scss.active : ""}`}
              aria-hidden={!mobileMenu}
            >
              <div className={scss.white}></div>
              <div className={scss.movieTv}>
                <Link href={"/explore/movie"}>Movie</Link>
                <Link href={"/explore/tv"}>TV Shows</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
