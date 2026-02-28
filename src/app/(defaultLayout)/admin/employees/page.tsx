// src\app\(defaultLayout)\admin\employees\page.tsx
"use client";

import Header from "@/components/shared/Header";
import { UserProfileCard } from "@/components/shared/UserProfileCard";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersInfiniteInfiniteQuery } from "@/redux/api/userApi";

import { useEffect, useRef } from "react";

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetAllUsersInfiniteInfiniteQuery({ limit: 30 });

  // Flatten pages
  const users =
    data?.pages?.flatMap((page) => page?.data || []) || [];

  // Intersection Observer (auto load)
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div>
      <Header title="Employees" backHref="/profile" />

      <div className="container space-y-4">
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id} className="hover:bg-transparent">
                  <TableCell className="p-4">
                    <UserProfileCard
                      data={user}
                      wrapperClassName="p-0! border-none"
                      isHideRoleBadge
                    />
                  </TableCell>
                </TableRow>
              ))}

              {/* Loader */}
              {isLoading && (
                <TableRow>
                  <TableCell className="p-4 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}

            
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}