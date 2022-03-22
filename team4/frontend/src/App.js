import Companies from './components/Companies'
import ButtonList from './components/ButtonList'
import MyFooter from './components/MyFooter'
import TagPanel from './components/TagPanel'
import AddArticle from './modules/AddArticle/components'
import JoinUs from './modules/JoinUs/components'
import AddOrganisation from './modules/AddArticle/components'

import React from 'react'
// eslint-disable-next-line no-unused-vars
import { IntlProvider, FormattedMessage } from 'react-intl'
import useLocale from './hooks/useLocale'
import { LOCALE_MAP } from './consts'
import Myheader from './components/MyHeader.js'
import { useState } from 'react'

import('./style/tailwind.css')

function renderPage(page) {
  let ret = (
    <div>
      <div className='min-h-[80vh]'>
        <TagPanel></TagPanel>
        <ButtonList></ButtonList>
      </div>
      <div class='mb-24'>
        <Companies></Companies>
      </div>
    </div>
  )
  switch (page) {
    case 'AddArticle':
      ret = <AddArticle />
      break
    case 'JoinUs':
      ret = <JoinUs />
      break
    case 'AddOrganisation':
      ret = <AddOrganisation />
      break

    default:
      break
  }
  return ret
}

function App() {
  const { locale } = useLocale()
  const [page, setPage] = useState('')

  return (
    <IntlProvider locale={locale} messages={LOCALE_MAP[locale]}>
      <Myheader onPageChange={setPage}></Myheader>
      {renderPage(page)}
      <MyFooter>
        <Myheader onPageChange={setPage} noLogo={true}></Myheader>
      </MyFooter>
    </IntlProvider>
  )
}

export default App
