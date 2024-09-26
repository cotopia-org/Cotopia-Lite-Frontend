import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  label?: string
  items: { title: string; value: string }[]
  onChange?: (value: string) => void
  className?: string
  defaultValue?: string
  onInputChange?: boolean
}

export default function CSelect({
  label,
  className = "",
  items,
  onChange,
  defaultValue,
}: Props) {
  return (
    <div className={`flex flex-col gap-y-1 w-full ${className}`}>
      {!!label && <strong className="text-sm">{label}</strong>}
      <Select onValueChange={onChange} value={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"Select"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.length === 0 ? (
              <div className="p-2 flex items-center justify-center text-xs">
                There is nothing here
              </div>
            ) : (
              items.map((x, index) => (
                <SelectItem value={x.value} key={index}>
                  {x.title}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
