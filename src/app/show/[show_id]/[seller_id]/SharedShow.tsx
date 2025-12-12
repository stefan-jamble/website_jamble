"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

interface ShowData {
  title: string;
  description: string;
  starting_at: string;
  cover_image: { original_url: string };
  bookmark_count: number;
}

interface ProfileData {
  username: string;
  profile_image: { original_url: string };
}

interface SharedShowProps {
  show: ShowData;
  profile: ProfileData;
  countryCode: string;
}

export default function SharedShow({ show, profile, countryCode }: SharedShowProps) {
  const isBR = countryCode === "BR";
  const date = new Date(show.starting_at);
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${dayName}. ${month}/${day} • ${hours}:${minutes}`;

  return (
    <div 
      className="p-6 w-full flex flex-col justify-center items-stretch gap-y-6"
      style={{
        backgroundImage: 'url("/bg-pattern.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col justify-center items-center gap-y-5 border border-slate-200 border-1 px-6 py-8 rounded-2xl bg-white">
        <div className="flex flex-row justify-center items-center gap-x-2">
          <Image className="rounded-full" src={profile.profile_image.original_url} alt={profile.username} height={48} width={48} />
          <p className="font-bold">@{profile.username}</p>
        </div>

        <div className="rounded-full bg-red-500 px-4 py-2">
          <p className="font-semibold text-sm text-white">{formattedDate}</p>
        </div>

        <p className="font-semibold text-center text-3xl">{show.title}</p>

        <div className="rounded-full px-4 py-2 bg-[#7E53F8]">
          <a href="https://jamblelink.com" className="text-white font-semibold">Join The Show</a>
        </div>
        <Image className="rounded-2xl" src={show.cover_image.original_url} alt={show.title} height={300} width={300} />
        <p>Bookmarks: {show.bookmark_count}</p>
      </div>
    </div>
  );
}
