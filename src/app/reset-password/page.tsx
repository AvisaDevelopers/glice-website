"use client";

import { OtpField } from "@/components/auth/otp-field";
import {
  sendOtp,
  updatePassword,
  verifyOtp,
} from "@/features/auth/api/auth-api";
import { getErrorMessage } from "@/features/auth/lib/get-error-message";
import Link from "next/link";
import { useState } from "react";

type ResetStep = "email" | "otp" | "password" | "done";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const nextEmail = String(formData.get("email") ?? "").trim();

    try {
      await sendOtp(nextEmail, "reset");
      setEmail(nextEmail);
      setOtp("");
      setStep("otp");
    } catch (err) {
      setError(getErrorMessage(err, "Could not send reset code"));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.length !== 4) {
      setError("Enter the 4-digit verification code");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      setStep("password");
    } catch (err) {
      setError(getErrorMessage(err, "Invalid verification code"));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirmPassword") ?? "");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await updatePassword({ email, password, oldPassword: null });
      setStep("done");
    } catch (err) {
      setError(getErrorMessage(err, "Could not update password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero hero--below-header px-6 pb-12">
      <div className="reveal relative z-10 mx-auto max-w-md">
        <h1 className="display-3 balance mt-5 mb-4 text-center">
          Reset your password
        </h1>
        <p className="lede mb-8 text-center">
          {step === "email" &&
            "Enter the email linked to your account. We will send you a verification code."}
          {step === "otp" &&
            `Enter the 4-digit code sent to ${email}.`}
          {step === "password" && "Choose a new password for your account."}
          {step === "done" &&
            "Your password has been updated. You can log in with your new password."}
        </p>

        <div className="panel p-6 md:p-8">
          {error && (
            <p className="mb-4 text-center text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          {step === "email" && (
            <form className="hero-form" onSubmit={handleSendCode}>
              <div className="hero-field hero-field-icon mb-3.5">
                <i className="ri-mail-line" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn-primary hero-submit"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send verification code"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form className="hero-form" onSubmit={handleVerifyOtp}>
              <div className="mb-6">
                <OtpField value={otp} onChange={setOtp} disabled={loading} />
              </div>
              <button
                type="button"
                className="auth-forgot mb-4 w-full text-center"
                disabled={loading}
                onClick={async () => {
                  setError(null);
                  setLoading(true);
                  try {
                    await sendOtp(email, "reset");
                  } catch (err) {
                    setError(getErrorMessage(err, "Could not resend code"));
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Resend code
              </button>
              <button
                type="submit"
                className="btn-primary hero-submit"
                disabled={loading}
              >
                {loading ? "Verifying…" : "Verify code"}
              </button>
            </form>
          )}

          {step === "password" && (
            <form className="hero-form" onSubmit={handleUpdatePassword}>
              <div className="hero-field hero-field-icon mb-3.5">
                <i className="ri-lock-password-line" aria-hidden="true" />
                <input
                  type="password"
                  name="password"
                  placeholder="New password"
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>
              <div className="hero-field hero-field-icon mb-3.5">
                <i className="ri-lock-password-line" aria-hidden="true" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn-primary hero-submit"
                disabled={loading}
              >
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          )}

          {step === "done" && (
            <Link href="/" className="btn-primary hero-submit block text-center">
              Back to Glice
            </Link>
          )}

          {step !== "done" && (
            <p className="auth-terms-note mt-5 mb-0">
              Remember your password? <Link href="/">Back to Glice</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
