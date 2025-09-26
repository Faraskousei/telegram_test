'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music, Search } from 'lucide-react'
import toast from 'react-hot-toast'

interface MusicPlayerProps {
  className?: string
}

export default function MusicPlayer({ className = '' }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [currentTrack, setCurrentTrack] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Sample music tracks (replace with real music sources)
  const sampleTracks = [
    { name: 'Lofi Hip Hop', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
    { name: 'Chill Music', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
    { name: 'Jazz Music', url: 'https://www.youtube.com/watch?v=Dx5qFachd3A' },
    { name: 'Classical', url: 'https://www.youtube.com/watch?v=9E6b3swbnWg' }
  ]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.muted = false
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.muted = true
      setIsMuted(true)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration
    
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    const audio = audioRef.current
    
    if (audio) {
      audio.volume = newVolume
      setVolume(newVolume)
      if (newVolume === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
      }
    }
  }

  const playTrack = (track: { name: string; url: string }) => {
    setCurrentTrack(track.name)
    toast.success(`Now playing: ${track.name}`)
    // In a real implementation, you would load the actual audio source
    // For now, we'll just show the track name
  }

  const searchMusic = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query')
      return
    }
    
    try {
      toast.loading(`Searching for: ${searchQuery}...`)
      
      const response = await fetch(`/api/music/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.success && data.data.results.length > 0) {
        setSearchResults(data.data.results)
        setShowResults(true)
        toast.success(`Found ${data.data.results.length} results`)
      } else {
        toast.error('No music found')
        setSearchResults([])
        setShowResults(false)
      }
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Error searching music')
    }
  }

  const playSearchResult = async (track: any) => {
    setCurrentTrack(track.title)
    setShowResults(false)
    
    // Fetch duration if not already loaded
    if (track.duration === 'Loading...') {
      try {
        const durationResponse = await fetch(`/api/music/duration?videoId=${track.id}`)
        const durationData = await durationResponse.json()
        
        if (durationData.success) {
          track.duration = durationData.data.duration
        }
      } catch (error) {
        console.error('Error fetching duration:', error)
      }
    }
    
    toast.success(`Now playing: ${track.title}`)
    // In a real implementation, you would load the actual audio source
    // For now, we'll just show the track name
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={`bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-4 ${className}`}>
      <audio ref={audioRef} preload="metadata" />
      
      {/* Search Bar */}
      {showSearch && (
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for music..."
              className="flex-1 input-field text-sm"
              onKeyPress={(e) => e.key === 'Enter' && searchMusic()}
            />
            <button
              onClick={searchMusic}
              className="btn-primary text-sm px-3 py-2"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Current Track */}
      {currentTrack && (
        <div className="mb-3 text-center">
          <p className="text-sm text-gray-600">
            <Music className="h-4 w-4 inline mr-1" />
            {currentTrack}
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div
          ref={progressRef}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-200"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Search Results:</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {searchResults.map((track, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                onClick={() => playSearchResult(track)}
              >
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{track.title}</p>
                  <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                  <p className="text-xs text-gray-400">{track.duration}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <Play className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Tracks */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">Sample Tracks:</p>
        <div className="grid grid-cols-2 gap-2">
          {sampleTracks.map((track, index) => (
            <button
              key={index}
              onClick={() => playTrack(track)}
              className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors text-left"
            >
              {track.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
