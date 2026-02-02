'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Send } from 'lucide-react';
import { init, send } from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useIsHoverable } from '../hooks/useIsHoverable';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup.object({
  name: yup.string().required('お名前は必須です'),
  email: yup.string().email('有効なメールアドレスを入力してください').required('メールアドレスは必須です'),
  subject: yup.string().required('件名は必須です'),
  message: yup.string().required('メッセージは必須です').min(10, 'メッセージは10文字以上で入力してください')
}).required();

const ContactForm = () => {
  const isHoverable = useIsHoverable();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: FormData) => {
    const userID = import.meta.env.VITE_EMAIL_API_KEY;
    const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;

    if (userID && serviceID && templateID) {
      init(userID);
      const params = {
        name: data.name,
        email: data.email,
        message: data.message,
        subject: data.subject
      };

      try {
        await send(serviceID, templateID, params);
        alert('お問い合わせありがとうございます。メッセージは正常に送信されました。');
        reset();
      } catch (error) {
        alert('メッセージの送信に失敗しました。後ほどもう一度お試しください。');
      }
    } else {
      alert('EmailJSの環境変数が設定されていません。');
    }
  };

  const buttonHover = isHoverable ? { scale: 1.05, boxShadow: "0px 0px 20px rgba(56, 189, 248, 0.7)" } : {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-accent mb-1">
          お名前 *
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-1 py-2 bg-transparent border-b text-light focus:outline-none transition-colors duration-300 ${
            errors.name ? 'border-red-400 focus:border-red-400' : 'border-accent/30 focus:border-primary'
          }`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-accent mb-1">
          メールアドレス *
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-1 py-2 bg-transparent border-b text-light focus:outline-none transition-colors duration-300 ${
            errors.email ? 'border-red-400 focus:border-red-400' : 'border-accent/30 focus:border-primary'
          }`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-accent mb-1">
          件名 *
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className={`w-full px-1 py-2 bg-transparent border-b text-light focus:outline-none transition-colors duration-300 ${
            errors.subject ? 'border-red-400 focus:border-red-400' : 'border-accent/30 focus:border-primary'
          }`}
        />
        {errors.subject && (
          <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-accent mb-1">
          メッセージ *
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className={`w-full px-1 py-2 bg-transparent border-b text-light focus:outline-none resize-none transition-colors duration-300 ${
            errors.message ? 'border-red-400 focus:border-red-400' : 'border-accent/30 focus:border-primary'
          }`}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary py-3 text-dark font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rounded-full"
        whileHover={buttonHover}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark mr-3"></div>
            送信中...
          </>
        ) : (
          <>
            <Send size={16} className="mr-2" />
            送信する
          </>
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm;
