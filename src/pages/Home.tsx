import React from "react"
import Hero from "../components/Hero"
import TrainingFormat from "../components/TrainingFormat"
import Teachers from "../components/Teachers"
import Pricing from "../components/Pricing"
import InterestingFacts from "../components/InterestingFacts"
import Reviews from "../components/Reviews"

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <TrainingFormat />
      <Teachers />
      <Pricing />
      <InterestingFacts />
      <Reviews />
    </div>
  )
}

export default Home
