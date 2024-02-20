import SectionHeader from '../../General/Text/SectionHeader'
import Copy from '../../General/Text/Copy'
import InputsWrapper from '../ReactHook/InputsWrapper'
import { Controller, useFormContext } from 'react-hook-form'
import BuyRentToggle from '../ReactHook/BuyRentToggle'
import PostcodeInput from '../ReactHook/PostcodeInput'
import { useEffect, useState } from 'react'
import SelectInput from '../ReactHook/SelectInput'
import clsx from 'clsx'

interface Address {
  formatted_address: string[]
  building_number: string
  thoroughfare: string
  building_name: string
  sub_building_name: string
  line_1: string
  line_2: string
  line_3: string
  line_4: string
  town_or_city: string
  county: string
}

export default function FormStep1() {
  const { control, watch, setValue } = useFormContext()

  const [addressOptions, setAddressOptions] = useState<Address[]>([])

  const address = watch('address')

  useEffect(() => {
    const fullAddress = addressOptions.find(
      ({ formatted_address }) =>
        formatted_address.filter(Boolean).join(', ') === address
    )
    if (fullAddress) {
      setValue('houseNumber', fullAddress.building_number)
      setValue('houseName', fullAddress.building_name)
      setValue('apartment', fullAddress.sub_building_name)
      setValue('street', fullAddress.thoroughfare)
    }
  }, [address])

  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Your property</SectionHeader>
        <Copy size="lg">Select your valuation type and property.</Copy>
      </div>
      <InputsWrapper>
        <div className="col-span-full max-w-[20rem] justify-self-center">
          <Controller
            render={({ field: { value, onChange, name } }) => (
              <BuyRentToggle
                onChange={onChange}
                value={value}
                name={name}
                variant="secondary"
                colSpanFull
                buyLabel="selling"
                rentLabel="letting"
              />
            )}
            name="buyOrRent"
            control={control}
            defaultValue={'buy'}
          />
        </div>
        <Controller
          control={control}
          name="postcode"
          defaultValue=""
          rules={{
            pattern: {
              value:
                /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/,
              message: 'Please enter a valid postcode',
            },
            required: {
              value: true,
              message: 'This is a required field',
            },
          }}
          render={({ field: { onChange, value, name } }) => (
            <PostcodeInput
              {...{ name, value, onChange, setAddressOptions }}
              colSpanFull
              hideLabel
            />
          )}
        />
        <>
          <div
            className={clsx(
              'col-span-full',
              !addressOptions.length && 'hidden'
            )}
          >
            <SelectInput
              name="address"
              label="Address"
              placeholder="Select your address"
              options={addressOptions.map(({ formatted_address }) =>
                formatted_address.filter(Boolean).join(', ')
              )}
              hideLabel
              required
            />
          </div>
        </>
      </InputsWrapper>
    </>
  )
}
