import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ActiveLink ({ href, children }) {
  const { asPath } = useRouter()

  let className = children.props.className || ''

  if (asPath === href) {
    className = `${className} font-weight-bold`
  } else {
    className = `${className} text-dark`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

export default ActiveLink