export type SearchSelectProps = {
  title: string;
  data: string[];
  onSelect?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  startValue?: string;
};
