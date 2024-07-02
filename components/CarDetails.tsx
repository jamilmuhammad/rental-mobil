import React, { Fragment, useState } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from "@types";
import { formatDate, generateCarImageUrl } from "@utils";
import Tag from "./ButtonTag";
import ButtonWhatsapp from "./ButtonWhatsapp";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const { pabrikan, model, kursi, tahun, transmisi, fitur, bagasi, harga } = car;

  const [startDate, setStartDate] = useState<string>(formatDate(new Date()));
  const [endDate, setEndDate] = useState<string | null>(null);

  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const [description, setDescription] = useState<string | null>(null);


  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = formatDate(new Date(event.target.value));
    setStartDate(newDate);
    setEndDate(null); // Reset end date when start date changes
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = formatDate(new Date(event.target.value));
    setEndDate(newDate);
  };

  const minEndDate = startDate ? formatDate(new Date(startDate)) : undefined;

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const startTime = new Date(event.target.value);
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const endTime = new Date(event.target.value);
    setEndTime(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_NUMBER_PHONE; // Replace with your WhatsApp number

  const handleClickToChat = (event: React.MouseEvent<HTMLButtonElement>) => {

    const message = encodeURIComponent(`Halo Admin,\n\nSaya ingin memesan mobil *${pabrikan} ${model}*\nBerikut detail pemesanan:\n- Dari Tanggal: *${startDate}*\n- Jam: *${startTime}*\n- Sampai Tanggal: *${endDate}*\n- Jam: *${endTime}*\n- Pesan Khusus: *${description}*\n Mohon konfirmasi dan ketersediaan lebih lanjut\n\n Terima kasih`);

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-out duration-300'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                  <button
                    type='button'
                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                    onClick={closeModal}
                  >
                    <Image
                      src='/close.svg'
                      alt='close'
                      width={20}
                      height={20}
                      className='object-contain'
                    />
                  </button>

                  <div className='flex-1 flex flex-col gap-3'>
                    <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                      <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
                    </div>

                    <div className='flex gap-3'>
                      <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "29")} alt='car model' fill priority className='object-contain' />
                      </div>
                      <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "33")} alt='car model' fill priority className='object-contain' />
                      </div>
                      <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "13")} alt='car model' fill priority className='object-contain' />
                      </div>
                    </div>
                  </div>

                  <div className='flex-1 flex flex-col gap-2'>
                    <h2 className='font-semibold text-xl capitalize'>
                      {car.pabrikan} {car.model}
                    </h2>

                    <div className='mt-3 flex flex-wrap gap-4'>
                      {Object.entries(car).map(([key, value]) => (
                        <div className='flex justify-between gap-5 w-full text-right' key={key} >
                          <h4 className='text-grey capitalize'>
                            {key.split("_").join(" ")}
                          </h4>
                          {/* {value} */}
                          {value.length > 1 ? (Array.isArray(value) ? <div className='flex flex-wrap gap-4'>{value.map((v: string, i: number) => <Tag key={i} title={v} />)}</div> : <i>{(key == 'harga' ? 'Rp ' : '') + value}</i>) : <p className='text-black-100 font-semibold'>{value}</p>}
                        </div>
                      ))}
                      <div className='flex justify-between gap-5 w-full text-right' >
                        <label>Dari</label>
                        <input
                          type="date"
                          name="start_date"
                          value={formatDate(new Date(startDate))}
                          min={formatDate(new Date())}
                          onChange={handleStartDateChange}
                        />
                        <input type="time" name="start_time" onChange={handleStartTimeChange}/>
                      </div>
                      <div className='flex justify-between gap-5 w-full text-right' >
                        <label>Sampai</label>
                        <input
                          type="date"
                          name="end_date"
                          value={endDate ? formatDate(new Date(endDate)) : ''}
                          min={minEndDate}
                          onChange={handleEndDateChange}
                        />
                        <input type="time" name="end_time" onChange={handleEndTimeChange}/>
                      </div>
                      <div className='flex justify-between gap-2 w-full text-right' >
                        <label>Deskripsi</label>
                        <textarea
                          // type="text"
                          className="w-full"
                          name="description"
                          value={description ? description : ''}
                          onChange={handleDescription}
                        />
                      </div>
                    </div>
                    <ButtonWhatsapp title="Pesan Sekarang" handleClick={handleClickToChat}/>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CarDetails;
