import { useState } from "react";
import { verifyEmail } from "../configs/auth";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { AuthLayout, AuthHeader } from "../components/auth";
import { AuthButton } from "../components/auth";
import { reload } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const VerifyEmailPage = () => {
    const { currentUser } = useAuth();
    let navigate = useNavigate()
    const [sent, setSent] = useState(false);
    const [shake, setShake] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null)

    const checkVerification = async () => {
        await reload(currentUser);
        if (currentUser.emailVerified) {
            setFeedbackMessage(null)
            navigate("/");
        } else {
            setFeedbackMessage("Email not verified! Please Verify before continuing.")
        }
    };

    const shakeAnimation = {
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.4 },
    };

    const successAnimation = {
        scale: [1, 1.03, 1],
        transition: { duration: 0.3 },
    };

    const resend = async () => {
        try {
            await verifyEmail(currentUser);
            setSent(true);
        } catch (err) {
            console.error(err);
            setShake(true);
            setTimeout(() => setShake(false), 400);
        }
    };

    return (
        <AuthLayout
            title={
                <>
                    Verify your email,<br />
                    <span className="text-gray-400">before proceeding</span>
                </>
            }
            subtitle="We’ve sent a verification link to your email. Please check your inbox."
        >
            <AuthHeader
                title="Email Verification"
                subtitle="Please verify your email to continue."
            />

            <motion.div animate={shake ? shakeAnimation : sent ? successAnimation : {}}>
                <motion.div className="space-y-4.5 overflow-hidden">
                    <motion.p className="text-center text-lg text-gray-900">
                        We sent a verification link to <strong>{currentUser?.email}</strong>.
                        Please check your inbox before continuing.
                    </motion.p>

                    <motion.div>
                        <AuthButton
                            type="button"
                            onClick={resend}
                            disabled={sent}
                            className="w-full"
                        >
                            {sent ? "Email sent!" : "Resend verification email"}
                        </AuthButton>
                    </motion.div>
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Verified Email?{" "}
                        <span
                            className="text-gray-900 font-medium hover:underline cursor-pointer"
                            onClick={checkVerification}
                        >
                            Continue
                        </span>
                    </p>
                </motion.div>
            </motion.div>

            {sent && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 mt-4 text-center"
                >
                    Verification email sent! Please check your inbox.
                </motion.p>
            )}
            {feedbackMessage && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 mt-4 text-center"
                >
                    {feedbackMessage}
                </motion.p>
            )}
        </AuthLayout>
    );
};