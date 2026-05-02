export type IconName =
  | "vibration"
  | "unfold_more"
  | "category"
  | "auto_stories"
  | "palette"
  | "blur_on"
  | "memory"
  | "visibility"
  | "science"
  | "pest_control"
  | "hourglass_empty"
  | "water_drop"
  | "all_inclusive"
  | "bubble_chart"
  | "east"
  | "hive"
  | "psychology"
  | "flare"
  | "thermostat"
  | "filter_vintage"
  | "blur_circular"
  | "send"
  | "mail"
  | "chat"
  | "flag"
  | "check_circle"
  | "person";

type IconProps = {
  name: IconName;
  size?: 14 | 16 | 18 | 20 | 24 | 32 | 36 | 48;
  fill?: 0 | 1;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  className?: string;
};

export function Icon({
  name,
  size = 24,
  fill = 0,
  weight = 400,
  className = "",
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
