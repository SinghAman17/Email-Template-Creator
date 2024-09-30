import React from 'react'
import PreviewDailogBtn from './PreviewDailogBtn'
import SaveFromBtn from './SaveFromBtn'
import PublishFromBtn from './PublishFromBtn'
import Designer from './Designer'
import { DndContext,  MouseSensor,  TouchSensor,  useSensor, useSensors } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'

const FormBuilder = () => {

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint:{
      distance:10,
    }
  })

  const touchSensor = useSensor(TouchSensor,{
    activationConstraint:{
      delay:300,
      tolerance:5,
    }
  })
  const sensors=useSensors(mouseSensor, touchSensor )
  return (
    <DndContext sensors={sensors}>
    <main className="flex flex-col w-full">
      <div className="flex justify-between border-b-2 border-b-gray-800 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">
            From : My-First-From
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <PreviewDailogBtn />
          <SaveFromBtn />
          <PublishFromBtn />
        </div>
      </div>

      <div className="flex w-full flex-grow items-center justify-center relative h-screen overflow-y-auto  bg-slate-800 bg-[url(/graph.svg)]">
        <Designer />
      </div>
    </main>
    <DragOverlayWrapper />
    </DndContext>
  )
}

export default FormBuilder
