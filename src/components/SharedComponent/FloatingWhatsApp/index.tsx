import React from "react";
import { Icon } from "@iconify/react";

const FloatingWhatsApp: React.FC<{ number?: string; message?: string }> = ({
  number,
  message,
}) => {
  const phone =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || number || "3165484013";
  const text = encodeURIComponent(message || "Hello, I would like to work with you.");
  const href = `https://wa.me/${phone.replace(/\D/g, "")}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WhatsApp chat"
      className="fixed bottom-20 right-6 z-50 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center"
    >
      <span className="whatsapp-ring" aria-hidden="true" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-pulse" aria-hidden="true" />
      <span className="relative flex items-center justify-center">
        <Icon
          icon="fa6-brands:whatsapp"
          width="24"
          height="24"
          className="transform scale-125"
          aria-hidden="true"
        />
      </span>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;
