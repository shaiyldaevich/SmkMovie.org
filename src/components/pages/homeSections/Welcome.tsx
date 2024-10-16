"use client";
import { useEffect, useState } from "react";
import scss from "./Welcome.module.scss";
import Typed from "typed.js";
import Image from "next/image";
import { useGetUpcomingQuery } from "@/redux/api/upcomi";
import React from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const { data } = useGetUpcomingQuery();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const backgroundRandomImage = () => {
    if (data?.results) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const backdropImage = data.results[randomIndex].backdrop_path;
      setBackgroundImage(`https://image.tmdb.org/t/p/original${backdropImage}`);
    }
  };

  useEffect(() => {
    backgroundRandomImage();
  }, [data]);

  useEffect(() => {
    const typed = new Typed(".multiple-text", {
      strings: [
        "Get Ready for Cinematic Bliss",
        "Welcome to EcoMovie - Enjoy the Show!",
        "Discover Movie Magic at EcoMovie",
      ],
      typeSpeed: 50,
      backSpeed: 10,
      backDelay: 1200,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className={scss.BG}>
        {backgroundImage ? (
          <Image
            className={scss.bgImage}
            src={backgroundImage}
            alt="movieImage"
            width={1920}
            quality={70}
            height={750}
            priority
            loading="eager"
          />
        ) : (
          <span className={scss.loader}></span>
        )}
      </div>
      <section className={scss.Welcome}>
        <div className="container">
          <div className={scss.content}>
            <h1>
              <span className="multiple-text"></span>
            </h1>
            <h4>
              Millions of movies, TV shows and people to discover. Explore now.
            </h4>
            <div className={scss.search_movie}>
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search for a movie or tv show...."
              />
              <button onClick={() => router.push(`/search/${searchValue}`)}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
