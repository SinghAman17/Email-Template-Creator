import React from 'react'
import useDesigner from '../hooks/useDesigner'
import { FormElements } from './FormElements';
import { AiOutlineClose } from 'react-icons/ai';

const PropertiesFormSidebar = () => {
    const {selectedElement ,setSelectedElement} = useDesigner();
    if(!selectedElement) return null;
    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className='flex flex-col p-2'>
        <div className="flex justify-between items-center">
            <p className='text-sm text-white/70'>Element Properties</p>
            <button className='bg-transparent hover:border-none outline-none' onClick={()=>{
                setSelectedElement(null);
            }}>
                <AiOutlineClose />
            </button>
        </div>
        <PropertiesForm elementInstance={selectedElement} />
      
    </div>
  )
}

export default PropertiesFormSidebar
