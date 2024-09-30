import React, { ElementType, useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "../libs/utils";
import useDesigner from "../hooks/useDesigner";
import { FormElementInstance, FormElements } from "./FormElements";
import { idGenerator } from "../libs/idGenerator";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { elements, addElement ,selectedElement , setSelectedElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return console.log("Nothing Dragged")
      console.log("drag end : ", event)

      const isDesginerBtnElement = active.data?.current?.isDesignerBtnElement;
      if (isDesginerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          idGenerator()
        )
        addElement(0, newElement)
        console.log("new Elements :  ", newElement)
      }
    },
  })
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full" onClick={(e)=>{
        e.stopPropagation();
        if(selectedElement)setSelectedElement(null);
      }}>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-black max-w-[920px] h-full m-auto rounded-xlm flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-slate-50/20",
          )}
        >
          {!droppable.isOver && elements.length === 0 && (<p className="text-3xl text-gray-500 flex flex-grow items-center font-bold">
            Drag Here
          </p>)}
          {droppable.isOver && elements.length ===0 && <div className="p-4 w-full">
            <div className="h-[120px] rounded-md bg-slate-500/20"></div>
          </div>}

          {elements.length > 0 && (
            <div className="flex flex-col text-white w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {

  const {removeElement , setSelectedElement ,selectedElement} = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true
    }
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data:{
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    }
  })

  if(draggable.isDragging) return null
  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div

    onClick={()=>{
      setSelectedElement(element);
    }}
    ref={draggable.setNodeRef}
    {...draggable.listeners}
    {...draggable.attributes}
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setMouseIsOver(false)
      }}
      className="flex flex-col relative h-[120px] text-white hover:cursor-pointer rounded-md ring-1 ring-gray-700 ring-inset">
      <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md top-0 " />
      <div ref={bottomHalf.setNodeRef} className="absolute w-full h-1/2 rounded-b-md bottom-0" />
      {mouseIsOver && (
          <>
          <div className="absolute right-0 h-full">
            <button 
            onClick={()=>{
              removeElement(element.id);
            }}
            className="flex justify-center items-center h-full border rounded-md rounded-l-none bg-red-500 outline-none hover:outline-none border-none shadow-lg">
              <BiSolidTrash className="h-6 w-6"/>
            </button>
          </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <p className="text-zinc-400/50 text-sm"> Click for Properties or drag and drop to move</p>
            </div>
          </>
        )
      }

      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-white rounded-b-none"></div>
      )}
      <div className={cn("flex w-full h-[120px] items-center rounded-md bg-neutral-500/40 px-4 py-2 pointer-events-none" ,
         mouseIsOver && ("opacity-100 bg-slate-800/10"))}>
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-white rounded-t-none"></div>
      )}
    </div>
  );
}

export default Designer;
