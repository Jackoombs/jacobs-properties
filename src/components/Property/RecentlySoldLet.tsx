import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SwiperNavBtns from '../General/SwiperNavBtns'
import PropertyCard from './PropertyCard'
import SoldLetToggle from './SoldLetToggle'

import type { Swiper as SwiperType } from 'swiper/types'
import type { Property2 } from '../../env'

interface Props {
  salesProperties: Property2[]
  lettingsProperties: Property2[]
}

export default function RecentlySoldLet({
  salesProperties,
  lettingsProperties,
}: Props) {
  const [isStartOrEnd, setIsStartOrEnd] = useState('start')
  const [toggle, setToggle] = useState('SOLD')

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd('start')
    else if (e.isEnd) setIsStartOrEnd('end')
    else setIsStartOrEnd('')
  }

  const properties = toggle === 'SOLD' ? salesProperties : lettingsProperties

  return (
    <Swiper
      onLock={() => setIsStartOrEnd('lock')}
      onUnlock={() => setIsStartOrEnd('start')}
      slidesPerView={properties.length > 1 ? 1.1 : 1}
      spaceBetween={30}
      onSlideChange={handleSlideChange}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      className="md:16 overflow-really-visible-mobile flex flex-col gap-8"
      onSwiper={handleSlideChange}
    >
      <div slot="container-start" className="flex justify-between">
        {lettingsProperties.length ? (
          <h3 className="flex items-center gap-1 text-2xl font-semibold text-primary-100 md:gap-6 lg:text-3xl">
            Recently {<SoldLetToggle {...{ toggle, setToggle }} />}
            <span className="hidden md:inline">Properties</span>
          </h3>
        ) : (
          <h3 className="flex items-center gap-2 text-2xl font-semibold text-primary-100 lg:text-3xl">
            Recently Sold Properties
          </h3>
        )}

        <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
      </div>
      {properties.map((property) => (
        <SwiperSlide key={property.id}>
          <PropertyCard {...{ property }} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
