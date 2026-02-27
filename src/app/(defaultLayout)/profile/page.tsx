"use client";
import { UserProfileCard } from "@/components/shared/UserProfileCard";
import Header from "@/components/shared/Header";
import { MenuQuickActions } from "@/components/shared/MenuQuickActions";
import StateCount from "@/components/shared/StateCount";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogoutApiMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

import { useGetMeQuery } from "@/redux/api/userApi";
import Loading from "@/components/shared/Loading";

export default function page() {
  const [logoutApi] = useLogoutApiMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {data,isLoading:isGetMeLoading}=useGetMeQuery(undefined)
  const user=data?.data?.user
  const summery=data?.data?.summery
  const handleLogout = async () => {
    try {
      await logoutApi(undefined).unwrap();
      dispatch(logout());
      router.push("/login");
      toast.success("Successfully logout");
    } catch (error) {
      console.log(error, "eeee");
      toast.error("Something went wrong. Please try again later.");
    }
  };

  if (isGetMeLoading) {
    return <Loading />
  }
  return (
    <div>
      <Header title="Profile" />
      <div className="container space-y-4">
        <UserProfileCard data={user}  />
        <div className="grid grid-cols-3 gap-2.5">
          <StateCount count={summery?.totalProjects || 0} title="Projects" />
          <StateCount count={`${summery?.totalEmployeeMonthlyHours || 0}h`} title="This Month" />
          <StateCount count={`$${summery?.totalApprovedExpenses}`} title="Expenses" />
        </div>
        <MenuQuickActions />
        <Button
          variant={"outline"}
          className="w-full bg-red-100 border-red-400 text-red-400 hover:bg-red-200 hover:border-red-400 hover:text-red-400 "
          onClick={() => handleLogout()}
        >
          <LogOut /> Logout
        </Button>
      </div>
    </div>
  );
}
