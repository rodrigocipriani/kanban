import React from 'react'

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline'

const typographyStyles = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  subtitle1: 'text-lg',
  subtitle2: 'text-base',
  body1: 'leading-7 [&:not(:first-child)]:mt-6',
  body2: 'leading-6 [&:not(:first-child)]:mt-4',
  button: 'font-medium text-primary underline underline-offset-4',
  caption: 'text-sm',
  overline: 'text-xs uppercase tracking-widest',
  // Add more styles as needed
}

interface TypographyProps {
  variant: TypographyVariant
  component?: keyof JSX.IntrinsicElements
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const variantMapping: {
  [key in TypographyVariant]: keyof JSX.IntrinsicElements
} = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
  overline: 'span',
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  component,
  children,
  className,
  style,
  ...props
}) => {
  const Component = component || variantMapping[variant]
  const combinedClassName = `typography ${typographyStyles[variant]} ${
    className || ''
  }`.trim()

  return (
    <Component className={combinedClassName} style={style} {...props}>
      {children}
    </Component>
  )
}

export default Typography
