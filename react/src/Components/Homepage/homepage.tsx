import React from 'react';
import {Carousel} from './HomepageComp/Carousel';
import {ContactAd} from './HomepageComp/ContactAd';
import {Explore} from './HomepageComp/ExploreBooks';
import {Heros} from './HomepageComp/heros';

const HomePage: React.FC = () => {
    return (
        <>
            <Explore/>
            <Carousel/>
            <Heros/>
            <ContactAd/>
        </>
    );
};

export default HomePage;
