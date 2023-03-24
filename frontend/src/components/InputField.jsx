import React from "react"

export default function inputField(props) {
  return (
    <input
      {...props}
      className="form-control rounded-md p-2 w-full shadow-inner bg-white outline-gray-300 max-w-[400px]"
    />
  )
}
