import { useState, useEffect } from "react"
import Axios from "axios"
import Listing from "./components/Listing/Listing"
import Modal from "./components/Modal/Modal"
import Create from "./components/Create/Create"

function App() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    getJobs()
  }, [])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [screen, setScreen] = useState(1)
  const dismissModal = () => {
    setShowCreateModal((prevState) => false)
  }
  const getJobs = async () => {
    const results = await Axios.get("/jobs")
    setJobs(results.data)
  }
  const postCreate = () => {
    dismissModal()
    getJobs()
  }
  return (
    <div className="h-screen bg-grey font-display overflow-y-auto">
      <div className="container mx-auto">
        <div className="columns-1 pt-8">
          <button
            className="inline-block shadow-sm py-2 px-4 border border-solid border-skyblue rounded-md text-skyblue bg-white hover:text-white hover:bg-skyblue transition-all duration-500"
            onClick={(e) => setShowCreateModal((prevState) => !prevState)}
          >
            Create Job
          </button>
        </div>
        <Listing jobs={jobs} callback={getJobs} />
      </div>
      <Modal
        modalId="create"
        className={showCreateModal ? "visible" : "hidden"}
        dismissModal={dismissModal}
        title="Create a job"
        screenNumber={screen}
      >
        <Create screen={screen} setScreen={setScreen} callback={postCreate} />
      </Modal>
    </div>
  )
}

export default App
