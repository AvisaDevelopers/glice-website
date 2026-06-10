"use client";

import { useRef } from "react";

type OtpFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function OtpField({ value, onChange, disabled }: OtpFieldProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(4, " ").slice(0, 4).split("");

  const updateDigit = (index: number, digit: string) => {
    const next = digits.map((char, i) => (i === index ? digit : char));
    const joined = next.join("").replace(/\s/g, "");
    onChange(joined.slice(0, 4));
    if (digit && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3" role="group" aria-label="Verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          value={digit.trim()}
          className="h-12 w-12 rounded-lg border border-hair bg-surface text-center text-lg text-textMain outline-none focus:border-primary"
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "").slice(-1);
            updateDigit(index, next);
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !digit.trim() && index > 0) {
              inputsRef.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </div>
  );
}
