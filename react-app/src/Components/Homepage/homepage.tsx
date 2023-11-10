import { Carousel } from "./HomepageComp/Carousel";
import { ContactAd } from "./HomepageComp/ContactAd";
import { Explore } from "./HomepageComp/ExploreBooks";
import { Heros } from "./HomepageComp/heros";

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
