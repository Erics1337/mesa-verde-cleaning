'use client'

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in">
      <div className="w-6 h-10 border-2 border-white rounded-full p-1">
        <div className="w-1 h-2 bg-white rounded-full mx-auto animate-bounce" />
      </div>
    </div>
  )
}
