// import ClientTest from "@/components/ClientTest";
// export default function Home() {
//   return (
//     <main className="min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">Three.js Test</h1>
//       <ClientTest />
//     </main>
//   );
// }
// src/app/page.tsx
import WorkdeskModel from '@/components/WorkdeskModel';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <WorkdeskModel />
    </main>
  );
}
