import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Contact = () => {
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axiosPublic.post('/contact', data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your message has been stored in our database.',
                    showConfirmButton: false,
                    timer: 2000
                });
                reset();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
            });
        }
    };

    return (
        <div className="py-8 md:py-12 px-4 bg-base-200 dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-gray-200 dark:border-gray-700">

                {/* বাম পাশ: কন্টাক্ট ইনফো (পুরো সাদা টেক্সট) */}
                <div className="md:w-2/5 bg-indigo-600 p-10 md:p-16 text-white flex flex-col justify-center">
                    <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight" style={{ color: '#ffffff' }}>
                        Contact Us
                    </h2>

                    <p className="mb-10 text-lg leading-relaxed opacity-100" style={{ color: '#ffffff' }}>
                        Have questions about Asset Verse? Reach out to our team, and we will get back to you as soon as possible.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-5">
                            <span className="text-2xl bg-white/20 p-4 rounded-2xl shadow-inner">📍</span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-90" style={{ color: '#ffffff' }}>Location</p>
                                <p className="font-semibold text-lg" style={{ color: '#ffffff' }}>Dhaka, Bangladesh</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-2xl bg-white/20 p-4 rounded-2xl shadow-inner">📧</span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-90" style={{ color: '#ffffff' }}>Email Us</p>
                                <p className="font-semibold text-lg" style={{ color: '#ffffff' }}>support@assetverse.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-2xl bg-white/20 p-4 rounded-2xl shadow-inner">📞</span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-90" style={{ color: '#ffffff' }}>Phone</p>
                                <p className="font-semibold text-lg" style={{ color: '#ffffff' }}>+880 1500 000000</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ডান পাশ: ফর্ম */}
                <div className="md:w-3/5 p-10 md:p-16 bg-white dark:bg-gray-800">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="form-control">
                            <label className="label font-bold text-gray-700 dark:text-gray-200 tracking-wide">Full Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="John Doe"
                                className={`input input-lg input-bordered dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <span className="text-red-500 text-sm mt-1 font-medium">{errors.name.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label font-bold text-gray-700 dark:text-gray-200 tracking-wide">Email Address</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                                placeholder="example@mail.com"
                                className={`input input-lg input-bordered dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <span className="text-red-500 text-sm mt-1 font-medium">{errors.email.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label font-bold text-gray-700 dark:text-gray-200 tracking-wide">Message</label>
                            <textarea
                                {...register("message", {
                                    required: "Message cannot be empty",
                                    minLength: { value: 10, message: "At least 10 characters" }
                                })}
                                className="textarea textarea-bordered h-40 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 text-lg transition-all"
                                placeholder="Tell us how we can help you..."
                            ></textarea>
                            {errors.message && <span className="text-red-500 text-sm mt-1 font-medium">{errors.message.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-lg bg-indigo-600 hover:bg-indigo-700 text-white w-full border-none mt-4 shadow-xl active:scale-95 transition-all font-black uppercase tracking-widest">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;