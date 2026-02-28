// src\app\(defaultLayout)\admin\projects\page.tsx
"use client";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgePlus, SearchIcon, Loader2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import ProjectCard from "@/components/projects/ProjectCard";
import { CreateProjectFormDialog } from "@/components/projects/CreateProjectFormDialog";
import Header from "@/components/shared/Header";
import { projectStatus } from "@/constant";

import ProjectCardSkeleton from "@/components/shared/ProjectCardSkeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllProjectsInfiniteInfiniteQuery } from "@/redux/api/projectApi";

export default function Page() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 1000);

  const queryArg = useMemo(() => ({
    status: activeTab === "All" ? undefined : activeTab,
    searchTerm: debouncedSearch,
    limit: 10,
  }), [activeTab, debouncedSearch]);

  // Infinite query hook
  const {
    data,                  
    isLoading,               
    isFetching,          
    fetchNextPage,           
    hasNextPage,           
    isFetchingNextPage,      
  } = useGetAllProjectsInfiniteInfiniteQuery(queryArg);

  // Combine all pages into flat array
  const allProjects = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data]
  );

  // Scroll handler for infinite scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    if (scrollHeight - scrollTop <= clientHeight * 1.2) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Tab change handler
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header
        title="Projects"
        rightContent={
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-primary hover:text-primary cursor-pointer"
            onClick={() => setCreateDialogOpen(true)}
          >
            <BadgePlus className="size-6" />
          </Button>
        }
      />

      <div className="container py-3 flex-1 overflow-hidden flex flex-col">
        {/* Search Bar */}
        <div className="sticky top-0 bg-background z-10 pb-3">
          <InputGroup className="h-12">
            <InputGroupInput
              placeholder="Search projects..."
              className="h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Status Tabs */}
        <div className="sticky top-[60px] bg-background z-10 pb-3">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex w-max space-x-2 p-1">
                <TabsList className="inline-flex h-auto p-0 bg-transparent gap-2">
                  <TabsTrigger
                    value="All"
                    className="px-4 py-1.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    All
                  </TabsTrigger>
                  {projectStatus.map((status) => (
                    <TabsTrigger
                      key={status}
                      value={status.toUpperCase()}
                      className="px-4 py-1.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Tabs>
        </div>

        {/* Projects List with Infinite Scroll */}
        <div 
          className="flex-1  pb-4 space-y-4"
          onScroll={handleScroll}
        >
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {allProjects.map((project) => (
                <ProjectCard key={project.id} data={project} isClickable />
              ))}

              {allProjects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No projects found</p>
                </div>
              )}

              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-gray-500">Loading more...</span>
                </div>
              )}

              {!hasNextPage && allProjects.length > 0 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  ✨ You've seen all projects
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CreateProjectFormDialog
      
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}