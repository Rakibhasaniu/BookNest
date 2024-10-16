/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const HeartIcon = ({ isLiked }) => (
    <motion.div
        whileTap={{ scale: 1.3 }} // Animate when clicked
    >
        {isLiked ? (
            <FaHeart size={24} className="text-red-500" /> 
        ) : (
            <FaRegHeart size={24} className="text-gray-400" /> 
        )}
    </motion.div>
);
