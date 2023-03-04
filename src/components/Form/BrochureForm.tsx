import Input from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../General/Button";
import { useRef } from "react";

interface Props {
  pdfPath:
    | "Jacobs properties - Guide To Letting.pdf"
    | "Jacobs properties - Guide To Selling.pdf";
}

export default function BrochureForm({ pdfPath }: Props) {
  const downloadRef = useRef<null | HTMLAnchorElement>(null);

  const messages = {
    required: "This is a required field",
    email: "Please enter a valid email address",
  };

  const Schema = z.object({
    fullName: z.string().min(1, { message: messages.required }),
    email: z
      .string()
      .min(1, { message: messages.required })
      .email({ message: messages.email }),
  });
  type SchemaType = z.infer<typeof Schema>;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    console.log(data);
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-6 pb-5">
          <Input
            id="fullName"
            type="text"
            name="Full Name"
            label="Full Name"
            placeholder="Full name*"
            register={register}
            errors={errors}
          />
          <Input
            id="email"
            type="email"
            name="email"
            label="email"
            placeholder="Email address*"
            register={register}
            errors={errors}
          />
        </div>
        <p className="pb-8 font-harm text-[0.625rem] text-primary-100 lg:text-[0.75rem]">
          {"By pressing 'Download' you are agreeing to our "}
          <a className=" pt-3 pb-7 underline" href="/" target="_blank">
            privacy policy
          </a>
        </p>
        <Button variant="secondary" size="lg" type="submit">
          Download Guide
        </Button>
        <a
          target="_blank"
          ref={downloadRef}
          href={`/${pdfPath}`}
          download
          className="hidden"
        ></a>
      </form>
    </div>
  );
}
