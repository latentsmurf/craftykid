"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  Eye,
  Undo,
  Redo,
  Plus,
  Trash2,
  Move,
  Settings,
  Image as ImageIcon,
  Type,
  Layout,
  Grid,
  Users,
  Star,
  MessageSquare,
  Calendar,
  ChevronUp,
  ChevronDown,
  Copy,
  MoreVertical,
  Monitor,
  Tablet,
  Smartphone
} from "lucide-react"

// Available block types
const blockTypes = [
  { type: "HeroSearch", label: "Hero with Search", icon: Layout, category: "Heroes" },
  { type: "FeaturedClasses", label: "Featured Classes", icon: Grid, category: "Content" },
  { type: "TeacherSpotlight", label: "Teacher Spotlight", icon: Users, category: "Content" },
  { type: "TrustBadges", label: "Trust Badges", icon: Star, category: "Trust" },
  { type: "Testimonials", label: "Testimonials", icon: MessageSquare, category: "Trust" },
  { type: "ContentSplit", label: "Content Split", icon: Layout, category: "Content" },
  { type: "FAQAccordion", label: "FAQ Accordion", icon: MessageSquare, category: "Info" },
  { type: "BlogTeasers", label: "Blog Teasers", icon: Type, category: "Content" },
  { type: "CTASection", label: "CTA Section", icon: Calendar, category: "Conversion" },
]

interface PageBlock {
  id: string
  type: string
  props: any
}

export default function PageEditor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [pageTitle, setPageTitle] = useState("Home Page")
  const [pageSlug, setPageSlug] = useState("home")
  const [isPublished, setIsPublished] = useState(true)
  const [blocks, setBlocks] = useState<PageBlock[]>([
    {
      id: "1",
      type: "HeroSearch",
      props: {
        title: "Where creativity meets community",
        subtitle: "Find the perfect craft class for you and your little one",
        backgroundImage: "/images/hero-bg.jpg"
      }
    },
    {
      id: "2",
      type: "FeaturedClasses",
      props: {
        title: "Popular Classes This Week",
        subtitle: "Hand-picked experiences for every interest"
      }
    },
    {
      id: "3",
      type: "TrustBadges",
      props: {
        badges: [
          { icon: "shield", title: "Background Checked", description: "All instructors verified" },
          { icon: "star", title: "5-Star Reviews", description: "Trusted by 10,000+ families" },
          { icon: "clock", title: "Flexible Booking", description: "Cancel up to 24h before" },
          { icon: "heart", title: "Satisfaction Guaranteed", description: "Love it or your money back" }
        ]
      }
    }
  ])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const addBlock = (blockType: string) => {
    const newBlock: PageBlock = {
      id: Date.now().toString(),
      type: blockType,
      props: {}
    }
    setBlocks([...blocks, newBlock])
  }

  const removeBlock = (blockId: string) => {
    setBlocks(blocks.filter(b => b.id !== blockId))
  }

  const moveBlock = (blockId: string, direction: "up" | "down") => {
    const index = blocks.findIndex(b => b.id === blockId)
    if (index === -1) return

    const newBlocks = [...blocks]
    if (direction === "up" && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]]
    } else if (direction === "down" && index < blocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]]
    }
    setBlocks(newBlocks)
  }

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find(b => b.id === blockId)
    if (!blockToDuplicate) return

    const newBlock: PageBlock = {
      ...blockToDuplicate,
      id: Date.now().toString()
    }
    
    const index = blocks.findIndex(b => b.id === blockId)
    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, newBlock)
    setBlocks(newBlocks)
  }

  const updateBlockProps = (blockId: string, props: any) => {
    setBlocks(blocks.map(b => 
      b.id === blockId ? { ...b, props: { ...b.props, ...props } } : b
    ))
  }

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "tablet": return "768px"
      case "mobile": return "375px"
      default: return "100%"
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Page Settings & Blocks */}
      <div className="w-80 border-r border-border bg-card overflow-y-auto">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-4">Page Settings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={pageSlug}
                onChange={(e) => setPageSlug(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="published">Published</Label>
              <Switch
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold mb-3">Add Blocks</h3>
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {Object.entries(
                  blockTypes.reduce((acc, block) => {
                    if (!acc[block.category]) acc[block.category] = []
                    acc[block.category].push(block)
                    return acc
                  }, {} as Record<string, typeof blockTypes>)
                ).map(([category, categoryBlocks]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-muted-foreground px-2 py-1">
                      {category}
                    </p>
                    {categoryBlocks.map((block) => (
                      <DropdownMenuItem
                        key={block.type}
                        onClick={() => addBlock(block.type)}
                      >
                        <block.icon className="h-4 w-4 mr-2" />
                        {block.label}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Page Blocks</h3>
            <div className="space-y-2">
              {blocks.map((block, index) => {
                const blockType = blockTypes.find(b => b.type === block.type)
                return (
                  <div
                    key={block.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedBlock === block.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-border hover:bg-accent"
                    }`}
                    onClick={() => setSelectedBlock(block.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {blockType && <blockType.icon className="h-4 w-4" />}
                        <span className="text-sm font-medium">
                          {blockType?.label || block.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveBlock(block.id, "up")
                          }}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveBlock(block.id, "down")
                          }}
                          disabled={index === blocks.length - 1}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => duplicateBlock(block.id)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => removeBlock(block.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Preview & Block Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Redo className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-border mx-2" />
            <div className="flex items-center gap-1 bg-accent rounded-md p-1">
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === "tablet" ? "default" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setPreviewMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto">
          <div className="flex justify-center py-8">
            <div
              className="bg-background shadow-xl transition-all duration-300"
              style={{ width: getPreviewWidth() }}
            >
              {/* Render preview of blocks */}
              <div className="min-h-screen">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`relative group ${
                      selectedBlock === block.id ? "ring-2 ring-purple-500" : ""
                    }`}
                  >
                    <div className="p-8 border-b border-gray-200 dark:border-gray-800">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">{block.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          Block preview will render here
                        </p>
                      </div>
                    </div>
                    {selectedBlock === block.id && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedBlock(block.id)}
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Block Properties */}
      {selectedBlock && (
        <div className="w-80 border-l border-border bg-card overflow-y-auto">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Block Settings</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedBlock(null)}
              >
                <span className="text-xl">&times;</span>
              </Button>
            </div>
          </div>
          <div className="p-4">
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4 mt-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter block title..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    placeholder="Enter block subtitle..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Background Image</Label>
                  <Button variant="outline" className="w-full mt-1">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="style" className="space-y-4 mt-4">
                <div>
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    className="mt-1 h-10"
                  />
                </div>
                <div>
                  <Label>Padding</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Text Alignment</Label>
                  <Select defaultValue="center">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
