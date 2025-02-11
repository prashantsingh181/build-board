"use client";
import { X } from "lucide-react";
import Link from "next/link";
export default function SearchFormReset() {
  const reset = function () {
    const form = document.querySelector(".search-form");
    if (form) {
      form.reset();
    }
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
}
