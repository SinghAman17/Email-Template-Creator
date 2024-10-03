import { LuHeading1 } from "react-icons/lu";import {
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
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Title Field",
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),

});

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuHeading1,
    label: "Title Field",
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
      label: element.extraAttributes.label || "Default Label",
      helperText: element.extraAttributes.helperText || "Default helper text",
      required: element.extraAttributes.required || false,
      placeHolder: element.extraAttributes.placeholder || "Default placeholder",
    },
  });

  useEffect(() => {
    console.log("ypooo");
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    console.log("Form values: ", values);
    const { label, helperText, required, placeHolder } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        placeHolder,
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
          name="label"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-white "> Label</FormLabel>
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
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-white "> PlaceHolder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-white placeholder-purple-50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The Placeholder of the field. <br /> It will be displayed above
                the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-white "> Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-white placeholder-purple-50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                It will be displayed Below the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm ">
              <div className="space-y-0.5">
              <FormLabel className="text-white ">Required</FormLabel>
              <FormDescription>
                It will be displayed Below the field
              </FormDescription>
              </div>
              <FormControl>
                <Switch  checked={field.value} onCheckedChange={field.onChange}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { title} = element.extraAttributes;
  return (
    <div className="flex flex-col items-start gap-2 w-full ">
        <Label className="text-white/70">Title Field</Label>
        <p className="text-xl">{title}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col items-start gap-2 w-full ">
      <label>
        {label}
        {required && "*"}
      </label>
      <input
        type="text"
        className="outline-none p-2 w-full placeholder-white/20 flex " // Tailwind placeholder color
        placeholder={placeHolder}
      />

      {helperText && (
        <p className=" text-white/20 text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
