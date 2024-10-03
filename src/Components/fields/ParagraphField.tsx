import { BsParagraph } from "react-icons/bs";

import {
    ElementsType,
    FormElement,
    FormElementInstance,
  } from "../FormElements";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useEffect } from "react";
  import useDesigner from "../../hooks/useDesigner";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form";
  import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
  
  const type: ElementsType = "ParagraphField";
  
  const extraAttributes = {
    text: "Text Here ",
  
  };
  
  
  const propertiesSchema = z.object({
    text: z.string().min(2).max(500),
  
  });
  
  export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
      id,
      type,
      extraAttributes,
    }),
    designerBtnElement: {
      icon: BsParagraph,
      label: "paragraph Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
  };
  
  type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
  };
  type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
  function PropertiesComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
  
    const { updateElement } = useDesigner();
  
    const form = useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
        text : element.extraAttributes.text
      },
    });
  
    useEffect(() => {
      console.log("ypooo");
      form.reset(element.extraAttributes);
    }, [element, form]);
  
    function applyChanges(values: propertiesFormSchemaType) {
      const { text} = values;
    
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          text,
        },
      });
    }
    
  
    return (
      <Form {...form}>
        <form
          onBlur={(e) => {
            console.log("onBlur triggered");
            form.handleSubmit(
              (values) => {
                console.log("Form submitted, values: ", values);
                applyChanges(values); // Should get called only if validation passes
              },
              (errors) => {
                console.log("Validation failed, errors: ", errors); // Log errors if validation fails
              },
            )(e);
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-white ">text</FormLabel>
                <FormControl>
                  <Textarea rows={5}
                    {...field}
                    className="text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The Label of the field. <br /> It will be displayed above the
                  field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
  
        </form>
      </Form>
    );
  }
  
  function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { text } = element.extraAttributes;
  
    return (
      <div className="flex flex-col items-start gap-2 w-full">
        <Label className="text-white/70">Paragraph Field</Label>
        <p className="text-sm">
          {text}
        </p>
      </div>
    );
  }
  
  function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { text } = element.extraAttributes;
  
    return (
      <p className="text-sm">
        {text}
      </p>
    );
  }
  
  