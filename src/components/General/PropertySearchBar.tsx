import clsx from "clsx";
import BuyRentToggle from "../Form/ReactHook/BuyRentToggle";
import { useForm, Controller, FormProvider } from "react-hook-form";
import Error from "../Form/ReactHook/Error";
import { IoMdSearch } from "react-icons/io/index.js";

export default function PropertySearchBar() {
  const methods = useForm();
  const { control, handleSubmit, register } = methods;

  const onSubmit = (data: any) => {
    window.sessionStorage.setItem("location", data.location);
    window.sessionStorage.setItem("buyOrRent", data.buyOrRent);
    window.location.href = "/property-search";
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-4xl flex-col items-center justify-between gap-4 md:flex-row"
      >
        <div>
          <Controller
            render={({ field: { value, onChange, name } }) => (
              <BuyRentToggle
                onChange={onChange}
                value={value}
                name={name}
                size="lg"
                variant="secondary"
              />
            )}
            name="buyOrRent"
            control={control}
            defaultValue={"buy"}
          />
        </div>
        <div className="flex w-full flex-col gap-2 text-left">
          <label
            className="text-primary-100, hidden font-harm text-xs"
            htmlFor="location"
          >
            Location
          </label>
          <div className="relative flex w-full flex-col items-center gap-1">
            <input
              {...register("location")}
              type="text"
              className={clsx(
                "flex h-16 w-full items-center rounded-big border-primary-100 bg-white px-6 font-medium text-primary-100 outline-1 placeholder:text-primary-100 focus:outline focus:outline-primary-100"
              )}
              placeholder="Begin your search by town or postcode… i.e RG21"
            />
            <button className="absolute right-0 ">
              <IoMdSearch className="box-content p-5 text-2xl text-primary-100" />
            </button>
            <Error name="location" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
