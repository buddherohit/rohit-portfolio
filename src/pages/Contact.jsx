import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Memoized contact info component for better performance
const ContactInfo = memo(({ icon, label, value, href }) => (
  <motion.a
    href={href}
    className="flex items-center gap-2 hover:text-red-600 transition-colors group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="text-gray-400 group-hover:text-red-600 transition-colors"
      whileHover={{ rotate: 5 }}
    >
      {icon}
    </motion.div>
    <span className="text-sm sm:text-base">{value}</span>
  </motion.a>
));

ContactInfo.displayName = 'ContactInfo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const lastSubmitTime = useRef(0);
  const formRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xu-alu3FkS-WZWtk_';
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  // Auto-dismiss messages
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Validation
  const validateForm = useCallback(() => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
      isValid = false;
    } else if (formData.message.trim().length > 2000) {
      errors.message = "Message must be less than 2000 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  }, [formData]);

  const sanitizeInput = useCallback((input) => {
    return input.trim().replace(/[<>]/g, "");
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage("");
    }
  }, [fieldErrors, submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime.current < 3000) {
      setSubmitStatus('error');
      setErrorMessage("Please wait a moment before submitting again.");
      return;
    }
    lastSubmitTime.current = now;

    if (!validateForm()) {
      setSubmitStatus('error');
      setErrorMessage("Please fix the errors in the form.");
      return;
    }

    if (formData.company && formData.company.trim().length > 0) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_l5wokda';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_zdj7wvw';

      if (!publicKey || publicKey.includes('your_emailjs') || publicKey.includes('here')) {
        throw new Error("VITE_EMAILJS_PUBLIC_KEY is missing or using placeholder.");
      }
      if (!serviceId || serviceId.includes('your_emailjs') || serviceId.includes('here')) {
        throw new Error("VITE_EMAILJS_SERVICE_ID is missing or using placeholder.");
      }
      if (!templateId || templateId.includes('your_emailjs') || templateId.includes('here')) {
        throw new Error("VITE_EMAILJS_TEMPLATE_ID is missing or using placeholder.");
      }

      const sanitizedName = sanitizeInput(formData.name);
      const sanitizedEmail = sanitizeInput(formData.email);
      const sanitizedSubject = sanitizeInput(formData.subject);
      const sanitizedMessage = sanitizeInput(formData.message);

      const templateParams = {
        from_name: sanitizedName,
        from_email: sanitizedEmail,
        user_email: sanitizedEmail,
        user_name: sanitizedName,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        message_html: sanitizedMessage.replace(/\n/g, '<br>'),
        to_name: "Rohit Buddhe",
        reply_to: sanitizedEmail,
        reply_email: sanitizedEmail,
        date: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const emailPromise = emailjs.send(serviceId, templateId, templateParams);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout. Please try again.")), 10000)
      );

      await Promise.race([emailPromise, timeoutPromise]);

      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "", company: "" });
      setFieldErrors({});

      if (formRef.current) {
        formRef.current.reset();
      }

      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);

      let userMessage = "";

      if (error.message) {
        if (error.message.includes("VITE_EMAILJS")) {
          userMessage = error.message;
        } else if (error.message.includes("timeout")) {
          userMessage = "The request took too long. Please check your connection and try again.";
        } else if (error.text) {
          userMessage = `EmailJS Error: ${error.text}. `;
          if (error.text.includes("Invalid template ID")) {
            userMessage += "Please check your VITE_EMAILJS_TEMPLATE_ID in your .env file.";
          } else if (error.text.includes("Invalid service ID")) {
            userMessage += "Please check your VITE_EMAILJS_SERVICE_ID in your .env file.";
          } else if (error.text.includes("Invalid public key")) {
            userMessage += "Please check your VITE_EMAILJS_PUBLIC_KEY in your .env file.";
          } else {
            userMessage += "Please verify your EmailJS configuration.";
          }
        } else {
          userMessage = error.message;
        }
      }

      if (!userMessage) {
        userMessage = "There was an error sending your message. Please try again or contact me directly at tanmaywarthe02@gmail.com";
      }

      setSubmitStatus('error');
      setErrorMessage(userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "rohitbuddhe564@gmail.com",
      href: "mailto:rohitbuddhe564@gmail.com"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+91 9322070756",
      href: "tel:+919322070756"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: "Nagpur, India",
      href: null
    }
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Optimized Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Animated gradient orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 -left-20 w-72 h-72 bg-red-100/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-72 h-72 bg-pink-100/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="intro"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="text-center space-y-6"
            >
              {/* Small Label */}
              <motion.p
                variants={itemVariants}
                className="text-xs text-gray-500 uppercase tracking-widest font-medium"
              >
                Get in touch
              </motion.p>

              {/* Main Heading with gradient text - SMALLER SIZE */}
              <motion.div variants={itemVariants} className="space-y-3">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                    Let's Work Together
                  </span>
                </h2>

                {/* Decorative underline - SMALLER */}
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-red-600 to-pink-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </motion.div>

              {/* Description - SMALLER */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4"
              >
                I'm open for new opportunities – especially ambitious or large projects. However, my inbox is always open. Whether you have a{" "}
                <span className="text-red-600 font-semibold">question</span> or just want to say{" "}
                <span className="text-red-600 font-semibold">hi</span>, I'll try my best to get back to you!
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-900 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background fill on hover */}
                  <div className="absolute inset-0 bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                  {/* Button content */}
                  <span className="relative z-10 flex items-center gap-2 text-gray-900 group-hover:text-white transition-colors duration-300">
                    <span className="font-bold">Say Hello</span>
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </span>
                </motion.button>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                variants={itemVariants}
                className="pt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
              >
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {method.href ? (
                      <a
                        href={method.href}
                        className="group flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all duration-300"
                      >
                        <motion.div
                          className="text-gray-400 group-hover:text-red-600 transition-colors"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          {method.icon}
                        </motion.div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                          {method.value}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg">
                        <div className="text-gray-400">{method.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{method.value}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              {/* Back Button */}
              <motion.button
                onClick={() => setShowForm(false)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </motion.button>

              {/* Form Card */}
              <motion.div
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
                <p className="text-gray-600 mb-6">Fill out the form below and I'll get back to you soon.</p>

                {/* Success/Error Messages */}
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                    >
                      <motion.div
                        className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <div>
                        <p className="text-green-800 font-semibold text-sm">Message sent successfully!</p>
                        <p className="text-green-700 text-xs mt-1">Thank you for reaching out. I'll respond within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                    >
                      <motion.div
                        className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.div>
                      <div>
                        <p className="text-red-800 font-semibold text-sm">Failed to send message</p>
                        <p className="text-red-700 text-xs mt-1">{errorMessage || "Please try again later."}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${fieldErrors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-red-500'
                          }`}
                        placeholder="Enter your name"
                      />
                      {fieldErrors.name && (
                        <p className="mt-2 text-xs text-red-600">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${fieldErrors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-red-500'
                          }`}
                        placeholder="Enter your email"
                      />
                      {fieldErrors.email && (
                        <p className="mt-2 text-xs text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${fieldErrors.subject
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-red-500'
                        }`}
                      placeholder="What's this about?"
                    />
                    {fieldErrors.subject && (
                      <p className="mt-2 text-xs text-red-600">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                        Message *
                      </label>
                      <span className={`text-xs ${formData.message.length > 2000
                        ? 'text-red-600'
                        : formData.message.length > 1800
                          ? 'text-yellow-600'
                          : 'text-gray-400'
                        }`}>
                        {formData.message.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      maxLength={2000}
                      className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all resize-none ${fieldErrors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-red-500'
                        }`}
                      placeholder="Tell me about your project or inquiry..."
                    />
                    {fieldErrors.message && (
                      <p className="mt-2 text-xs text-red-600">{fieldErrors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 overflow-hidden group"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
