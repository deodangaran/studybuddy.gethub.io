import React from "react"
import { Link } from "react-router-dom"

export default function Back({ to }) {
  return (
    <div className="flex">
      <Link
      to={to}
      className="flex align-center gap-2 hover:text-red-700 focus:text-red-700 transition-all"
    >
      <span className="text-sm font-semibold mt-2 pt-1 mb-0">Already have an Account?</span>
    </Link>
    </div>
  )
}
