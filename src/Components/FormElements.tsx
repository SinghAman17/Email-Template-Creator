import React from "react";
import { TextFieldFormElements } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";

export type ElementsType = "TextField"|"TitleField";

export type FormElement = {
    type: ElementsType;
    
    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
    formComponent: React.FC<
    {
        elementInstance :FormElementInstance;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElements,
    TitleField:TitleFieldFormElement
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}