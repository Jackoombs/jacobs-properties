interface Props {
  name: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function PropertySearchBar({ name, state, setState }: Props) {
  return (
    <>
      <label className="hidden" htmlFor={name}>
        Property Location
      </label>
      <input
        id={name}
        className="box-border h-[3.5rem] w-full rounded-big border border-primary-100 bg-transparent px-8 text-base font-medium text-primary-100 placeholder:text-primary-100
        focus:border-[#ff1010] focus:outline-none lg:h-[4.625rem] lg:w-[25.8rem] lg:max-w-[25.8rem]"
        type="text"
        placeholder="Begin your search by town or postcode… i.e BA3"
        value={state}
        onChange={(e) => setState(e.currentTarget.value)}
      />
    </>
  );
}
