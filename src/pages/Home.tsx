import react from 'react';

export function timesTwo(num: number) {
  return num * 2;
}

export const MyComponent: react.FC = () => {
  const title = "Hello World";
  return (
    <div>
      <p>{title}</p>
    </div>
  )
}