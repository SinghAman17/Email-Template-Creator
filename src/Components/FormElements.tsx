import React from "react";
import { TextFieldFormElements } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { SubTitleFieldFormElement } from "./fields/SubtitleField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SeparatorFieldFormElement } from "./fields/SeperatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";
import { NumberFieldFormElements } from "./fields/NumberField";
import { TextareaFieldFormElements } from "./fields/TextAreaField";
import { DateFieldFormElements } from "./fields/DateField";

export type ElementsType = 
"TextField"|
"TitleField"|
"SubTitleField"|
"ParagraphField"|
"SeparatorField"|
"SpacerField"|
"NumberField"|
"TextareaField"|
"DateField";

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
    TitleField:TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElements,
    TextareaField: TextareaFieldFormElements,
    DateField: DateFieldFormElements
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}