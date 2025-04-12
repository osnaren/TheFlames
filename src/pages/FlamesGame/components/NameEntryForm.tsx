import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaFire } from 'react-icons/fa';
import { z } from 'zod';

// Define props interface
interface NameEntryFormProps {
  onSubmit: (name1: string, name2: string) => void;
  animationsEnabled: boolean;
}

// Define Zod schema for name validation
const nameSchema = z
  .string()
  .min(1, 'Name must not be empty')
  .refine((name) => /^[a-zA-Z\s]+$/.test(name), {
    message: 'Name should only contain letters and spaces',
  });

const formSchema = z
  .object({
    name1: nameSchema,
    name2: nameSchema,
  })
  .refine((data) => data.name1.toLowerCase() !== data.name2.toLowerCase(), {
    message: 'Names cannot be identical',
    path: ['name2'],
  });

const NameEntryForm: React.FC<NameEntryFormProps> = ({ onSubmit, animationsEnabled }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [errors, setErrors] = useState<{
    name1?: string[];
    name2?: string[];
    form?: string[];
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name1') {
      setName1(value);
      if (errors.name1) {
        setErrors((prev) => ({ ...prev, name1: undefined }));
      }
    } else if (name === 'name2') {
      setName2(value);
      if (errors.name2) {
        setErrors((prev) => ({ ...prev, name2: undefined }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Validate form data with Zod
      const result = formSchema.safeParse({ name1, name2 });

      if (!result.success) {
        // Format errors for display
        const formattedErrors = result.error.format();
        setErrors({
          name1: formattedErrors.name1?._errors,
          name2: formattedErrors.name2?._errors,
          form: formattedErrors._errors,
        });

        // Show toast for validation errors
        toast.error('Please fix the errors in the form');

        // Animate input borders for invalid fields
        if (formattedErrors.name1?._errors) {
          document.getElementById('name1')?.classList.add('shake-error');
          setTimeout(() => {
            document.getElementById('name1')?.classList.remove('shake-error');
          }, 500);
        }
        if (formattedErrors.name2?._errors) {
          document.getElementById('name2')?.classList.add('shake-error');
          setTimeout(() => {
            document.getElementById('name2')?.classList.remove('shake-error');
          }, 500);
        }

        return;
      }

      // Form is valid, submit names
      if (animationsEnabled) {
        // With animations
        setTimeout(() => {
          onSubmit(name1.trim(), name2.trim());
          setIsSubmitting(false);
        }, 800);
      } else {
        // Without animations
        onSubmit(name1.trim(), name2.trim());
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error validating form:', error);
      toast.error('Something went wrong');
      setIsSubmitting(false);
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationsEnabled ? 0.5 : 0,
        when: 'beforeChildren',
        staggerChildren: animationsEnabled ? 0.2 : 0,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: animationsEnabled ? 0.3 : 0 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animationsEnabled ? 0.3 : 0 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-2xl bg-black/30 p-8 shadow-2xl backdrop-blur-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h1
          className="mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-6xl font-bold text-transparent"
          variants={itemVariants}
        >
          FLAMES
        </motion.h1>
        <motion.p className="mb-8 text-xl text-white/80" variants={itemVariants}>
          Find your relationship destiny!
        </motion.p>

        <motion.form onSubmit={handleSubmit} variants={itemVariants} className="w-full space-y-6">
          <div className="space-y-2">
            <motion.input
              id="name1"
              type="text"
              name="name1"
              value={name1}
              onChange={handleChange}
              placeholder="Who are you? 💁"
              className={`w-full border-2 bg-white/10 px-6 py-4 ${
                errors.name1 ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-white/50 transition-all duration-300 focus:border-orange-500 focus:outline-none`}
              variants={itemVariants}
              disabled={isSubmitting}
            />
            {errors.name1 && <span className="pl-2 text-sm text-red-500">{errors.name1[0]}</span>}
          </div>

          <div className="space-y-2">
            <motion.input
              id="name2"
              type="text"
              name="name2"
              value={name2}
              onChange={handleChange}
              placeholder="Their name? 💘"
              className={`w-full border-2 bg-white/10 px-6 py-4 ${
                errors.name2 ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-white/50 transition-all duration-300 focus:border-orange-500 focus:outline-none`}
              variants={itemVariants}
              disabled={isSubmitting}
            />
            {errors.name2 && <span className="pl-2 text-sm text-red-500">{errors.name2[0]}</span>}
          </div>

          {errors.form && <span className="block text-center text-sm text-red-500">{errors.form[0]}</span>}

          <motion.button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:from-orange-600 hover:to-red-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            disabled={isSubmitting}
          >
            <span>FLAME ON!</span>
            <FaFire className="text-xl" />
          </motion.button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default NameEntryForm;
