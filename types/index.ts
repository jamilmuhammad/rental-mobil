import { MouseEventHandler } from "react";

export interface FiturProps {
  name: string;
}
export interface CarProps {
  pabrikan: string;
  model: string;
  kursi: number;
  bagasi: number;
  tahun: number;
  transmisi: string;
  harga: string;
  fitur: string[]
}

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}

export interface ButtonTagProps {
  styles?: string;
  title: string;
}

export interface ButtonWhatsappProps {
  styles?: string;
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}