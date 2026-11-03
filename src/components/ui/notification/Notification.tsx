"use client";

import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

type NotificationColor = 'green' | 'red';

interface Props {
  color: NotificationColor;
  message: string;
  durationSeconds?: number;
}

const colorClasses: Record<NotificationColor, string> = {
  green: 'border-green-400 bg-green-300 text-green-800',
  red: 'border-red-400 bg-red-100 text-red-800',
};

export const Notification = ({ color, message, durationSeconds = 5 }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (durationSeconds === undefined) return;

    const timeoutId = window.setTimeout(
      () => setIsVisible(false),
      durationSeconds * 1000
    );

    return () => window.clearTimeout(timeoutId);
  }, [durationSeconds]);

  if (!isVisible) return null;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-md border px-4 py-3 ${colorClasses[color]}`}
      role={color === 'red' ? 'alert' : 'status'}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="font-bold cursor-pointer hover:bg-green-200 focus:outline-none focus:bg-green-200 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 rounded-md p-1"
        aria-label="Cerrar notificación"
      >
        <IoCloseCircleOutline size={25}/>
      </button>
    </div>
  );
};
