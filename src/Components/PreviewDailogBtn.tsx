import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "./FormElements";

const PreviewDailogBtn = () => {
  const {elements} = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-white">Preview</button>
      </DialogTrigger>
      <DialogContent className="bg-black w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0 text-white">
        <div className="px-4 py-4 border-b">
          <p className="text-lg font-bold text-white">Form Preview</p>
          <p className="text-sm text-white/50">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="bg-slate-800 flex flex-col flex-grow items-center justify-center p-4">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-black h-full w-full rounded-2xl p-8 overflow-y-auto">
            {
              elements.map(element=>{
                const FormComponent = FormElements[element.type].formComponent;
                return <FormComponent key={element.id} elementInstance={element}/>
              })
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDailogBtn;
