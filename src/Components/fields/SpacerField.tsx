import { LuSeparatorHorizontal } from "react-icons/lu";
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
  import { Input } from "../ui/input";
  import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
  
  const type: ElementsType = "SpacerField";
  
  const extraAttributes = {
    height: 20, 
  };
  
  
  const propertiesSchema = z.object({
    height: z.number().min(5).max(200),
  
  });
  
  export const SpacerFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
      id,
      type,
      extraAttributes,
    }),
    designerBtnElement: {
      icon: LuSeparatorHorizontal,
      label: "Spacer Field",
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
        height : element.extraAttributes.height
      },
    });
  
    useEffect(() => {
      console.log("ypooo");
      form.reset(element.extraAttributes);
    }, [element, form]);
  
    function applyChanges(values: propertiesFormSchemaType) {
      const {height} = values;
    
      updateElement(element.id, {
        ...element,
        extraAttributes: {
            height
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
            name="height"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-white ">Height (px): {form.watch("height")}</FormLabel>
                <FormControl className="pt-2">
                  <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value)=>{
                    console.log("hii");
                    field.onChange(value[0]);
                  }}
                  ></Slider>
                </FormControl>
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
    const { height} = element.extraAttributes;
  
    return (
      <div className="flex flex-col items-center gap-2 w-full">
        <Label className="text-white/70">Spacer Height : {height}px</Label>
        <LuSeparatorHorizontal className="h-8 w-8"></LuSeparatorHorizontal>
      </div>
    );
  }
  
  function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { height } = element.extraAttributes;
  
    return (
      <div style={{height , width:"100%"}}></div>
    );
  }
  
  