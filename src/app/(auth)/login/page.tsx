"use client";

import * as React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
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




export default function LoginPage() {
  const [userType, setUserType] = React.useState<"employee" | "admin">(
    "employee",
  );
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "employee",
    },
  });

  // sync userType with form
  React.useEffect(() => {
    form.setValue("userType", userType);
  }, [userType, form]);

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);

      // 👉 API call example
      console.log("Login data:", data);

      // fake delay
      await new Promise((res) => setTimeout(res, 1000));

      toast.success("Login successful 🚀");

      // 👉 redirect / store token here
    } catch (error) {
      toast.error("Login failed ❌");
    } finally {
      setLoading(false);
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
          
            value={form.watch("userType")}
            onValueChange={(value) =>
              form.setValue("userType", value as "employee" | "admin")
            }
          >
            <TabsList className="grid w-full grid-cols-2" >
              <TabsTrigger value="employee" >Employee</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </Tabs>


          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </FieldGroup>
      </div>
    </div>
  );
}
