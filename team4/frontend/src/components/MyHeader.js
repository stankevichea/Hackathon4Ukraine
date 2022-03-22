export default function Myheader(props) {
  return (
    <div>
      <nav className='relative w-full flex flex-wrap items-center justify-between bg-white-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-sm p-6'>
        <div className='container-fluid w-full flex flex-wrap items-center justify-between'>
          <div className={'container-fluid flex flex-col text-left'}>
            <a
              className='text-sm text-black'
              href='#'
              onClick={() => props.onPageChange('JoinUs')}
            >
              Join Us
            </a>
            <a
              className='text-sm text-black'
              href='#'
              onClick={() => props.onPageChange('AddArticle')}
            >
              Submit article
            </a>
            <a
              className='text-sm text-black'
              href='#'
              onClick={() => props.onPageChange('')}
            >
              Knowlegebase
            </a>
            <a
              className='text-sm text-black'
              href='#'
              onClick={() => props.onPageChange('AddOrganisation')}
            >
              Add your organisation
            </a>
          </div>
          {!props.noLogo && (
            <div className=''>
              <a className='' onClick={() => props.onPageChange('')} href='#'>
                {/* <span>PREPKIT</span>
                <span className='text-sm'>.help</span> */}
                <img
                  src='./images/logo.png'
                  className='h-20'
                  alt='prepkit'
                ></img>
              </a>
            </div>
          )}
          <div className='flex'>
            <img
              src='./images/ua.svg'
              className='w-8 h-6 border-2 rounded-md mx-2 object-cover'
              alt='ua'
            ></img>
            <img
              src='./images/gb.svg'
              className='w-8 h-6 border-2 rounded-md mx-2 object-cover'
              alt='gb'
            ></img>
            <img
              src='./images/ru.svg'
              className='w-8 h-6 border-2 rounded-md mx-2 object-cover'
              alt='ru'
            ></img>
          </div>
        </div>
      </nav>
    </div>
  )
}
