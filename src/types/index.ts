export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'tool' | 'soft';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  duration: string;
  role: string;
  category: 'web' | 'mobile' | 'desktop' | 'other';
  type: 'work' | 'portfolio'; // 本業 or 個人開発
  demoUrl?: string;
  githubUrl?: string;
  screenshots: string[];
  challenge: string;
  solution: string;
  learnings: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Profile {
  name: string;
  title: string;
  introduction: string;
  skills: Skill[];
  projects: Project[];
  contact: ContactInfo;
  about: {
    description: string;
    workHistory: {
      company: string;
      position: string;
      period: string;
      description: string;
    }[];
    education: {
      school: string;
      period: string;
      degree: string;
      description: string;
    }[];
    achievements: {
      title: string;
      year: string;
      description: string;
    }[];
  };
}
