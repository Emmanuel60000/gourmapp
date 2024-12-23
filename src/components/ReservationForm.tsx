'use client'

import { useState } from 'react'
import { CalendarIcon, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function ReservationForm() {
  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement reservation logic here
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 ">
      <h1 className="text-3xl font-semibold text-customHighlight mb-8">Réserver une table</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Restaurant</label>
          <Select>
            <SelectTrigger className="w-full p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <SelectValue placeholder="Selectionnez un restaurant" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md rounded-lg">
              <SelectItem value="restaurant1" className="bg-white hover:bg-gray-100">Le Gourmet</SelectItem>
              <SelectItem value="restaurant2" className="bg-white hover:bg-gray-100">Chez Marie</SelectItem>
              <SelectItem value="restaurant3" className="bg-white hover:bg-gray-100">La Brasserie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  "p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-lg" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Heure</label>
          <Select>
            <SelectTrigger className="w-full p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <SelectValue placeholder="Selectionnez une heure" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md rounded-lg">
              {Array.from({ length: 9 }, (_, i) => i + 12).map((hour) => (
                <SelectItem key={hour} value={`${hour}:00`} className="bg-white hover:bg-gray-100">
                  {`${hour}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Nombre de personnes</label>
          <Select>
            <SelectTrigger className="w-full p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <SelectValue placeholder="Selectionnez le nombre de personnes" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md rounded-lg">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()} className="bg-white hover:bg-gray-100">
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
  variant="default"
  size="default"
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-lg shadow-[0_4px_14px_rgba(255,122,0,0.4)] "
>
  Réserver
</Button>


      </form>
    </div>
  )
}
