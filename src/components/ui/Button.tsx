import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'navy' | 'green' | 'red' | 'outline' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
  children: React.ReactNode
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-blue-700 hover:bg-blue-900 text-white shadow-[0_4px_20px_rgba(21,101,192,0.35)] hover:shadow-[0_4px_28px_rgba(21,101,192,0.5)]',
  navy:    'bg-[#0A1628] hover:bg-[#0F2044] text-white shadow-[0_4px_16px_rgba(10,22,40,0.3)]',
  green:   'bg-[#7CB342] hover:bg-[#558B2F] text-white shadow-[0_4px_20px_rgba(124,179,66,0.35)] hover:shadow-[0_4px_28px_rgba(124,179,66,0.5)]',
  red:     'bg-[#C62828] hover:bg-[#B71C1C] text-white shadow-[0_4px_16px_rgba(198,40,40,0.3)]',
  outline: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50 bg-transparent',
  ghost:   'text-gray-600 hover:text-navy hover:bg-gray-100 bg-transparent',
  white:   'bg-white text-navy hover:bg-gray-50 shadow-md',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      children,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        className={clsx(
          'btn-shine relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          VARIANTS[variant],
          SIZES[size],
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-60 pointer-events-none',
          className,
        )}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        {...(props as any)}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 size={size === 'sm' ? 14 : 16} />
          </motion.div>
        ) : (
          icon
        )}
        <span>{children}</span>
        {!loading && iconRight}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
export default Button