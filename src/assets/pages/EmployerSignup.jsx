import { useState } from "react";
import { Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"; import { useForm } from 'react-hook-form'
import { useAuth } from "../contexts/AuthContext";
import { createUser } from "../configs/auth";
import { saveEmployerToFireStore } from "../configs/firestore";

import { AuthLayout, AuthHeader } from "../components/auth";
import { empsignupSchema } from '../features/auth/validators/empsignupSchema'
import { EmployerSignupForm } from "../features/auth/EmployerSignupForm";

export const EmployerSignup = ({ setIsEmployer }) => {
    const { isLoggedIn } = useAuth();

    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(empsignupSchema),
    });

    if (isLoggedIn) return <Navigate to="/" />;

    const onSubmit = async (data) => {
        try {
            const res = await createUser(data.email, data.password);
            const employer = res.user;

            await saveEmployerToFireStore(
                employer.uid,
                data.fullName,
                data.email,
                data.companyName
            );

            setIsSuccess(true);
        } catch (err) {
            console.error(err);
        }
    };

    const onError = () => {
        setShake(true);
        setTimeout(() => setShake(false), 400);
    }

    return (
        <AuthLayout
            title={
                <>
                    Hire smarter,<br />
                    <span className="text-gray-400">grow faster</span>
                </>
            }
            subtitle="Create an employer account to manage hiring efficiently."
        >
            <AuthHeader
                title="Employer signup"
                subtitle="Create your company account"
            />

            <EmployerSignupForm
                register={register}
                errors={errors}
                onSubmit={handleSubmit(onSubmit, onError)}
                setIsEmployer={setIsEmployer}
                shake={shake}
                isSuccess={isSuccess}
            />
        </AuthLayout>
    );
};