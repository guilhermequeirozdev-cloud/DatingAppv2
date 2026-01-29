import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`btn-primary ${className}`} {...props} />;
}
