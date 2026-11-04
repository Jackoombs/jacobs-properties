import { useState } from 'react'
import {
  Controller,
  useFormContext,
  type RegisterOptions,
} from 'react-hook-form'
import { CalendarIcon } from '@/components/common/FilledIcons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const POSTCODE_PATTERN =
  /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/
const PHONE_PATTERN =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?#(\d{4}|\d{3}))?$/

function FieldError({ name }: { name: string }) {
  const {
    formState: { errors },
  } = useFormContext()
  const message = errors[name]?.message
  if (!message) return null
  return <p className="pt-1 text-xs text-error">{String(message)}</p>
}

export const inputClass =
  'flex h-16 w-full items-center rounded-big border border-primary-100 bg-transparent px-5 py-0 text-primary-100 placeholder:text-placeholder focus:outline-none md:text-base lg:min-w-[11.5rem] aria-invalid:border-error'

export function TextField({
  name,
  label,
  placeholder,
  hideLabel = false,
  colSpanFull = false,
  required = false,
  type = 'text',
  trailingIcon,
  pattern,
  id = name,
}: {
  name: string
  label: string
  placeholder: string
  hideLabel?: boolean
  colSpanFull?: boolean
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'number'
  /** Defaults to the field name; set it when the same field is shown on more than one step. */
  id?: string
  /** Extra format check for plain text fields, e.g. a postcode. */
  pattern?: { value: RegExp; message: string }
  /** A decorative icon drawn inside the right edge of the input, e.g. a search glass. */
  trailingIcon?: React.ReactNode
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const registerOptions: RegisterOptions = {
    required: { value: required, message: 'This is a required field' },
    ...(type === 'email' && {
      pattern: {
        value: EMAIL_PATTERN,
        message: 'Please enter a valid email address',
      },
    }),
    ...(type === 'tel' && {
      pattern: {
        value: PHONE_PATTERN,
        message: 'Please enter a valid phone number',
      },
    }),
    ...(pattern && { pattern }),
  }

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 text-left',
        colSpanFull && 'col-span-full',
      )}
    >
      <label
        className={cn(
          'font-harm text-xs text-primary-100',
          hideLabel && 'hidden',
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex w-full flex-col gap-1">
        <div className="relative flex items-center">
          <Input
            id={id}
            type={type === 'number' ? 'text' : type}
            inputMode={type === 'number' ? 'numeric' : undefined}
            {...register(name, registerOptions)}
            aria-invalid={!!errors[name]}
            className={cn(inputClass, trailingIcon && 'pr-16')}
            placeholder={placeholder}
          />
          {trailingIcon && (
            <span className="pointer-events-none absolute right-0 box-content p-5 text-2xl text-primary-100">
              {trailingIcon}
            </span>
          )}
        </div>
        <FieldError name={name} />
      </div>
    </div>
  )
}

export function TextAreaField({
  name,
  label,
  placeholder,
  hideLabel = false,
  rows = 5,
  colSpanFull = false,
  required = false,
}: {
  name: string
  label: string
  placeholder: string
  hideLabel?: boolean
  rows?: number
  colSpanFull?: boolean
  required?: boolean
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-left',
        colSpanFull && 'col-span-full',
      )}
    >
      <label
        className={cn(
          'font-harm text-xs text-primary-100',
          hideLabel && 'hidden',
        )}
        htmlFor={name}
      >
        {label}
      </label>
      <Textarea
        id={name}
        rows={rows}
        {...register(name, {
          required: { value: required, message: 'This is a required field' },
        })}
        aria-invalid={!!errors[name]}
        className={cn(inputClass, 'field-sizing-fixed h-auto min-h-16 resize-none py-4')}
        placeholder={placeholder}
      />
      <FieldError name={name} />
    </div>
  )
}

export function SelectField({
  name,
  label,
  placeholder,
  options,
  hideLabel = false,
  colSpanFull = false,
  required = false,
}: {
  name: string
  label: string
  placeholder: string
  options: (string | number)[]
  hideLabel?: boolean
  colSpanFull?: boolean
  required?: boolean
}) {
  const { control } = useFormContext()

  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-left',
        colSpanFull && 'col-span-full',
      )}
    >
      <label
        className={cn(
          'font-harm text-xs text-primary-100',
          hideLabel && 'hidden',
        )}
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{
          required: { value: required, message: 'This is a required field' },
        }}
        render={({ field }) => (
          <Select
            value={field.value ? String(field.value) : ''}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id={name}
              className={cn(
                inputClass,
                'w-full justify-between px-4 text-base data-[size=default]:h-16 [&>svg]:size-5 [&>svg]:text-primary-100 [&>svg]:opacity-100',
                !field.value && 'text-placeholder',
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" className="px-1">
              {options.map((option) => (
                <SelectItem
                  className="px-2"
                  key={option}
                  value={String(option)}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError name={name} />
    </div>
  )
}

export function CheckboxField({
  name,
  label,
}: {
  name: string
  label: string
}) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            id={name}
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
            className="size-6 rounded-[0.375rem] border-primary-100 data-checked:border-primary-100 data-checked:bg-primary-100"
          />
          <label
            className="cursor-pointer font-harm text-xs text-primary-100"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      )}
    />
  )
}

export function DateField({
  name,
  label,
  hideLabel = false,
}: {
  name: string
  label: string
  hideLabel?: boolean
}) {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn(
          'font-harm text-xs text-primary-100',
          hideLabel && 'hidden',
        )}
        htmlFor={name}
        id={`${name}-label`}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{ required: { value: true, message: 'Please select a date' } }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                id={name}
                aria-haspopup="dialog"
                aria-labelledby={`${name}-label ${name}`}
                className={cn(
                  inputClass,
                  'justify-between text-left',
                  !field.value && 'text-placeholder',
                )}
              >
                {field.value
                  ? format(field.value, 'd MMM yyyy')
                  : 'Please select a date'}
                <CalendarIcon className="size-4 text-primary-100" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value || undefined}
                onSelect={(date) => {
                  field.onChange(date ?? '')
                  setOpen(false)
                }}
                disabled={{ before: new Date() }}
                autoFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <FieldError name={name} />
    </div>
  )
}

export function DayPeriodField({
  index,
  hideLabel = false,
}: {
  index: number
  hideLabel?: boolean
}) {
  const { control } = useFormContext()
  const periods = [
    { key: 'morning', label: 'Morning' },
    { key: 'afternoon', label: 'Afternoon' },
    { key: 'evening', label: 'Evening' },
  ] as const

  return (
    <div className="flex flex-col gap-2">
      <p
        className={cn(
          'font-harm text-xs text-primary-100',
          hideLabel && 'hidden',
        )}
      >
        Time (you can select more than one)
      </p>
      <fieldset className="grid h-16 grid-cols-3 gap-1 overflow-hidden rounded-big bg-white p-1 text-sm font-normal">
        <legend className="hidden">Time (you can select more than one)</legend>
        {periods.map(({ key, label }) => (
          <Controller
            key={key}
            control={control}
            name={`dates.${index}.${key}`}
            defaultValue={key === 'morning'}
            render={({ field }) => (
              <label
                className={cn(
                  'flex h-full w-full cursor-pointer items-center justify-center rounded-big text-sm font-normal duration-300',
                  field.value
                    ? 'bg-primary-100 text-white'
                    : 'bg-white text-primary-100',
                )}
              >
                <input
                  type="checkbox"
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="sr-only"
                />
                {label}
              </label>
            )}
          />
        ))}
      </fieldset>
    </div>
  )
}

export function BuyRentToggleField({
  name,
  size = 'lg',
  variant = 'primary',
  buyLabel = 'Buy',
  rentLabel = 'Rent',
}: {
  name: string
  size?: 'sm' | 'lg'
  variant?: 'primary' | 'secondary'
  /** Wording for each side; the valuation forms say "selling" and "renting". */
  buyLabel?: string
  rentLabel?: string
}) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          className={cn(
            'justify-self-center text-[0.875rem] text-primary-100',
            size === 'lg' && 'w-[20rem]',
            size === 'sm' && 'w-[15rem]',
          )}
        >
          <ToggleGroup
            type="single"
            value={field.value}
            onValueChange={(value) => value && field.onChange(value)}
            className={cn(
              'relative flex h-[4.625rem] w-full items-center gap-0 rounded-big p-0',
              variant === 'primary' && 'bg-primary-200',
              variant === 'secondary' && 'bg-white',
            )}
          >
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute top-[5px] h-[calc(100%-10px)] w-[calc(50%-10px)] rounded-[0.5rem] duration-300 ease-in-out',
                field.value === 'buy' ? 'left-[5px]' : 'left-[calc(50%+5px)]',
                variant === 'primary' && 'bg-primary-100',
                variant === 'secondary' && 'bg-secondary-100',
              )}
            />
            {(['buy', 'rent'] as const).map((option) => (
              <ToggleGroupItem
                key={option}
                value={option}
                className={cn(
                  'relative z-10 h-full flex-1 rounded-[0.5rem] bg-transparent font-semibold uppercase tracking-[1.4px] text-primary-100 duration-300 hover:bg-transparent hover:text-primary-100 data-[state=on]:bg-transparent data-[state=on]:shadow-none',
                  variant === 'primary' &&
                    field.value === option &&
                    'text-white hover:text-white',
                )}
              >
                {option === 'buy' ? buyLabel : rentLabel}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
    />
  )
}

export { FieldError }
