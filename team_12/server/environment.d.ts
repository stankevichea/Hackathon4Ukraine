declare type Environment = {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  DATABASE_URL: string;
  MAPBOX_KEY: string;
};

declare module 'environment' {
  const value: Environment;
  export default value;
}
