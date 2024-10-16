"use client";
import { FC, useState } from "react";
import scss from "./Trending.module.scss";
import { useKeenSlider } from "keen-slider/react";
import { useGetTrendingQuery } from "@/redux/api/trending";
import dayjs from "dayjs";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useRouter } from "next/navigation";
import CircularRating from "@/ui/Raiting/CircularRating";
import { useGetGanreMovieQuery, useGetGanreTvQuery } from "@/redux/api/ganre";
import Ganre from "@/ui/Ganre/Ganre";

const Trending: FC = () => {
  const [trending, setTrending] = useState("day");
  const { data, isLoading } = useGetTrendingQuery(trending);
  const { isMobile } = useHeaderStore();
  const router = useRouter();
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: isMobile ? 2.8 : 5,
      spacing: 15,
    },
  });

  return (
    <section className={scss.Trending}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.top}>
            <h1>Trending</h1>
            <div className={scss.switcher}>
              <button
                onClick={() => setTrending("day")}
                className={
                  trending === "day"
                    ? `${scss.button} ${scss.active}`
                    : `${scss.button}`
                }
              >
                Day
              </button>
              <button
                onClick={() => setTrending("week")}
                className={
                  trending === "week"
                    ? `${scss.button} ${scss.active}`
                    : `${scss.button}`
                }
              >
                Week
              </button>
            </div>
          </div>
          <div className={scss.bottom}>
            <div className={scss.keenSlider}>
              {isLoading ? (
                <h1>loading...</h1>
              ) : (
                <div ref={ref} className="keen-slider">
                  {data?.results.map((item, index) => (
                    <div key={index} className="keen-slider__slide">
                      <div
                        onClick={() => {
                          router.push(`/movie/${item.id}`);
                        }}
                        className={scss.slider}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                          alt="movie"
                        />
                        <div className={scss.rating}>
                          <CircularRating rating={item.vote_average} />
                        </div>
                        <div className={scss.ganre}>
                          <Ganre ganreId={item.genre_ids} type="movie" />
                        </div>
                        <h1>{item.original_title || item.name}</h1>
                        <span>
                          {dayjs(
                            item?.release_date || item?.first_air_date
                          ).format("MMM D, YYYY")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trending;
