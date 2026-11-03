const labelClass = "text-[0.875rem] font-semibold uppercase tracking-[1.4px]";

/**
 * The lime "For sale" / "To let" / "SSTC" pill above a property's headline.
 * Takes the API's `statusLabel`, and shows nothing when there isn't one.
 */
export function StatusBadge({ label }: { label?: string }) {
  if (!label) return null;

  return (
    <p
      className={`${labelClass} mb-2 flex h-10 w-max items-center justify-center rounded-[0.375rem] bg-secondary-100 px-7 text-primary-100 duration-100 lg:h-14`}
    >
      {label}
    </p>
  );
}

/** "3 Bed | 2 Bath", leaving out whichever count the property doesn't have. */
export function BedsBaths({ bedrooms, bathrooms }: { bedrooms?: number; bathrooms?: number }) {
  if (bedrooms === undefined && bathrooms === undefined) return null;

  return (
    <ul className="flex gap-7 text-primary-100">
      {bedrooms !== undefined && <li className={labelClass}>{bedrooms} Bed</li>}
      {bedrooms !== undefined && bathrooms !== undefined && (
        <li aria-hidden="true" className="h-3 self-center border-l-2 border-secondary-100" />
      )}
      {bathrooms !== undefined && <li className={labelClass}>{bathrooms} Bath</li>}
    </ul>
  );
}
