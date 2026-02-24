import React from 'react'
import { Button } from '../ui/button'
import { CalendarDays, MapPin, SquarePen, Users } from 'lucide-react'

export default function ProjectCard({i}:{i:number}) {
  return (
    <div  className="p-4 border rounded-lg space-y-2">
              <div className="flex">
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-700 ">
                    Project {i + 1}
                  </h3>
                  <p className="text-neutral-600">Jhon de</p>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="bg-primary/10 border border-primary text-primary rounded-full px-2">
                    Completed
                  </span>
                  <Button variant={"ghost"} size={"icon-sm"}>
                    <SquarePen />
                  </Button>
                </div>
              </div>
              <div className="flex item-center gap-4">
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <CalendarDays className="size-4" />
                  <p>thu,02,2026</p>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <Users className="size-4" />
                  <p>10</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <MapPin className="size-4" />
                <p>10</p>
              </div>
            </div>
  )
}
