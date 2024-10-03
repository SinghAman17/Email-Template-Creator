import {
    ElementsType,
    FormElement,
    FormElementInstance,
  } from "../FormElements";
 
  import { Label } from "../ui/label";
  import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";

  
  const type: ElementsType = "SeparatorField";
  
  export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
      id,
      type,
      
    }),
    designerBtnElement: {
      icon: RiSeparator,
      label: "Title Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
  };
  

  function PropertiesComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    
    return <p>No Properties for these elements .</p>
  }
  
  function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {  
    return (
      <div className="flex flex-col items-start gap-2 w-full">
        <Label className="text-white/70">Separator Field</Label>
        <Separator/>
      </div>
    );
  }
  
  function FormComponent(
    { elementInstance }:
    { elementInstance: FormElementInstance }) 
    {
    return (
      <Separator />
    );
  }
  
  