import React from 'react'

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 ${props.className || ''}`}
    >
      {children}
    </button>
  )
}

export { Button } 