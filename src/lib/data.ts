import { Profile } from '../types';

export const profileData: Profile = {
  name: '檜皮 三四朗',
  title: 'フロントエンド開発者',
  introduction: 'ユーザー体験を重視したWebアプリケーション開発に従事。React、TypeScriptを中心としたモダンな技術スタックで、美しく使いやすいインターフェースの構築を専門としています。',
  skills: [
    // フロントエンド
    { name: 'React', level: 5, category: 'frontend' },
    { name: 'TypeScript', level: 4, category: 'frontend' },
    { name: 'JavaScript', level: 5, category: 'frontend' },
    { name: 'Next.js', level: 4, category: 'frontend' },
    
    // バックエンド
    { name: 'NestJS', level: 3, category: 'backend' },
    
    // データベース
    { name: 'PostgreSQL', level: 3, category: 'database' },
    { name: 'MySQL', level: 3, category: 'database' },
    
    // ツール
    { name: 'Git', level: 4, category: 'tool' },
    { name: 'GitHub', level: 4, category: 'tool' },
    { name: 'Playwright', level: 3, category: 'tool' },
  ],
  projects: [
    {
      id: '1',
      title: 'データポータルサイト開発',
      description: 'React + TypeScriptで構築したモダンなECサイト。レスポンシブデザインとユーザビリティを重視。',
      thumbnail: '/images/project1.jpg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      duration: '9ヶ月',
      role: 'フロントエンド開発・UI/UX設計',
      category: 'web',
      type: 'work',
      demoUrl: '',
      githubUrl: '',
      screenshots: ['/images/project1-1.jpg', '/images/project1-2.jpg'],
      challenge: '複雑な商品検索機能とカート機能の実装',
      solution: 'カスタムフックとコンテキストAPIを活用した状態管理',
      learnings: ['状態管理の最適化', 'パフォーマンス改善', 'ユーザビリティ向上']
    },
    {
      id: '2',
      title: 'アレルギー管理システム開発',
      description: 'React + TypeScriptで構築したタスク管理アプリケーション。リアルタイム更新機能付き。',
      thumbnail: '/images/project2.jpg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      duration: '24ヶ月',
      role: 'フルスタック開発',
      category: 'web',
      type: 'work',
      demoUrl: '',
      githubUrl: '',
      screenshots: ['/images/project2-1.jpg', '/images/project2-2.jpg'],
      challenge: 'リアルタイム更新機能の実装',
      solution: 'WebSocketとReact Hooksを組み合わせた実装',
      learnings: ['リアルタイム機能の実装', 'データベース設計', 'API設計']
    },
    {
      id: '3',
      title: 'Kikara HP制作',
      description: 'このサイト自体。React + Tailwind CSSで構築した静的サイト。',
      thumbnail: '/images/project3.jpg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      duration: '1ヶ月',
      role: 'フロントエンド開発・デザイン',
      category: 'web',
      type: 'portfolio',
      demoUrl: 'https://weather-app-demo.com',
      githubUrl: 'https://github.com/username/portfolio',
      screenshots: ['/images/project3-1.jpg', '/images/project3-2.jpg'],
      challenge: '美しいアニメーションとレスポンシブデザインの実現',
      solution: 'Tailwind CSSとCSSアニメーションの組み合わせ',
      learnings: ['アニメーション実装', 'SEO最適化', 'パフォーマンス改善']
    },
    {
      id: '4',
      title: 'CMS「Tiny Post」開発',
      description: '個人開発で作成した天気予報アプリ。OpenWeatherMap APIを使用。',
      thumbnail: '/images/project4.jpg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeatherMap API'],
      duration: '2週間',
      role: '個人開発',
      category: 'web',
      type: 'portfolio',
      demoUrl: 'https://weather-app-demo.com',
      githubUrl: 'https://github.com/username/portfolio',
      screenshots: ['/images/project4-1.jpg', '/images/project4-2.jpg'],
      challenge: 'API連携とレスポンシブデザインの実装',
      solution: 'カスタムフックとエラーハンドリングの実装',
      learnings: ['API設計', 'エラーハンドリング', 'レスポンシブデザイン']
    },
    {
      id: '5',
      title: '貯金管理「Shiftme」開発',
      description: '個人開発で作成した天気予報アプリ。OpenWeatherMap APIを使用。',
      thumbnail: '/images/project4.jpg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeatherMap API'],
      duration: '2週間',
      role: '個人開発',
      category: 'web',
      type: 'portfolio',
      demoUrl: 'https://weather-app-demo.com',
      githubUrl: 'https://github.com/username/portfolio',
      screenshots: ['/images/project4-1.jpg', '/images/project4-2.jpg'],
      challenge: 'API連携とレスポンシブデザインの実装',
      solution: 'カスタムフックとエラーハンドリングの実装',
      learnings: ['API設計', 'エラーハンドリング', 'レスポンシブデザイン']
    },
  ],
  contact: {
    email: 'sannsi4444@gmail.com',
    phone: '070-5416-3460',
    github: 'https://github.com/sanpicule',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/SanpiTech240'
  },
  about: {
    background: '大学で情報工学を専攻し、Web開発に興味を持ちました。卒業後はスタートアップでフロントエンド開発者として働き、現在はフリーランスとして活動しています。',
    experience: '3年間のWeb開発経験があり、ECサイト、SaaS、モバイルアプリなど様々なプロジェクトに携わってきました。',
    education: '○○大学 工学部 情報工学科 卒業',
    values: 'ユーザー第一主義で、技術的な美しさと実用性のバランスを重視します。常に新しい技術を学び、より良いユーザー体験を提供することを心がけています。',
    hobbies: ['読書', 'プログラミング', '旅行', '写真撮影'],
    workHistory: [
      {
        company: '株式会社Gizumo',
        position: 'エンジニア',
        period: '2022年8月 - 現在',
        description: 'フロントエンド開発。React、TypeScriptを使用したモダンな開発を実践。'
      },
      {
        company: '株式会社J:COM',
        position: '営業',
        period: '2020年4月 - 2022年7月',
        description: '新規開拓営業。'
      }
    ]
  }
};
