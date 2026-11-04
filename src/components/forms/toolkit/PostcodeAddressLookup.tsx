import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, SpinnerIcon } from "@/components/common/FilledIcons";
import { FieldError, POSTCODE_PATTERN, inputClass } from "@/components/forms/toolkit/fields";
import { useAddressLookup, type LookupAddress } from "@/lib/address-lookup";
import { cn } from "@/lib/utils";

const compact = (postcode: string | undefined) => (postcode ?? "").toUpperCase().replace(/\s+/g, "");

/** The address fields a chosen address fills in — the ones ValuationAddressFields shows. */
const ADDRESS_FIELDS = ["houseNumber", "houseName", "apartment", "street", "dependantStreet"] as const;

/**
 * Postcode entry with an address finder (Ideal Postcodes, via the API).
 *
 * Picking an address fills the "Property details" step; any failure falls
 * back to typing the address there, so a lookup problem never blocks the form.
 */
export default function PostcodeAddressLookup() {
  const {
    register,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();
  const { state, lookup, reset } = useAddressLookup();
  const [selectedId, setSelectedId] = useState("");
  const [notListed, setNotListed] = useState(false);

  const postcode: string | undefined = watch("postcode");
  const searchedPostcode = state.status === "idle" ? undefined : state.postcode;

  // Results belong to the postcode they were found for; editing it makes them stale.
  useEffect(() => {
    if (searchedPostcode !== undefined && compact(postcode) !== compact(searchedPostcode)) {
      reset();
      setSelectedId("");
      setNotListed(false);
    }
  }, [postcode, searchedPostcode, reset]);

  const search = async () => {
    if (!(await trigger("postcode"))) return;
    setSelectedId("");
    setNotListed(false);
    void lookup(getValues("postcode").trim());
  };

  const choose = (id: string) => {
    const address = state.status === "success" && state.addresses.find((a) => a.id === id);
    if (!address) return;

    setSelectedId(id);
    const options = { shouldDirty: true, shouldValidate: true };
    for (const field of ADDRESS_FIELDS) setValue(field, address[field as keyof LookupAddress], options);
    setValue("postcode", address.postcode, options);
    setValue("address", address.label, options);
  };

  const loading = state.status === "loading";

  return (
    <div className="col-span-full flex w-full flex-col gap-3 text-left">
      <label className="sr-only" htmlFor="postcode">
        Postcode
      </label>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full gap-3">
          <Input
            id="postcode"
            autoComplete="postal-code"
            placeholder="Enter postcode"
            {...register("postcode", {
              required: { value: true, message: "This is a required field" },
              pattern: { value: POSTCODE_PATTERN, message: "Please enter a valid postcode" },
            })}
            onKeyDown={(e) => {
              // Enter searches rather than submitting the multi-step form.
              if (e.key === "Enter") {
                e.preventDefault();
                void search();
              }
            }}
            aria-invalid={!!errors.postcode}
            aria-describedby="postcode-lookup-status"
            className={cn(inputClass, "min-w-0 flex-1 uppercase placeholder:normal-case")}
          />
          <button
            type="button"
            onClick={() => void search()}
            disabled={loading}
            aria-busy={loading}
            className="flex h-16 shrink-0 items-center justify-center gap-2 rounded-big bg-secondary-100 px-5 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:bg-[#D3ED35] disabled:cursor-wait disabled:opacity-80"
          >
            {loading ? (
              <SpinnerIcon className="size-5 animate-spin" />
            ) : (
              <SearchIcon className="size-5" />
            )}
            <span className="hidden sm:inline">{loading ? "Searching" : "Find address"}</span>
            <span className="sr-only sm:hidden">{loading ? "Searching" : "Find address"}</span>
          </button>
        </div>
        <FieldError name="postcode" />
      </div>

      {/* One polite live region so screen readers hear progress and outcomes. */}
      <div id="postcode-lookup-status" aria-live="polite" className="flex flex-col gap-3">
        {loading && (
          <div className="flex flex-col gap-2" aria-label="Searching for addresses">
            <div className="h-16 w-full animate-pulse rounded-big bg-primary-100/10" />
            <p className="font-harm text-xs text-primary-100/70">Searching for addresses…</p>
          </div>
        )}

        {state.status === "success" && !notListed && (
          <div className="flex flex-col gap-2">
            <p className="font-harm text-xs text-primary-100">
              {state.addresses.length === 1
                ? "1 address found"
                : `${state.addresses.length} addresses found`}{" "}
              for {state.postcode.toUpperCase()}
            </p>
            <Select value={selectedId} onValueChange={choose}>
              <SelectTrigger
                aria-label="Select your address"
                className={cn(
                  inputClass,
                  "w-full justify-between px-4 text-left text-base data-[size=default]:h-16 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-primary-100 [&>svg]:opacity-100 *:data-[slot=select-value]:line-clamp-1",
                  !selectedId && "text-placeholder",
                )}
              >
                <SelectValue placeholder="Select your address" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-72 px-1">
                {state.addresses.map((address) => (
                  <SelectItem className="px-2" key={address.id} value={address.id}>
                    {address.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              type="button"
              onClick={() => {
                setNotListed(true);
                setSelectedId("");
              }}
              className="self-start font-harm text-xs text-primary-100 underline underline-offset-2"
            >
              My address isn't listed
            </button>
          </div>
        )}

        {state.status === "success" && notListed && (
          <p className="font-harm text-xs text-primary-100">
            No problem, you can enter your address on the next step.{" "}
            <button
              type="button"
              onClick={() => setNotListed(false)}
              className="underline underline-offset-2"
            >
              Show the list again
            </button>
          </p>
        )}

        {state.status === "error" && (
          <div
            role="alert"
            className="flex flex-col gap-2 rounded-big border border-error/40 bg-error/5 px-4 py-3 text-sm text-primary-100 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{state.message}</p>
            {state.retryable && (
              <button
                type="button"
                onClick={() => void search()}
                className="shrink-0 self-start font-semibold uppercase tracking-[1.4px] underline underline-offset-2 sm:self-auto"
              >
                Try again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
