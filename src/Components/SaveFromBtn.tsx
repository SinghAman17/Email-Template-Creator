import React, { startTransition, useTransition } from 'react';
import useDesigner from '@/hooks/useDesigner';
import {updateFormContent} from '../api/form'
const SaveFromBtn = ({id}:{id:number}) => {
  // const { toast } = useToast();
  const {elements} = useDesigner();
  const updateFormContent1 = async () => {
    try {
      const jsonElements = JSON.stringify(elements);

      console.log("JSON Data : ",JSON.parse(jsonElements));
      const reposne = updateFormContent(id, jsonElements);

     
   
    } catch (error) {
      console.log("error : " ,error)

    }
  };

  return (
    <button className='text-white' onClick={()=>{
      updateFormContent1();
    }} >
      Save
     
    </button>
  );
}

export default SaveFromBtn;
