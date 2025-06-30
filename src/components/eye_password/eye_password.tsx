import { Eye, EyeOff } from "lucide-react"

interface EyePasswordProps {
  showPassword: boolean
  setShowPassword: (value: boolean) => void
}

const EyePassword = ({ showPassword, setShowPassword }: EyePasswordProps) => {
  return (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="cursor-pointer absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
      ) : (
        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
      )}
    </button>
  )
}

export default EyePassword
