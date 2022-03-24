export default function TagPanel() {
  return (
    <div className='flex justify-center '>
      <div className='flex-col '>
        <div className='my-24'>
          <h1 className='text-2xl drop-shadow-md  flex justify-center '>
            Be Informed. Stay Safe
          </h1>
        </div>
        <div className='flex flex-row my-5'>
          <div className='flex space-x-2 justify-center text-center'>
            <div>
              <button
                type='button'
                className='inline-block px-6 py-2  text-gray-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5  transition duration-150 ease-in-out'
              >
                Poland
              </button>
              <button
                type='button'
                className='inline-block px-6 py-2   text-gray-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5  transition duration-150 ease-in-out'
              >
                Germany
              </button>
              <button
                type='button'
                className='inline-block px-6 py-2 text-gray-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5  transition duration-150 ease-in-out'
              >
                Slovakia
              </button>
              <button
                type='button'
                className='inline-block px-6 py-2   text-gray-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5  transition duration-150 ease-in-out'
              >
                Romania
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
