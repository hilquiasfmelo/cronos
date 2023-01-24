import { toast, ToastOptions } from 'react-toastify'

interface ToastProps {
  message: string
  type: 'error' | 'success' | 'info' | 'warn'
}

export function Toast({ message, type }: ToastProps) {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    toastId: '',
  }

  if (type === 'error') {
    return toast.error(message, options)
  }

  if (type === 'success') {
    return toast.success(message, options)
  }

  if (type === 'info') {
    return toast.info(message, options)
  }

  if (type === 'warn') {
    return toast.warn(message, options)
  }
}
