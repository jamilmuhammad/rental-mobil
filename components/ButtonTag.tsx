import { ButtonTagProps } from "@types"

const Tag = ({ title }: ButtonTagProps) => {
    return (
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">{title}</span>
    )
}

export default Tag;