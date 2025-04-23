"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function TimeInput({ value, onChange, disabled = false }: TimeInputProps) {
  const [time, setTime] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
    onChange(e.target.value)
  }

  return <Input type="time" value={time} onChange={handleChange} className="w-32" disabled={disabled} />
}
