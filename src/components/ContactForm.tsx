'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Send } from 'lucide-react';
import { init, send } from '@emailjs/browser';
import { motion } from 'framer-motion';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const [submitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    const userID = import.meta.env.VITE_EMAIL_API_KEY
    const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID
    const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID

    if (userID && serviceID && templateID) {
      // EmailJSを初期化
      init(userID)

      // EmailJSに渡すパラメータを作成
      const params = {
        name: data.name,
        email: data.email,
        message: data.message
      }

      try {
        // メール送信実行
        await send(serviceID, templateID, params, userID)
        // 送信に成功すればダイアログ表示と、フォーム入力内容をリセットする
        alert('この度はお問い合わせ頂き、ありがとうございます。\nお問い合わせを受け付けました。。')
        reset()
      } catch (error) {
        // 失敗した場合のダイアログ表示
        alert('お問い合わせの受付に失敗しました。\n大変恐れ入りますが、しばらく時間をおいてから再度お試しください。')
      }
    }
  };

  return (
    <div>      
      {submitStatus === 'success' && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 font-light rounded-lg">
          お問い合わせありがとうございます。後日ご連絡いたします。
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 font-light rounded-lg">
          送信に失敗しました。しばらく時間をおいて再度お試しください。
        </div>
      )}

      <motion.form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-light text-primary-700 mb-1">
            お名前 *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`w-full px-4 py-3 border bg-white text-primary-900 font-light focus:outline-none transition-colors duration-300 rounded-lg ${
              errors.name ? 'border-red-300 focus:border-red-500' : 'border-primary-300 focus:border-primary-500'
            }`}
            placeholder="山田 太郎"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 font-light">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-light text-primary-700 mb-1">
            メールアドレス *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full px-4 py-3 border bg-white text-primary-900 font-light focus:outline-none transition-colors duration-300 rounded-lg ${
              errors.email ? 'border-red-300 focus:border-red-500' : 'border-primary-300 focus:border-primary-500'
            }`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-light">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-light text-primary-700 mb-1">
            件名 *
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject')}
            className={`w-full px-4 py-3 border bg-white text-primary-900 font-light focus:outline-none transition-colors duration-300 rounded-lg ${
              errors.subject ? 'border-red-300 focus:border-red-500' : 'border-primary-300 focus:border-primary-500'
            }`}
            placeholder="プロジェクトのご相談"
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-600 font-light">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-light text-primary-700 mb-1">
            メッセージ *
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            className={`w-full px-4 py-3 border bg-white text-primary-900 font-light focus:outline-none resize-none transition-colors duration-300 rounded-lg ${
              errors.message ? 'border-red-300 focus:border-red-500' : 'border-primary-300 focus:border-primary-500'
            }`}
            placeholder="プロジェクトの詳細やご要望をお聞かせください"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600 font-light">{errors.message.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-800 py-4 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rounded-lg"
          whileHover={{ scale: 1.02, backgroundColor: "#374151" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
              送信中...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" />
              送信する
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ContactForm;
