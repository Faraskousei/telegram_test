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
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-500', '-100')}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-green-600">{change}</span>
        <span className="text-sm text-gray-500 ml-2">vs last week</span>
      </div>
    </div>
  )
}
