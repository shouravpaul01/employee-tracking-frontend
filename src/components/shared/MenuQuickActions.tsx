"use client"
import { ChevronRight, FileText, UserPlus, Bell, Users } from "lucide-react"
import { CreateUserFormDialog } from "../admin/profile/CreateUserFormDialog"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function MenuQuickActions() {
  const router=useRouter()
  const [openDialog,setOpenDialog]=useState(false)
  const actions = [
    { title: "Generate Quote", icon: FileText, onClick: () => {} },
    { title: "Create User", icon: UserPlus, onClick: () => {setOpenDialog(true)} },
    { title: "Notifications", icon: Bell, onClick: () => {} },
    { title: "Employee List", icon: Users, onClick: () => {router.push("/admin/employees")} },
  ]

  return (
  <>
    <div className="flex flex-col border rounded-lg w-full max-w-2xl divide-y">
      {actions.map((action) => (
        <div
          key={action.title}
          className="group  transition cursor-pointer"
          onClick={action.onClick}
        >
          <div className="p-6 flex items-center gap-3">
            
            {/* Left */}
            <div className="flex-1 flex items-center gap-2">
              <action.icon className="size-5 text-gray-500 group-hover:text-primary transition" />
              <span className="font-medium text-gray-700 group-hover:text-primary transition">
                {action.title}
              </span>
            </div>

            {/* Right Arrow */}
            <ChevronRight className="text-gray-400 group-hover:text-primary transition" />
          </div>
        </div>
      ))}
    </div>

    <CreateUserFormDialog open={openDialog}  onOpenChange={setOpenDialog}/>
  </>
  )
}