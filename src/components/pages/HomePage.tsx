import Popular from "./homeSections/Popular";
import TopRated from "./homeSections/TopRated";
import Trending from "./homeSections/Trending";
import Welcome from "./homeSections/Welcome";

const HomePage = () => {
  return (
    <div>
      <Welcome />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default HomePage;
