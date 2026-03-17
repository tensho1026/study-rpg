"use client";

import type React from "react";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "@/lib/schemas/auth";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [router, status]);

  const onSubmit = async (data: LoginForm) => {
    await signIn("email", {
      email: data.email,
      redirect: true,
      callbackUrl: "/home",
    });
  };
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl md:text-2xl text-foreground mb-2">
            勉強クエスト
          </h1>
          <p className="text-xs text-muted-foreground">LOGIN</p>
        </div>

        {/* Login Form */}
        <Card className="rpg-window bg-card p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-card-foreground">
                  メールアドレス
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="rpg-input bg-background text-foreground border-2 border-border"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rpg-button bg-primary text-primary-foreground hover:bg-primary/90"
            >
              ログイン
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">または</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/home",
                })
              }
              type="button"
              className="w-full rpg-button bg-card text-card-foreground border-2 border-border hover:bg-muted"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Googleでログイン
            </Button>

            {/* Guest Login Button */}
            <Button
              onClick={() =>
                signIn("guest", {
                  redirect: true,
                  callbackUrl: "/home",
                })
              }
              type="button"
              className="w-full rpg-button bg-accent text-accent-foreground border-2 border-border hover:bg-accent/90"
            >
              ゲストログイン
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              アカウントをお持ちでない方は{" "}
              <Link
                href="/auth/signup"
                className="text-primary hover:underline"
              >
                新規登録
              </Link>
            </p>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
