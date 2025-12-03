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
}

export default function SharedShow({ show, profile }: SharedShowProps) {
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
      <div className="flex flex-row justify-between items-center gap-x-2">
        <Image src="/logo-jamble.png" alt="Jamble" height={48} width={48} />
        <p className="font-bold text-sm">Your friend invited you to join a show on Jamble!</p>
        <Drawer>
          <DrawerTrigger asChild>
            <div className="bg-black rounded-full px-3 py-2">
              <p className="text-white text-sm text-nowrap">Open App</p>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-left text-xl font-bold text-black">
                Let's get you started
              </DrawerTitle>
            </DrawerHeader>
            <div className="w-full flex flex-col justify-center items-stretch gap-y-2 px-4 pb-4">
              <Button asChild className="bg-[#7E53F8] text-white rounded-full">
                <a href="jamble://open">Open Jamble App</a>
              </Button>
              <Button asChild className="bg-gray-50 rounded-full">
                <a href="https://apps.apple.com/1599696300" target="_blank" rel="noopener noreferrer">
                  Download Jamble
                </a>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-5 border border-slate-200 border-1 px-6 py-8 rounded-2xl bg-white">
        <div className="flex flex-row justify-center items-center gap-x-2">
          <Image className="rounded-full" src={profile.profile_image.original_url} alt={profile.username} height={48} width={48} />
          <p className="font-bold">@{profile.username}</p>
        </div>

        <div className="rounded-full bg-red-500 px-4 py-2">
          <p className="font-semibold text-sm text-white">{formattedDate}</p>
        </div>

        <p className="font-semibold text-center text-3xl">{show.title}</p>

        {/* Another drawer / CTA button */}
        <Drawer>
          <DrawerTrigger asChild>
            <div className="rounded-full px-4 py-2 bg-[#7E53F8]">
              <p className="text-white font-semibold">Join The Show</p>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-left text-xl font-bold text-black">
                Let's get you started
              </DrawerTitle>
            </DrawerHeader>
            <div className="w-full flex flex-col justify-center items-stretch gap-y-2 px-4 pb-4">
              <Button asChild className="bg-[#7E53F8] text-white rounded-full">
                <a href="jamble://open">Open Jamble App</a>
              </Button>
              <Button asChild className="bg-gray-50 rounded-full">
                <a href="https://apps.apple.com/1599696300" target="_blank" rel="noopener noreferrer">
                  Download Jamble
                </a>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>

        <Image className="rounded-2xl" src={show.cover_image.original_url} alt={show.title} height={300} width={300} />
        <p>Bookmarks: {show.bookmark_count}</p>
      </div>
    </div>
  );
}
