export default function ButtonList() {
  return (
    <div className='flex flex-wrap justify-center items-center'>
      <button
        type='button'
        class='w-auto py-2 px-4  m-3 bg-white-600 hover:bg-gray-300  text-black  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
      >
        Transport
      </button>
      <button
        type='button'
        class='w-auto py-2 px-4 m-3 bg-white-600 hover:bg-gray-300  text-black  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
      >
        Accomodation
      </button>
      <button
        type='button'
        class='w-auto py-2 px-4 m-3 bg-white-600 hover:bg-gray-300  text-black  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
      >
        Documents
      </button>
      <button
        type='button'
        class='w-auto py-2 px-4 m-3 bg-white-600 hover:bg-gray-300  text-black  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
      >
        Medical help
      </button>
      <button
        type='button'
        class='w-auto py-2 px-4 m-3  bg-white-600 hover:bg-gray-300  text-black  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
      >
        Work
      </button>
    </div>
  )
}
