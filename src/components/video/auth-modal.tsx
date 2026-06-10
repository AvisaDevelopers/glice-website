"use client";

import { OtpField } from "@/components/auth/otp-field";
import { useUiSession } from "@/components/site/ui-session-provider";
import {
  loginWithEmail,
  sendOtp,
  signupWithEmail,
  verifyOtp,
} from "@/features/auth/api/auth-api";
import { getErrorMessage } from "@/features/auth/lib/get-error-message";
import Link from "next/link";
import { useEffect, useState } from "react";

type AuthStep = "continue" | "email";
type SignupPhase = "details" | "otp";

export function AuthModal() {
  const { authModalOpen, authModalMode, closeAuth, setUserFromAuth } =
    useUiSession();
  const [step, setStep] = useState<AuthStep>("continue");
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [signupPhase, setSignupPhase] = useState<SignupPhase>("details");
  const [otp, setOtp] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (authModalOpen) {
      setStep("continue");
      setTab(authModalMode ?? "login");
      setSignupPhase("details");
      setOtp("");
      setSignupEmail("");
      setSignupName("");
      setSignupPassword("");
      setError(null);
      setOtpSent(false);
      setLoading(false);
    }
  }, [authModalOpen, authModalMode]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const response = await loginWithEmail(email, password);
      setUserFromAuth(response.user);
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleSendSignupOtp = async (
    email: string,
    name: string,
    password: string,
  ) => {
    setError(null);
    setLoading(true);
    try {
      await sendOtp(email, "verify");
      setSignupEmail(email);
      setSignupName(name);
      setSignupPassword(password);
      setSignupPhase("otp");
      setOtpSent(true);
      setOtp("");
    } catch (err) {
      setError(getErrorMessage(err, "Could not send verification code"));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? signupName).trim();
    const email = String(formData.get("email") ?? signupEmail).trim();
    const password = String(formData.get("password") ?? signupPassword);

    if (signupPhase === "details") {
      await handleSendSignupOtp(email, name, password);
      return;
    }

    if (otp.length !== 4) {
      setError("Enter the 4-digit verification code");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(signupEmail, otp);
      const response = await signupWithEmail({
        email: signupEmail,
        password: signupPassword,
        name: signupName,
      });
      setUserFromAuth(response.user);
    } catch (err) {
      setError(getErrorMessage(err, "Sign up failed"));
    } finally {
      setLoading(false);
    }
  };

  const signupSubmitLabel =
    signupPhase === "details" ? "Send verification code" : "Create account";

  return (
    <div
      className={`modal-backdrop${authModalOpen ? " is-open" : ""}`}
      aria-hidden={!authModalOpen}
      role="dialog"
      aria-labelledby="authModalTitle"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeAuth();
      }}
    >
      <div className="auth-modal">
        <button
          type="button"
          className="auth-modal-close"
          aria-label="Close"
          onClick={closeAuth}
        >
          <i className="ri-close-line" />
        </button>

        <div className={`auth-panel${step === "continue" ? " is-active" : ""}`}>
          <h2 id="authModalTitle">Start video chatting</h2>
          <p className="auth-modal-sub">Sign in to connect with people live.</p>
          <div className="auth-continue-list">
            <button type="button" className="continue-btn continue-btn--google" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              className="continue-btn continue-btn--email"
              onClick={() => setStep("email")}
            >
              <i className="ri-mail-line" aria-hidden="true" />
              Continue with Email
            </button>
          </div>
          <p className="auth-terms-note">
            By continuing, you agree to our{" "}
            <Link href="/terms-and-conditions" target="_blank">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className={`auth-panel${step === "email" ? " is-active" : ""}`}>
          <button type="button" className="hero-back" onClick={() => setStep("continue")}>
            <i className="ri-arrow-left-line" aria-hidden="true" />
            Back
          </button>
          <h2>Continue with email</h2>
          <div className="hero-email-tabs" role="tablist">
            <button
              type="button"
              className={`hero-tab${tab === "login" ? " is-active" : ""}`}
              role="tab"
              aria-selected={tab === "login"}
              onClick={() => {
                setTab("login");
                setError(null);
              }}
            >
              Log in
            </button>
            <button
              type="button"
              className={`hero-tab${tab === "signup" ? " is-active" : ""}`}
              role="tab"
              aria-selected={tab === "signup"}
              onClick={() => {
                setTab("signup");
                setSignupPhase("details");
                setError(null);
              }}
            >
              Sign up
            </button>
          </div>

          {error && (
            <p className="mt-3 text-center text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <form
            id="heroLoginForm"
            className={`hero-form${tab === "login" ? "" : " is-hidden"}`}
            onSubmit={handleLogin}
          >
            <div className="hero-field hero-field-icon">
              <i className="ri-mail-line" aria-hidden="true" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                autoComplete="email"
                disabled={loading}
              />
            </div>
            <div className="hero-field hero-field-icon">
              <i className="ri-lock-password-line" aria-hidden="true" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            <div className="auth-forgot-row">
              <Link href="/reset-password" className="auth-forgot" onClick={closeAuth}>
                Reset password
              </Link>
            </div>
            <button type="submit" className="btn-primary hero-submit" disabled={loading}>
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <form
            id="heroSignupForm"
            className={`hero-form${tab === "signup" ? "" : " is-hidden"}`}
            onSubmit={handleSignup}
          >
            {signupPhase === "details" && (
              <>
                <div className="hero-field hero-field-icon">
                  <i className="ri-user-line" aria-hidden="true" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    autoComplete="name"
                    disabled={loading}
                  />
                </div>
                <div className="hero-field hero-field-icon">
                  <i className="ri-mail-line" aria-hidden="true" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                <div className="hero-field hero-field-icon">
                  <i className="ri-lock-password-line" aria-hidden="true" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                </div>
              </>
            )}

            {signupPhase === "otp" && (
              <div className="mt-4 mb-2">
                <p className="mb-3 text-center text-sm text-textMuted">
                  {otpSent
                    ? `Enter the code sent to ${signupEmail}`
                    : "Enter your verification code"}
                </p>
                <OtpField value={otp} onChange={setOtp} disabled={loading} />
                <button
                  type="button"
                  className="auth-forgot mt-3 w-full text-center"
                  disabled={loading}
                  onClick={() =>
                    handleSendSignupOtp(signupEmail, signupName, signupPassword)
                  }
                >
                  Resend code
                </button>
              </div>
            )}

            <label className="auth-terms">
              <input type="checkbox" name="terms" required disabled={loading} />
              <span>
                I agree to the{" "}
                <Link href="/terms-and-conditions" target="_blank">
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" target="_blank">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            <button type="submit" className="btn-primary hero-submit" disabled={loading}>
              {loading ? "Please wait…" : signupSubmitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
