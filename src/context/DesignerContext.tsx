import { createContext, ReactNode, useState } from "react";
import { FormElementInstance } from "../Components/FormElements"

type DesignerContextType ={
    elements : FormElementInstance[];
    addElement:(index: number, elements: FormElementInstance)=> void;
    removeElement: (id: string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement:React.Dispatch<React.SetStateAction<FormElementInstance | null>>
    updateElement: (id: string ,element: FormElementInstance)=>void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
    children,
}:{
    children: ReactNode;
}){

    const [elements, setElements]=useState<FormElementInstance[]>([]);
    const [selectedElement ,setSelectedElement] =useState<FormElementInstance | null>( null);
    const addElement = (index:number, element: FormElementInstance) =>{
        setElements(prev =>{
            const newElements = [...prev];
            newElements.splice(index,0,element)
            return newElements;
        })
    }

    const removeElement =(id:string)=>{
        setElements(prev => prev.filter((element)=>element.id !== id));
    }

    const updateElement= (id:string ,element: FormElementInstance)=>{
        console.log("hiii")
        setElements(prev=>{
            const newEelements = [...prev];
            const index = newEelements.findIndex((el)=> el.id === id);
            newEelements[index] = element;
            return newEelements;
        })

    }

    return (
        <DesignerContext.Provider value={{
            elements,
            addElement, 
            removeElement, 
            selectedElement,
            setSelectedElement,
            updateElement

        }}>
            {children}
        </DesignerContext.Provider>
        );
}