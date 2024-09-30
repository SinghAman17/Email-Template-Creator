import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'

const FormElementsSidebar = () => {
  return (
    <div>
      {Object.values(FormElements).map((element) => (
        <SidebarBtnElement key={element.type} formElement={element} />
      ))}
    </div>
  )
}

export default FormElementsSidebar
