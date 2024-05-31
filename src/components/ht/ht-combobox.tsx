"use client"
import { Check, ChevronsUpDown, SendHorizonal } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { FormControl } from "../ui/form"

interface HTComboboxProps {
  listOptions: {
    label: string
    value: string
    metadata?: string
  }[]
  onChange: (value: string) => void
  value?: string
  placeholder: string
  disabled?: boolean
  showOtherValue?: boolean
  showSearchBar?: boolean
}

const truncatedText = (text: string, maxChars: number) =>
  text?.length > maxChars ? text.slice(0, maxChars) + "..." : text

export const HTCombobox = ({
  listOptions,
  onChange,
  value,
  placeholder,
  disabled = false,
  showOtherValue = false,
  showSearchBar = true,
}: HTComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [otherValue, setOtherValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground",
            )}
          >
            {value &&
              truncatedText(
                listOptions.find((option) => option.value === value)?.label!,
                30,
              )}
            {otherValue &&
              !truncatedText(
                listOptions.find((option) => option.value === value)?.label!,
                30,
              ) &&
              truncatedText(value!, 30)}
            {!value && !otherValue && placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          {showSearchBar && <CommandInput placeholder="Search here" />}
          <CommandGroup>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {listOptions.map((option) => (
                <CommandItem
                  value={option.value}
                  key={option.value}
                  onSelect={(value) => {
                    onChange(value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
          <CommandSeparator />
        </Command>
        {showOtherValue && (
          <div className="flex gap-2 p-3">
            <Input
              placeholder="Other"
              value={otherValue}
              onChange={(e) => {
                onChange(e.target.value)
                setOtherValue(e.target.value)
              }}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
