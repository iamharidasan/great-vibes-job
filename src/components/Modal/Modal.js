import React from "react"

const Modal = ({ title, children, dismissModal, className, screenNumber }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-70 ${className}`}
    >
      <div className="relative w-full max-w-2xl max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow p-8">
          <div className="flex items-start justify-between rounded-t ">
            <h3 className="text-xl font-normal text-darkgrey">{title}</h3>
            <div>
              <p className="text-darkgrey inline text-base font-medium">
                Step {screenNumber}
              </p>
              <button
                type="button"
                className="text-black bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                onClick={dismissModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
          <div className="pt-6 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
