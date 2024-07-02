"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps, FiturProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import Tag from "./ButtonTag";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { pabrikan, model, kursi, tahun, transmisi, fitur, bagasi, harga } = car;

  const [isOpen, setIsOpen] = useState(false);

  // const carRent = calculateCarRent(city_mpg, tahun);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {pabrikan} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>Rp</span>
        {harga}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/hari</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          {/* <div className="flex flex-col"> */}
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/svgs/cars/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmisi}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/svgs/cars/luggage.svg" width={20} height={20} alt="luggage" />
            <p className="car-card__icon-text">{bagasi} bagasi</p>
          </div>
          <div className="car-card__icon">
            <Image src="/svgs/cars/chair.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{kursi} kursi</p>
          </div>
          {/* </div> */}
          <div className="flex flex-col align-center items-center h-full">
            {fitur && fitur?.slice(0, 2).map((e: string, i: number) => {
              return i < 1 ? <Tag key={i} title={e} />
                : <Tag key={i} title={`${fitur && fitur.length - i}+ more`}></Tag>
            })}
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='Lanjutkan'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
