import React from 'react'
import Sidebar from '../components/homeComponents/sidebar'

const HomeLayout = ({children}) => {
  return (
    <div className='flex flex-row bg-gray-200/50'>
        <Sidebar/>
        {children}
    </div>
  )
}

export default HomeLayout