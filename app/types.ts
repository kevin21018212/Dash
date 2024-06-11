enum TaskSize {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

enum TaskType {
  UIDesign = 'UI Design',
  CodeRefactor = 'Code Refactor',
  Animation = 'Animation',
  PageLayout = 'Page Layout',
  Styling = 'Styling',
  Componet = 'Component',
  APIRoute = 'API Route',
  Database = 'Database ',
  Testing = 'Testing',
  Deployment = 'Deployment',
}

// types.ts
export interface Task {
  task_id: number;
  title: string;
  description: string;
  type: string;
  size: string;
  user_id: number;
  feature_id: number;
}

export interface Feature {
  feature_id: number;
  title: string;
  description: string;
  project_id: number;
  user_id: number;
  tasks: Task[];
}

export interface Project {
  project_id: number;
  title: string;
  description: string;
  image_url: string;
  link: string | null;
  user_id: number;
  features: Feature[];
}
