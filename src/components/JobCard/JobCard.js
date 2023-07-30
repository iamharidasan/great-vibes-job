import React, { Fragment, useState } from "react"
import axios from "axios"
import Modal from "../Modal/Modal"
import Edit from "../Edit/Edit"

const JobCard = ({
  companyName,
  employees,
  experience,
  image,
  industry,
  internal,
  location,
  salary,
  timings,
  title,
  jobtype,
  id,
  callback,
}) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [screen, setScreen] = useState(1)
  const dismissModal = () => {
    setShowEditModal((prevState) => false)
  }
  const postUpdate = () => {
    callback()
    dismissModal()
  }

  const deleteJob = async (id) => {
    const result = window.confirm("Are you sure to delete?")
    if (result) {
      await axios
        .delete("https://64c4c75a67cfdca3b660f669.mockapi.io/jobs/" + id)
        .then((response) => {
          callback()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  return (
    <Fragment>
      <div className="pl-4 pr-4 mb-8 grow-0 shrink-0 basis-6/12">
        <div className="rounded-lg overflow-hidden shadow-sm bg-white px-6 py-4 group/editDelete">
          <div className="flex flex-row">
            <div className="basis-1/12">
              <img
                className="w-12"
                src={image ? image : "https://placehold.co/48"}
                alt="Sunset in the mountains"
              />
            </div>
            <div className="basis-10/12">
              <h2 className="font-normal text-black text-2xl">{title}</h2>
              <p className="font-normal mb-0 text-black text-base">
                {companyName}
                {industry && "-" + industry}
              </p>
              <p className="font-normal text-grey7a text-base mb-6">
                {location} ({jobtype})
              </p>
              <p className="font-normal mb-2 text-lightblack text-base">
                {timings}
              </p>
              <p className="font-normal mb-2 text-lightblack text-base">
                Experience ({experience.from} - {experience.to} years)
              </p>
              <p className="font-normal mb-2 text-lightblack text-base">
                INR (&#8377;){salary.from} - {salary.to} / Month
              </p>
              <p className="font-normal mb-6 text-lightblack text-base">
                {employees} employees
              </p>
              {internal ? (
                <p className="mt-0">
                  <button className="inline-block shadow-sm py-2 px-4 border border-solid border-skyblue rounded-md text-white bg-skyblue hover:text-skyblue hover:bg-white transition-all duration-500">
                    Apply Now
                  </button>
                </p>
              ) : (
                <p className="mt-4">
                  <button className="inline-block shadow-sm py-2 px-4 border border-solid border-skyblue rounded-md text-skyblue bg-white hover:text-white hover:bg-skyblue transition-all duration-500">
                    External Apply
                  </button>
                </p>
              )}
            </div>
            <div className="basis-1/12">
              <button
                onClick={(e) => setShowEditModal(true)}
                className="invisible group-hover/editDelete:visible"
              >
                Edit
              </button>
              <button
                onClick={(e) => deleteJob(id)}
                className="invisible group-hover/editDelete:visible"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <Modal
          modalId="edit"
          className="visible"
          dismissModal={dismissModal}
          title={`Edit job: ${title}`}
          screenNumber={screen}
        >
          <Edit
            screen={screen}
            setScreen={setScreen}
            id={id}
            callback={postUpdate}
          />
        </Modal>
      )}
    </Fragment>
  )
}

export default JobCard
