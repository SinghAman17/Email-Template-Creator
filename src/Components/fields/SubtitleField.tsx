import {  LuHeading2 } from "react-icons/lu";import {
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

const type: ElementsType = "SubTitleField";

const extraAttributes = {
  title: "Sub Title Field",

};


const propertiesSchema = z.object({
  title: z.string().min(2).max(50),

});

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuHeading2,
    label: "Subtitle Field",
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
      title : element.extraAttributes.title
    },
  });

  useEffect(() => {
    console.log("ypooo");
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { title} = values;
  
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
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
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-white ">Title</FormLabel>
              <FormControl>
                <Input
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
  const { title } = element.extraAttributes;

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <Label className="text-white/70">SubTitle Field</Label>
      <p
        className="text-md"
      >
        {title}
      </p>
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <p
      className="text-md"
    >
      {title}
    </p>
  );
}

