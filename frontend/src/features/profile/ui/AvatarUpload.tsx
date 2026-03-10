"use client";

import { type ChangeEvent, useState } from "react";
import Image from "next/image";
import { Edit } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { SERVER_URL } from "@/shared/config/api.config";

interface Props {
  value?: string;
  onChange: (url: string) => void;
}

export function AvatarUpload({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${SERVER_URL}/media-upload/avatar`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    const data = await res.json();

    onChange(data.url);

    setLoading(false);
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      upload(file);
    }
  };

  return (
    <label className="relative mr-4 h-16 w-16 cursor-pointer rounded-full">
      <input type="file" hidden accept="image/*" onChange={handleUpload} />
      <Image
        src={value || "/images/avatar-placeholder.png"}
        alt="avatar"
        width={100}
        height={100}
        className="h-full w-full rounded-full object-cover"
      />
      <Button
        variant="soft"
        size="sm"
        className="absolute -right-4 -bottom-3 bg-transparent hover:bg-transparent"
        asChild
        disabled={loading}
      >
        <span>
          <Edit />
        </span>
      </Button>
    </label>
  );
}
