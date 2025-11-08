"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const { data } = useSession();

  const handleClick = () => {
    router.push(data ? "/home" : "/auth/signin");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 背景 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_center,rgba(100,150,255,0.15)_0%,transparent_80%)]" />
      <div className="absolute inset-0 z-0 animate-[bgScroll_60s_linear_infinite] bg-[url('/textures/stars.png')] opacity-40" />

      {/* 魔法陣 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25, rotate: 360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-[url('/textures/magic-circle.png')] bg-contain bg-no-repeat opacity-20"
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center space-y-10">
        {/* タイトル */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-extrabold tracking-widest 
          bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent 
          drop-shadow-[0_0_20px_rgba(120,90,255,0.5)]"
        >
          STUDY QUEST
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-sm md:text-base tracking-[0.3em] text-slate-400 uppercase"
        >
          勉強を冒険に変えるRPG
        </motion.p>

        {/* 冒険ボタン */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="pt-8 space-y-6"
        >
          <Button
            onClick={handleClick}
            className="w-64 py-4 text-lg font-bold tracking-wider rounded-xl
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            shadow-[0_0_20px_rgba(180,120,255,0.4)]
            hover:brightness-110 hover:shadow-[0_0_30px_rgba(200,160,255,0.7)]
            active:scale-[0.98]
            transition-all duration-300"
          >
            冒険を始める
          </Button>

          {/* ログイン・新規登録 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-2">
            {/* ログイン */}
            <Link href="/auth/signin" className="w-48">
              <Button
                variant="outline"
                className="w-full border-indigo-400/60 text-indigo-200 
                hover:text-white hover:bg-indigo-500/30 hover:border-indigo-300
                hover:shadow-[0_0_20px_rgba(130,170,255,0.6)]
                active:scale-[0.98]
                transition-all duration-300 text-sm py-3 font-semibold tracking-wide"
              >
                ログイン
              </Button>
            </Link>

            {/* 新規登録 */}
            <Link href="/auth/signup" className="w-48">
              <Button
                variant="outline"
                className="w-full border-pink-400/60 text-pink-200 
                hover:text-white hover:bg-pink-500/30 hover:border-pink-300
                hover:shadow-[0_0_20px_rgba(255,150,200,0.6)]
                active:scale-[0.98]
                transition-all duration-300 text-sm py-3 font-semibold tracking-wide"
              >
                新規登録
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* フッター */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2 }}
          className="text-xs text-slate-500 mt-16 tracking-widest"
        >
          © 2025 Study Quest RPG
        </motion.p>
      </div>

      {/* 光粒子 */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: ["0%", "120%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </main>
  );
}
