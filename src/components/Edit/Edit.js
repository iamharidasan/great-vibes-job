import axios from "axios"
import React, { Fragment, useState, useEffect } from "react"

const Edit = ({ screen, setScreen, callback, id }) => {
  const [formData, setFormData] = useState({
    image: "https://www.freepnglogos.com/uploads/netflix-logo-app-png-16.png",
    title: "",
    companyName: "",
    industry: "",
    location: "",
    type: "",
    experience: { from: "", to: "" },
    salary: { from: "", to: "" },
    employees: "",
    internal: null,
    timings: "",
  })
  const [formErrors, setFormErrors] = useState({
    title: null,
    companyName: null,
    industry: null,
  })

  useEffect(() => {
    getJobDetail(id)
  }, [id])

  const getJobDetail = async (id) => {
    const result = await axios.get(`/jobs/${id}`)
    setFormData((prevState) => result.data)
  }
  const nextPageHandler = () => {
    if (formData.title === null || formData.title === "") {
      setFormErrors((prevState) => {
        return {
          ...prevState,
          title: "Job Title is required",
          validated: false,
        }
      })
    } else {
      setFormErrors((prevState) => {
        return { ...prevState, title: null }
      })
    }
    if (formData.companyName === null || formData.companyName === "") {
      setFormErrors((prevState) => {
        return {
          ...prevState,
          companyName: "Company Name is required",
        }
      })
    } else {
      setFormErrors((prevState) => {
        return { ...prevState, companyName: null }
      })
    }
    if (formData.industry === null || formData.industry === "") {
      setFormErrors((prevState) => {
        return {
          ...prevState,
          industry: "Industry is required",
        }
      })
    } else {
      setFormErrors((prevState) => {
        return { ...prevState, industry: null }
      })
    }
    if (
      formData.title !== "" &&
      formData.companyName !== "" &&
      formData.industry !== ""
    ) {
      setScreen((prevState) => 2)
    }
  }

  const inputHandler = (e) => {
    if (e.target.name === "experience-from") {
      setFormData((prevState) => {
        return {
          ...prevState,
          experience: { from: e.target.value, to: prevState.experience.to },
        }
      })
    } else if (e.target.name === "experience-to") {
      setFormData((prevState) => {
        return {
          ...prevState,
          experience: { to: e.target.value, from: prevState.experience.from },
        }
      })
    } else if (e.target.name === "salary-from") {
      setFormData((prevState) => {
        return {
          ...prevState,
          salary: { from: e.target.value, to: prevState.salary.to },
        }
      })
    } else if (e.target.name === "salary-to") {
      setFormData((prevState) => {
        return {
          ...prevState,
          salary: { to: e.target.value, from: prevState.salary.from },
        }
      })
    } else {
      setFormData((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value }
      })
    }
  }
  const radioHandler = (e) => {
    setFormData((prevState) => {
      return { ...prevState, internal: e.target.value === "yes" ? true : false }
    })
  }

  const upDateHandler = async () => {
    let data = JSON.stringify(formData)
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://64c4c75a67cfdca3b660f669.mockapi.io/jobs/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }
    await axios
      .request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data))
        callback()
        setScreen(1)
        setFormData((prevState) => {
          return {
            ...prevState,
            title: "",
            companyName: "",
            industry: "",
            location: "",
            type: "",
            experience: { from: "", to: "" },
            salary: { from: "", to: "" },
            employees: "",
            internal: true,
            timings: "",
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <form>
      {screen === 1 ? (
        <Fragment>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="font-medium text-sm">
              Job Title <span className="text-alertred">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                placeholder="ex. UX UI Designer"
                id="jobTitle"
                name="title"
                value={formData.title}
                onChange={inputHandler}
              />
            </div>
            {formErrors.title !== null && (
              <span className="text-alertred text-xs">{formErrors.title}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="jobCompanyName" className="font-medium text-sm">
              Company Name <span className="text-alertred">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                placeholder="ex. Google"
                id="jobCompanyName"
                name="companyName"
                value={formData.companyName}
                onChange={inputHandler}
              />
              {formErrors.companyName !== null && (
                <span className="text-alertred text-xs">
                  {formErrors.companyName}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="jobIndustry" className="font-medium text-sm">
              Industry <span className="text-alertred">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                placeholder="ex. Information Technology"
                id="jobIndustry"
                name="industry"
                value={formData.industry}
                onChange={inputHandler}
              />
              {formErrors.industry != null && (
                <span className="text-alertred text-xs">
                  {formErrors.industry}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/2 pr-6">
              <label htmlFor="jobLocation" className="font-medium text-sm">
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                  placeholder="ex. Chennai"
                  id="jobLocation"
                  name="location"
                  value={formData.location}
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className="basis-1/2">
              <label htmlFor="jobRemoteType" className="font-medium text-sm">
                Remote Type
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                  placeholder="ex. In-office"
                  id="jobRemoteType"
                  name="type"
                  value={formData.type}
                  onChange={inputHandler}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-24">
            <button
              className="inline-block shadow-sm py-2 px-4 border border-solid border-skyblue rounded-md text-white bg-skyblue hover:text-skyblue hover:bg-white transition-all duration-500"
              type="button"
              onClick={nextPageHandler}
            >
              Next
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-row mb-4">
            <div className="basis-1/2 pr-6">
              <label htmlFor="jobExperience" className="font-medium text-sm">
                Experience
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                  placeholder="Minimum"
                  id="jobExperience"
                  name="experience-from"
                  value={formData.experience.from}
                  onChange={inputHandler}
                />
                {formErrors.title !== null && (
                  <span className="text-alertred text-xs">
                    {formErrors.title}
                  </span>
                )}
              </div>
            </div>
            <div className="basis-1/2">
              <label htmlFor="jobRemoteType" className="font-medium text-sm">
                &nbsp;
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                  placeholder="Maximum"
                  name="experience-to"
                  value={formData.experience.to}
                  onChange={inputHandler}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row mb-4">
            <div className="basis-1/2 pr-6">
              <label htmlFor="jobSalary" className="font-medium text-sm">
                Salary
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                  placeholder="Minimum"
                  id="jobSalary"
                  name="salary-from"
                  value={formData.salary.from}
                  onChange={inputHandler}
                />
                {formErrors.title !== null && (
                  <span className="text-alertred text-xs">
                    {formErrors.title}
                  </span>
                )}
              </div>
            </div>
            <div className="basis-1/2">
              <label htmlFor="jobRemoteType" className="font-medium text-sm">
                &nbsp;
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                  placeholder="Maximum"
                  name="salary-to"
                  value={formData.salary.to}
                  onChange={inputHandler}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="jobTimings" className="font-medium text-sm">
              Timings
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                placeholder="ex. Part-Time (9.00 am - 5.00 pm IST)"
                id="jobTimings"
                name="timings"
                value={formData.timings}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="jobTotalEmployee" className="font-medium text-sm">
              Total Employee
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="border border-solid border-greyborder w-full placeholder:text-grey7a text-sm px-3 py-2"
                placeholder="ex. 100"
                id="jobTotalEmployee"
                name="employees"
                value={formData.employees}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-medium text-sm">Apply Type</label>
            <div className="mt-1">
              <input
                type="radio"
                className="border border-solid border-greyborder placeholder:text-grey7a text-sm px-3 py-2 inline"
                id="quickApplyType"
                name="internal"
                value="yes"
                checked={formData.internal ? "checked" : ""}
                onChange={radioHandler}
              />
              <label
                htmlFor="quickApplyType"
                className="ml-1 mr-4 font-sm text-grey7a"
              >
                Quick apply
              </label>
              <input
                type="radio"
                className="border border-solid border-greyborder placeholder:text-grey7a text-sm px-3 py-2 inline"
                id="externalApplyType"
                name="internal"
                value="no"
                checked={formData.internal ? "" : "checked"}
                onChange={radioHandler}
              />
              <label
                htmlFor="externalApplyType"
                className="ml-1 font-sm text-grey7a"
              >
                External apply
              </label>
            </div>
          </div>
          <div className="flex justify-end mt-24">
            <button
              className="inline-block shadow-sm py-2 px-4 border border-solid border-skyblue rounded-md text-white bg-skyblue hover:text-skyblue hover:bg-white transition-all duration-500"
              type="button"
              onClick={upDateHandler}
            >
              Update
            </button>
          </div>
        </Fragment>
      )}
    </form>
  )
}

export default Edit
