interface Props {
  ID: string;
  Address1: string;
  Address2: string;
  PriceString: string;
  toggle: string;
}

export default function PropertyCard({
  ID,
  Address1,
  Address2,
  PriceString,
  toggle,
}: Props) {
  return (
    <a
      className="flex flex-col gap-4 text-primary-100"
      href={`/properties/${ID}`}
    >
      <div className="overflow-hidden rounded-big">
        <img
          loading="lazy"
          className="aspect-property h-full w-full object-cover duration-200 ease-in-out hover:scale-110"
          src={`https://jacobs-server.onrender.com/images/${ID}-thumbnail.webp`}
          alt={Address1 + Address2}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-ellipsis pb-2 text-[1.25rem] font-semibold leading-[25px] line-clamp-2 lg:text-[1.5rem] lg:leading-[30px]">{`${Address1}, ${Address2}`}</h3>
          <div className="flex items-center gap-4">
            <p className="text-base font-semibold lg:text-[1.125rem] lg:font-normal">
              {PriceString.split("(")[0]}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[2.4px]">
              Guide Price
            </p>
          </div>
        </div>
        <p className="flex h-10 w-20 items-center justify-center rounded-lg bg-secondary-100 text-xs font-bold uppercase tracking-[2.4px] lg:text-[0.875rem]">
          {toggle}
        </p>
      </div>
    </a>
  );
}
