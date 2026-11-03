import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GridIcon, ListIcon, MapIcon } from "@/components/common/FilledIcons";
import { cn } from "@/lib/utils";

type ViewType = "list" | "grid" | "map";

const labels: Record<ViewType, string> = { list: "List view", grid: "Grid view", map: "Map view" };

export default function ViewToggle({
  state,
  setState,
  isMobile,
}: {
  state: ViewType;
  setState: (v: ViewType) => void;
  isMobile: boolean;
}) {
  const options: { value: ViewType; icon: typeof ListIcon }[] = isMobile
    ? [
        { value: "grid", icon: GridIcon },
        { value: "map", icon: MapIcon },
      ]
    : [
        { value: "list", icon: ListIcon },
        { value: "grid", icon: GridIcon },
        { value: "map", icon: MapIcon },
      ];

  return (
    <ToggleGroup
      type="single"
      value={state}
      onValueChange={(value) => value && setState(value as ViewType)}
      className={cn(
        "relative flex h-16 items-center justify-center gap-0 rounded-big bg-primary-200 p-0",
        isMobile ? "w-32" : "w-48",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-[5px] h-[calc(100%-10px)] rounded-big bg-primary-100 duration-300 ease-in-out",
          isMobile ? "w-[calc(50%-10px)]" : "w-[calc(33.33%-10px)]",
          isMobile
            ? state === "grid"
              ? "left-[5px]"
              : "left-[calc(50%+5px)]"
            : state === "list"
              ? "left-[5px]"
              : state === "grid"
                ? "left-[calc(33.33%+5px)]"
                : "left-[calc(66.66%+5px)]",
        )}
      />
      {options.map(({ value, icon: Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={labels[value]}
          className={cn(
            "relative z-10 h-full flex-1 rounded-big bg-transparent duration-300 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:shadow-none",
            state === value ? "text-white hover:text-white" : "text-primary-100 hover:text-primary-100",
          )}
        >
          <Icon className="size-5" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
