export default function MyFooter(props) {
  return (
    <footer className='bg-gray-100 text-center lg:text-left'>
      <div className=' p-6 text-gray-800'>
        <div className='grid lg:grid-cols-3 gap-4'>
          <div></div>
          <div className='mb-6 md:mb-0'>
            <h5 className='font-medium mb-2 uppercase flex justify-center'>
              Stay Safe
            </h5>

            <p className='mb-4'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </div>
        </div>
      </div>

      <div className='text-center text-gray-700 p-4 bg-gray-500'>
        <div>
          © 2021 Copyright:
          <a className='text-gray-800' href='https://tailwind-elements.com/'>
            Prepikit
          </a>
        </div>
        {props.children}
      </div>
    </footer>
  )
}
