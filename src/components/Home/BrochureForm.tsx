import Input from "../Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function BrochureForm() {
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
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-6">
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
        <p className="pt-3 pb-8 text-[10px] font-semibold text-primary-100">
          {"By pressing 'Download' you are agreeing to our "}
          <a className=" pt-3 pb-7 underline" href="/" target="_blank">
            privacy policy
          </a>
        </p>
        <button
          className="flex h-16 w-full items-center justify-center rounded-xl bg-secondary-100 text-xs font-semibold uppercase text-primary-100 duration-100 hover:brightness-110 md:h-[2.75rem]"
          type="submit"
        >
          Download Guide
        </button>
      </form>
    </div>
  );
}
