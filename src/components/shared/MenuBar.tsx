"use client"

import * as React from "react"
import { Home, Calendar, Clock, Receipt, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { id: "project", label: "Project", icon: Home },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "timecards", label: "Timecards", icon: Clock },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "profile", label: "Profile", icon: User },
]

export function MenuBar() {
  const [activeItem, setActiveItem] = React.useState("project")

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      
      {/* optional max width for centered layout */}
      <div className="max-w-md mx-auto flex justify-between px-2 py-2">
        
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveItem(item.id)}
              className={`
                flex flex-col items-center justify-center gap-1 flex-1 h-auto py-2
                transition-all duration-200
                ${isActive 
                    ? "text-primary bg-primary/10 rounded-md" 
                    : "hover:bg-primary/10 hover:rounded-md hover:text-primary "
                  }
                
              `}
            >
              <Icon
                className={`size-5 transition-all ${
                  isActive ? "text-primary scale-110" : ""
                }`}
              />
              <span className="text-[11px]">{item.label}</span>

              {/* active indicator */}
              <div
                className={`
                  mt-1 h-1 w-6 rounded-full transition-all
                  ${isActive ? "bg-primary" : "bg-transparent"}
                `}
              />
            </Button>
          )
        })}

      </div>
    </div>
  )
}