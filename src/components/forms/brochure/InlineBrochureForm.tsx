import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { TextField } from "@/components/forms/toolkit/fields";
import Button from "@/components/common/Button";

interface FormValues {
  fullName: string;
  email: string;
}

interface Props {
  buyOrRent: "buy" | "rent";
  /** Downloaded once the enquiry is stored, so a mail hiccup never blocks the guide. */
  pdfUrl: string;
  buttonText?: string;
}

/**
 * The brochure form rendered inline in a page section, as the original did on
 * the sellers and landlords pages — name, email, privacy line, submit. The
 * sheet-based BrochureButton is for everywhere the CTA is just a button.
 */
export default function InlineBrochureForm({
  buyOrRent,
  pdfUrl,
  buttonText = "Download Guide",
}: Props) {
  const [state, setState] = useState<"default" | "loading" | "error" | "done">("default");
  const methods = useForm<FormValues>({ mode: "all" });

  const onSubmit = async (data: FormValues) => {
    setState("loading");
    try {
      const res = await fetch(import.meta.env.PUBLIC_SERVER_URL + "api/forms/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, buyOrRent }),
      });
      if (!res.ok) throw new Error("Request failed");
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "";
      link.click();
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-6 pb-5">
          <TextField
            name="fullName"
            label="Full Name"
            placeholder="Full name*"
            hideLabel
            required
          />
          <TextField
            name="email"
            label="Email"
            placeholder="Email address*"
            hideLabel
            required
            type="email"
          />
        </div>
        <p className="pb-8 font-harm text-[0.625rem] text-primary-100 lg:text-[0.75rem]">
          {"By pressing 'Download' you are agreeing to our "}
          <a className="underline" href="/jacobs-privacy-statement.pdf" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
        </p>
        <Button variant="secondary" size="lg" type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Sending…" : buttonText}
        </Button>
        {state === "error" && (
          <p className="pt-3 text-xs text-error">
            Something went wrong sending that. Please try again.
          </p>
        )}
        {state === "done" && (
          <p className="pt-3 text-xs text-primary-100">
            Your download should have started — check your browser&rsquo;s downloads if not.
          </p>
        )}
      </form>
    </FormProvider>
  );
}
