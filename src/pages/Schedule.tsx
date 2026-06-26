import React from "react"
import Hero from "../components/Hero"
import ClassSchedule from "../components/ClassSchedule"
import Pricing from "../components/Pricing"
import CoursePrograms from "../components/CoursePrograms"

const Schedule: React.FC = () => {
  return (
    <div className="schedule-page">
      <Hero />
      <ClassSchedule />
      <Pricing />
      <CoursePrograms />
    </div>
  )
}

export default Schedule
