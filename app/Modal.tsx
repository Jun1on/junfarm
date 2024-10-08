"use client";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
const Modal = ({ isOpen, onClose, onSubmit }) => {
  function handleChange(value) {
    if (value.length == 4) {
      onSubmit(value);
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75  transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-background p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Enter Room Code</h2>
        <div className="flex justify-center">
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={handleChange}
            inputMode="text"
          >
            <InputOTPGroup className="uppercase">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  );
};

export default Modal;
