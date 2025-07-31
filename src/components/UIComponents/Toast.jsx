import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { addToastInfo } from "../../store/slices/toastSlice";
import { useDispatch } from "react-redux";

const Toast = ({ message, position, colorInfo }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                dispatch(addToastInfo({colorInfo: '', message: '', position: ''}))
            }, 4500);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [message, dispatch]);

    return (
        <AnimatePresence>
            {visible && message && (
                <motion.div
                    key={message}
                    initial={{
                        opacity: 0,
                        y: -40,
                        scale: 0.8,
                        filter: "blur(8px)",
                        rotate: -8,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        rotate: 0,
                        transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            duration: 0.7,
                            delay: 0.3
                        },
                    }}
                    exit={{
                        opacity: 0,
                        y: 40,
                        scale: 0.8,
                        filter: "blur(8px)",
                        rotate: 8,
                        transition: {
                            duration: 0.4,
                            ease: "easeIn",
                        },
                    }}
                    // whileHover={{
                    //     scale: 1.04,
                    //     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                    //     transition: { duration: 0.2 },
                    // }}
                    className={`absolute z-50 ${toastStyle[colorInfo] ?? ''} ${toastPosition[position] ?? toastPosition.TOP_LEFT} p-2.5 rounded-xl shadow-2xl font-semibold flex items-center gap-3 backdrop-blur-md`}
                    role="alert"
                >
                    <motion.span
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.45 }}
                        className="inline-block"
                    >
                        {toastIcon[colorInfo] ?? toastIcon.DEFAULT}
                    </motion.span>
                    <span className="text-base">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const toastIcon = {
    SAVE: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#32D657" opacity="0.15"/>
            <path d="M7 13l3 3 7-7" stroke="#32D657" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    DELETE: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#DD524C" opacity="0.15"/>
            <path d="M8 8l8 8M16 8l-8 8" stroke="#DD524C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    UPDATE: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#3662E3" opacity="0.15"/>
            <path d="M12 8v4l3 3" stroke="#3662E3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12A9 9 0 1 1 12 3" stroke="#3662E3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    ERROR: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#DD524C" opacity="0.15"/>
            <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    DEFAULT: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#A0AEC0" opacity="0.15"/>
            <circle cx="12" cy="12" r="6" fill="#A0AEC0"/>
        </svg>
    ),
};

const toastStyle = {
    SAVE: 'bg-white border-2 border-taskCompBtnCol text-taskCompBtnCol',
    DELETE: 'bg-white border-2 border-taskWontDoBtnCol text-taskWontDoBtnCol',
    UPDATE: 'bg-white border-2 border-highlightCol text-highlightCol',
    ERROR: 'border-2 border-taskWontDoBtnCol bg-taskWontDoBtnCol text-white',
};

const toastPosition = {
    TOP_LEFT: 'top-5 left-5',
    TOP_RIGHT: 'top-5 right-5',
    BOTTOM_LEFT: 'bottom-5 left-5',
    BOTTOM_RIGHT: 'bottom-5 right-5',
};

export default Toast;