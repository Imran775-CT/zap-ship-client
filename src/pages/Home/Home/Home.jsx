import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import ClientSlider from "../ClientSlider/ClientSlider";
import Features from "../FeaturesCard/Features";
import BeMarchant from "../BeMarchant/BeMarchant";
import CustomerSays from "../CustomerSays/CustomerSays";
import Quotes from "../QuotesSlider/Quotes";
import FAQ from "../FAQ/FAQ";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientSlider></ClientSlider>
      <Features></Features>
      <BeMarchant></BeMarchant>
      <CustomerSays></CustomerSays>
      <Quotes></Quotes>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
