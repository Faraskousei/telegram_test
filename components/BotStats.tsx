import { LucideIcon } from 'lucide-react'

interface BotStatsProps {
  icon: LucideIcon
  title: string
  value: string
  change: string
  color: string
}

export default function BotStats({ icon: Icon, title, value, change, color }: BotStatsProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-md ${color.replace('text-', 'bg-').replace('-500', '-600')}`}>
          <Icon className={`h-5 w-5 text-white`} />
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <span className="text-sm font-medium text-green-600">{change}</span>
        <span className="text-sm text-gray-500 ml-2">vs last week</span>
      </div>
    </div>
  )
}
