import toast, { ToastOptions } from 'react-hot-toast';

interface NotifyProps {
  message: string;
  type?: 'success' | 'error' | 'default';
  options?: ToastOptions;
}

export default function reactNotify({ message, type = 'default', options }: NotifyProps): void {
  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    toast.error(message, options);
  } else {
    toast(message, options);
  }
}
