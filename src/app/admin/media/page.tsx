"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Image as ImageIcon,
  FileVideo,
  FileAudio,
  File,
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  Download,
  Trash2,
  Edit,
  Copy,
  Eye,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface MediaFile {
  id: string
  name: string
  type: "image" | "video" | "audio" | "document"
  url: string
  thumbnailUrl?: string
  size: number
  uploadedAt: string
  uploadedBy: string
  dimensions?: { width: number; height: number }
  duration?: number
  alt?: string
  tags?: string[]
}

// Mock media files
const mockMediaFiles: MediaFile[] = [
  {
    id: "1",
    name: "hero-background.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
    size: 1245632,
    uploadedAt: "2024-01-20T10:30:00Z",
    uploadedBy: "Admin",
    dimensions: { width: 1920, height: 1080 },
    alt: "Craft workshop hero image",
    tags: ["hero", "workshop", "pottery"]
  },
  {
    id: "2",
    name: "instructor-sarah.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200",
    size: 842156,
    uploadedAt: "2024-01-19T14:22:00Z",
    uploadedBy: "Admin",
    dimensions: { width: 800, height: 800 },
    alt: "Instructor Sarah profile",
    tags: ["instructor", "profile", "team"]
  },
  {
    id: "3",
    name: "kids-painting-class.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=200",
    size: 956423,
    uploadedAt: "2024-01-18T09:15:00Z",
    uploadedBy: "Marketing",
    dimensions: { width: 1200, height: 800 },
    alt: "Kids painting class in action",
    tags: ["class", "painting", "kids", "activity"]
  },
  {
    id: "4",
    name: "pottery-wheel.mp4",
    type: "video",
    url: "/videos/pottery-wheel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200",
    size: 15628954,
    uploadedAt: "2024-01-17T16:45:00Z",
    uploadedBy: "Admin",
    duration: 45,
    tags: ["pottery", "tutorial", "video"]
  },
]

export default function MediaLibrary() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Drag and drop handling
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const progress = ((i + 1) / files.length) * 100
      setUploadProgress(progress)

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Add file to media library
      const newFile: MediaFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : 
              file.type.startsWith("video/") ? "video" :
              file.type.startsWith("audio/") ? "audio" : "document",
        url: URL.createObjectURL(file),
        size: file.size,
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Admin",
      }

      setMediaFiles(prev => [newFile, ...prev])
    }

    setIsUploading(false)
    setUploadProgress(0)
  }

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || file.type === filterType
    return matchesSearch && matchesType
  })

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground mt-1">
            Manage your images, videos, and other media files
          </p>
        </div>
        <div>
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
          />
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </label>
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Uploading files...</span>
              <span className="text-sm text-muted-foreground">{uploadProgress.toFixed(0)}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    {filterType === "all" ? "All Types" : filterType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterType("all")}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterType("image")}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Images
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("video")}>
                    <FileVideo className="h-4 w-4 mr-2" />
                    Videos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("audio")}>
                    <FileAudio className="h-4 w-4 mr-2" />
                    Audio
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("document")}>
                    <File className="h-4 w-4 mr-2" />
                    Documents
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {selectedFiles.length > 0 && (
            <div className="mt-4 flex items-center justify-between p-3 bg-accent rounded-lg">
              <span className="text-sm font-medium">
                {selectedFiles.length} files selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFiles([])}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-2"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {filteredFiles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No media files found</p>
              </div>
            ) : (
              filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`${
                    viewMode === "grid"
                      ? "border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                      : "flex items-center gap-4 p-3 border rounded-lg hover:bg-accent"
                  } ${selectedFiles.includes(file.id) ? "ring-2 ring-purple-500" : ""}`}
                  onClick={() => {
                    setSelectedFile(file)
                    setIsDetailsOpen(true)
                  }}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                        {file.type === "image" && file.thumbnailUrl && (
                          <img
                            src={file.thumbnailUrl}
                            alt={file.alt || file.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {file.type === "video" && (
                          <div className="flex items-center justify-center h-full">
                            <FileVideo className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        {file.type === "audio" && (
                          <div className="flex items-center justify-center h-full">
                            <FileAudio className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        {file.type === "document" && (
                          <div className="flex items-center justify-center h-full">
                            <File className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={(e) => {
                              e.stopPropagation()
                              toggleFileSelection(file.id)
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={(e) => {
                          e.stopPropagation()
                          toggleFileSelection(file.id)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4"
                      />
                      <div className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                        {file.type === "image" && file.thumbnailUrl ? (
                          <img
                            src={file.thumbnailUrl}
                            alt={file.alt || file.name}
                            className="h-full w-full object-cover rounded"
                          />
                        ) : file.type === "video" ? (
                          <FileVideo className="h-5 w-5 text-muted-foreground" />
                        ) : file.type === "audio" ? (
                          <FileAudio className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <File className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • {formatDate(file.uploadedAt)} • {file.uploadedBy}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          {selectedFile && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedFile.name}</DialogTitle>
                <DialogDescription>
                  Uploaded by {selectedFile.uploadedBy} on {formatDate(selectedFile.uploadedAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {selectedFile.type === "image" && selectedFile.url && (
                  <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.alt || selectedFile.name}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="alt-text">Alt Text</Label>
                    <Input
                      id="alt-text"
                      value={selectedFile.alt || ""}
                      placeholder="Describe this image for accessibility"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="file-url">File URL</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="file-url"
                        value={selectedFile.url}
                        readOnly
                      />
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">File Size</p>
                      <p className="text-sm">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    {selectedFile.dimensions && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Dimensions</p>
                        <p className="text-sm">
                          {selectedFile.dimensions.width} × {selectedFile.dimensions.height}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
