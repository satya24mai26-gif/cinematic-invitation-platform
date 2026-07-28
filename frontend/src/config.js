// If running locally (npm run dev), use your .env variable.
// If running on Vercel, use an empty string "" to trigger the vercel.json proxy.
export const API_URL = import.meta.env.DEV 
  ? import.meta.env.VITE_API_URL 
  : "";
