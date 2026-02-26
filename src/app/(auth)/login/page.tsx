"use client";

import * as React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginSchema } from "@/validation/auth.validation";
import { useLoginMutation } from "@/redux/api/authApi";
import { Spinner } from "@/components/ui/spinner";
import { TTokenData, TValidatorError } from "@/type";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "ADMIN",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log("Login data:", data);

      const res = await login(data).unwrap();
      const decodedData: TTokenData = jwtDecode(res?.data?.accessToken);
      dispatch(setUser({ token: res?.data?.accessToken }));
      if (decodedData?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/employee/projects");
      }
      toast.success("Login successful 🚀");
    } catch (error: any) {
      if (error?.data?.message === "Validation Error") {
        error?.data?.errorMessages?.map((validatorErr: TValidatorError) =>
          form.setError(validatorErr?.path, { message: validatorErr.message }),
        );
      } else if (error?.status == 404 || error.status == 401) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Image src={logo} alt="logo" className="mx-auto size-30" />
          <h1 className="text-3xl font-bold -mt-10">
            Stage<span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Proper Staging Management
          </p>
        </div>

        <FieldGroup className="space-y-5">
          {/* User Type */}
          <Tabs
            value={form.watch("role")}
            onValueChange={(value) =>
              form.setValue("role", value as "EMPLOYEE" | "ADMIN")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="EMPLOYEE">Employee</TabsTrigger>
              <TabsTrigger value="ADMIN">Admin</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <FieldError errors={[form.formState.errors.email]} />
              )}
            </Field>

            {/* Password */}
            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <FieldError errors={[form.formState.errors.password]} />
              )}
            </Field>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </FieldGroup>
      </div>
    </div>
  );
}
