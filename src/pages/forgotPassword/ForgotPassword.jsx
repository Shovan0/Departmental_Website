import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOtp, setShowOtp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [disableReset, setDisableReset] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const API = import.meta.env.VITE_SERVER;

    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // STEP 1: Send OTP
    const handleSendOtp = async () => {
        setError("");
        setDisableReset(true);

        try {
            await axios.post(`${API}/api/auth/forgot-password`, { email });
            setStep(2);
        } catch {
            setError("Email not registered");
        } finally {
            setDisableReset(false);
        }
    };

    // STEP 2: Verify OTP
    const handleVerifyOtp = async () => {
        setError("");
        try {
            await axios.post(`${API}/api/auth/verify-otp`, { email, otp });
            setStep(3);
        } catch {
            setError("Invalid or expired OTP");
        }
    };

    // STEP 3: Reset Password
    const handleResetPassword = async () => {
        setError("");

        if (newPassword !== confirmPassword) {
            return setError("Passwords do not match");
        }

        if (!strongPasswordRegex.test(newPassword)) {
            return setError(
                "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
            );
        }

        try {
            setDisableReset(true);

            await axios.post(`${API}/api/auth/reset-password`, {
                email,
                otp,
                newPassword,
            });

            setSuccess("Password reset successfully. Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch {
            setError("Failed to reset password");
            setDisableReset(false);
        }
    };

    return (
        <div className="fp-container">
            <div className="fp-card">
                <h2 className="fp-title">Forgot Password</h2>

                {error && <p className="fp-error">{error}</p>}
                {success && <p className="fp-success">{success}</p>}

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Registered Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="fp-input"
                        />

                        <button
                            onClick={handleSendOtp}
                            className="fp-button"
                            disabled={disableReset}
                        >
                            {loading ? <span className="loader"></span> : "Send OTP"}
                        </button>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <div className="fp-password-wrapper">
                            <input
                                type={showOtp ? "text" : "password"}
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="fp-input"
                                autoComplete="one-time-code"
                            />
                            <span
                                className="fp-toggle"
                                onClick={() => setShowOtp(!showOtp)}
                            >
                                {showOtp ? "Hide" : "Show"}
                            </span>
                        </div>

                        <button onClick={handleVerifyOtp} className="fp-button">
                            Verify OTP
                        </button>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <div className="fp-password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="fp-input"
                                autoComplete="new-password"
                            />
                            <span
                                className="fp-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>

                        <div className="fp-password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="fp-input"
                                autoComplete="new-password"
                            />
                            <span
                                className="fp-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </span>
                        </div>

                        <button
                            onClick={handleResetPassword}
                            className="fp-button"
                            disabled={disableReset}
                        >
                            Reset Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
