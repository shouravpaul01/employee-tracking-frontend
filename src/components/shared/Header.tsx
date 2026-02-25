import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Header({
  title,
  backHref,
  rightContent,
}: {
  title: string;
  backHref?: string;
  rightContent?: ReactNode;
}) {
  return (
    <div className="container flex border-b items-center py-2">
      <div className="flex-1 flex items-center gap-2">
        {backHref && (
          <Button
            asChild
            variant={"ghost"}
            size={"icon-sm"}
            className="rounded-full text-neutral-700"
          >
            <Link href={backHref}>
              <ChevronLeft className="size-6" />
            </Link>
          </Button>
        )}
        <h1 className=" text-lg font-semibold text-neutral-700">{title}</h1>
      </div>
      {rightContent}
    </div>
  );
}
