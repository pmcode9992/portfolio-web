'use client';

import dynamic from 'next/dynamic';

const TestCube = dynamic(() => import('./TestCube'), {
  ssr: false
});

export default function ClientTest() {
  return <TestCube />;
}