import { FormElement } from './FormElements'
import { useDraggable } from '@dnd-kit/core';
import { cn } from '../libs/utils';

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {

    if (!formElement || !formElement.designerBtnElement) {
        console.error('formElement or designerBtnElement is undefined');
        return null; // or return a placeholder component
    }

    const { icon: Icon, label } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data:{
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    })

    return (
        <button
        ref={draggable.setNodeRef}
        className={cn("flex flex-col items-center justify-center border-gray-800 h-[70px] w-[70px] py-2 px-1 bg-black backdrop-brightness-50 rounded-md hover: transition-colors", draggable.isDragging && "ring-2 ")}
        {...draggable.listeners}
        {...draggable.attributes}
        >
            {Icon && <Icon className="h-8 w-8 text-slate-500 cursor-grab" />}
            <p className="text-xs text-black">{label}</p>
        </button>
    )
}


export const SidebarBtnElementDragOverlay = ({ formElement }: { formElement: FormElement }) => {

    if (!formElement || !formElement.designerBtnElement) {
        console.error('formElement or designerBtnElement is undefined');
        return null; // or return a placeholder component
    }

    const { icon: Icon, label } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `desginer-btn-${formElement.type}`,
        data:{
            type: formElement.type,
            isDesginerBtnElement: true,
        },
    })

    return (
        <button className="flex flex-col items-center justify-center border-gray-800 h-[70px] w-[70px] py-2 px-1 bg-black backdrop-brightness-50 rounded-md hover: transition-colors">
            {Icon && <Icon className="h-8 w-8 text-slate-500 cursor-grab" />}
            <p className="text-xs text-black">{label}</p>
        </button>
    )
}
export default SidebarBtnElement