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
      className="flex flex-col gap-6 text-primary-100"
      href={`/properties/${ID}`}
    >
      <div className="overflow-hidden rounded-xl">
        <img
          className="aspect-property h-full w-full object-cover duration-200 ease-in-out hover:scale-110"
          src={`https://jacobs-server.onrender.com/images/${ID}-resized.jpg`}
          alt={Address1 + Address2}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-ellipsis text-lg font-semibold line-clamp-1">{`${Address1}, ${Address2}`}</h3>
          <div className="flex items-center gap-4">
            <p className="text-[0.9375rem] font-semibold">{PriceString}</p>
            <p className="text-xs font-semibold uppercase tracking-widest">
              Guide Price
            </p>
          </div>
        </div>
        <p className="duration-10 flex h-10 w-20 items-center justify-center rounded-lg bg-secondary-100 text-xs font-semibold uppercase">
          {toggle === "SOLD" ? "Sold" : "Let"}
        </p>
      </div>
    </a>
  );
}
