import React from "react"
import PropTypes from "prop-types"
import JobCard from "../JobCard/JobCard"

const Listing = ({ jobs, callback }) => {
  return (
    <div className="flex flex-row flex-wrap py-8 -ml-4 -mr-4">
      {jobs &&
        jobs.length > 0 &&
        jobs.map((job, index) => (
          <JobCard
            key={index}
            companyName={job.companyName}
            employees={job.employees}
            experience={job.experience}
            image={job.image}
            industry={job.industry}
            internal={job.internal}
            location={job.location}
            salary={job.salary}
            timings={job.timings}
            title={job.title}
            jobtype={job.type}
            id={job.id}
            callback={callback}
          />
        ))}
    </div>
  )
}

Listing.propTypes = {
  jobs: PropTypes.array,
}

export default Listing
