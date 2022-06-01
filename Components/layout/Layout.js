import React from 'react'
import MainHeader from './MainHeader'

const layout = (props) => {
  return (
    <>
        <MainHeader />
        <main>{props.children}</main>
    </>
  )
}

export default layout