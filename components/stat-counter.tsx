interface StatCounterProps {
  number: number
  label: string
}

export default function StatCounter({ number, label }: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-1">{number}</div>
      <div className="text-sm">{label}</div>
    </div>
  )
}

