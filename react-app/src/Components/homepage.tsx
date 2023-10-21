import { Carousel } from "./Homepage/Carousel";
import { ContactAd } from "./Homepage/ContactAd";
import { Explore } from "./Homepage/ExploreBooks";
import { Heros } from "./Homepage/heros";

export const HomePage = () => {
  return (
    <>
      <Explore />
      <Carousel />
      <Heros />
      <ContactAd />
    </>
  );
};
