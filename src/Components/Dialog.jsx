import React from 'react'

const Dialog = ({show, setShow, setQuote, quotePost}) => {
  return (
    <div>
      <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className={` ${show ? "block" : "hidden"} overflow-y-auto  overflow-x-hidden fixed top-1/2 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative  left-1/2 -translate-x-1/2 top-1/2  -translate-y-1/2 w-full max-w-md max-h-full">
                    <div className="relative  rounded-lg shadow bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Write A Quote
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setShow(false)}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#">
                                <div>
                                    <label htmlFor="quote" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Quote</label>
                                    <input
                                        type="text" name="quote" id="quote"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Enter Quote.."
                                        required
                                        onChange={(e) => setQuote(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={(e) => quotePost(e)}
                                >
                                    Save Quote
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Dialog
