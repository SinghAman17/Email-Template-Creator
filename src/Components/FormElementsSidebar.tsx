import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'
import { Separator } from './ui/separator'

const FormElementsSidebar = () => {
  return (
    <div className='flex flex-col items-start gap-3'>
      
      <p className='text-sm text-white/70'>Drag and Drop Elements</p>
      <Separator className='text-white/50'/>
      <div className='flex gap-3 flex-wrap w-full justify-center'>
      {Object.values(FormElements).map((element) => (
        <>
        <SidebarBtnElement key={element.type} formElement={element} />
        </>
      ))}
      </div>
    </div>
  )
}

export default FormElementsSidebar
