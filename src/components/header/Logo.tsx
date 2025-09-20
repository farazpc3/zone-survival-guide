import Image from "next/image";

export default function Logo() {
  return (
    <div className="p-2 bg-[rgb(25,25,25)] rounded-full inset-ring-gray-600">
      <Image
        src="/zsg-logo.svg"
        alt="Site Logo"
        width={20}
        height={20}
        unoptimized // <-- prevents extra attributes that cause mismatch
        priority
        className="w-17"
      />
    </div>
  );
}
