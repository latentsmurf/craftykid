"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { PageBuilder } from "@/lib/page-builder/renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle, 
  Circle, 
  User, 
  Briefcase, 
  Camera, 
  Shield,
  FileText,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Plus
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

export default function InstructorOnboardingPage() {
  const { user, isLoading } = useClerkAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Professional Info
    bio: "",
    crafts: [] as string[],
    experience: "",
    teachingExperience: "",
    certifications: [] as string[],
    
    // Portfolio
    portfolioImages: [] as string[],
    portfolioDescription: "",
    
    // Background Check
    backgroundCheckConsent: false,
    
    // Terms
    termsAccepted: false,
    marketingConsent: false
  })

  const [availableCrafts] = useState([
    "Pottery & Ceramics", "Painting & Drawing", "Jewelry Making", 
    "Woodworking", "Textile Arts", "Paper Crafts", "Sculpture",
    "Metalworking", "Glass Blowing", "Leather Working", "Embroidery",
    "Knitting & Crocheting", "Candle Making", "Soap Making"
  ])

  const steps: OnboardingStep[] = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Tell us about yourself",
      icon: <User className="h-5 w-5" />,
      completed: false
    },
    {
      id: "professional",
      title: "Professional Background",
      description: "Your craft expertise and experience",
      icon: <Briefcase className="h-5 w-5" />,
      completed: false
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Showcase your work",
      icon: <Camera className="h-5 w-5" />,
      completed: false
    },
    {
      id: "verification",
      title: "Verification",
      description: "Background check and verification",
      icon: <Shield className="h-5 w-5" />,
      completed: false
    },
    {
      id: "terms",
      title: "Terms & Agreements",
      description: "Review and accept our terms",
      icon: <FileText className="h-5 w-5" />,
      completed: false
    }
  ]

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "INSTRUCTOR")) {
      router.push("/auth/sign-up")
    }
  }, [user, isLoading, router])

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addCraft = (craft: string) => {
    if (!formData.crafts.includes(craft)) {
      handleInputChange("crafts", [...formData.crafts, craft])
    }
  }

  const removeCraft = (craft: string) => {
    handleInputChange("crafts", formData.crafts.filter(c => c !== craft))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/instructor/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/instructor/onboarding/success')
      } else {
        alert('Failed to submit onboarding. Please try again.')
      }
    } catch (error) {
      console.error('Onboarding submission error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Personal
        return formData.firstName && formData.lastName && formData.phone && formData.address
      case 1: // Professional
        return formData.bio && formData.crafts.length > 0 && formData.experience
      case 2: // Portfolio
        return formData.portfolioDescription
      case 3: // Verification
        return formData.backgroundCheckConsent
      case 4: // Terms
        return formData.termsAccepted
      default:
        return false
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <>
      <PageBuilder 
        blocks={[
          {
            type: "NavBar",
            props: { id: "navbar" }
          }
        ]}
      />

      <main className="min-h-screen bg-background py-8 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Welcome to Crafty Kid!
            </h1>
            <p className="text-muted-foreground">
              Let's get you set up to start teaching amazing classes
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-0 flex-1 ${
                  index < steps.length - 1 ? 'mr-4' : ''
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 ${
                    index === currentStep
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : index < currentStep
                      ? 'border-green-600 bg-green-600 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-medium ${
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 0: Personal Information */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Santa Barbara"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="93101"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Professional Background */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="bio">Tell us about yourself *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Describe your background, passion for crafts, and what makes you a great instructor..."
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be displayed on your instructor profile
                    </p>
                  </div>

                  <div>
                    <Label>Your Craft Specialties *</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Select all crafts you're qualified to teach
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      {availableCrafts.map((craft) => (
                        <button
                          key={craft}
                          type="button"
                          onClick={() => 
                            formData.crafts.includes(craft) 
                              ? removeCraft(craft)
                              : addCraft(craft)
                          }
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            formData.crafts.includes(craft)
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {craft}
                        </button>
                      ))}
                    </div>
                    {formData.crafts.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.crafts.map((craft) => (
                          <Badge key={craft} variant="secondary" className="flex items-center gap-1">
                            {craft}
                            <button
                              onClick={() => removeCraft(craft)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="experience">Years of Craft Experience *</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="e.g., 5 years"
                    />
                  </div>

                  <div>
                    <Label htmlFor="teachingExperience">Teaching Experience</Label>
                    <Textarea
                      id="teachingExperience"
                      value={formData.teachingExperience}
                      onChange={(e) => handleInputChange("teachingExperience", e.target.value)}
                      placeholder="Describe any previous teaching or instructional experience..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="certifications">Certifications or Awards</Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications.join("\n")}
                      onChange={(e) => handleInputChange("certifications", e.target.value.split("\n").filter(Boolean))}
                      placeholder="List any relevant certifications, awards, or achievements (one per line)"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Portfolio */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label>Portfolio Images</Label>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload photos of your work to showcase your skills
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                      <Button variant="outline" className="mt-4">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="portfolioDescription">Describe Your Work *</Label>
                    <Textarea
                      id="portfolioDescription"
                      value={formData.portfolioDescription}
                      onChange={(e) => handleInputChange("portfolioDescription", e.target.value)}
                      placeholder="Tell us about your artistic style, favorite projects, or what inspires your work..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Background Check Required</h3>
                    <p className="text-blue-800 text-sm mb-4">
                      To ensure the safety of our community, all instructors must complete a background check. 
                      This process is secure, confidential, and typically takes 2-3 business days.
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Identity verification</li>
                      <li>• Criminal background check</li>
                      <li>• Sex offender registry check</li>
                      <li>• Professional reference verification</li>
                    </ul>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="backgroundCheck"
                      checked={formData.backgroundCheckConsent}
                      onCheckedChange={(checked) => 
                        handleInputChange("backgroundCheckConsent", checked)
                      }
                    />
                    <div className="text-sm">
                      <Label htmlFor="backgroundCheck" className="font-medium">
                        I consent to a background check *
                      </Label>
                      <p className="text-gray-600 mt-1">
                        I authorize Crafty Kid and its third-party partners to conduct a comprehensive 
                        background check for the purpose of instructor verification.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Terms */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Review Our Terms</h3>
                    <div className="space-y-4 text-sm text-gray-700">
                      <div>
                        <h4 className="font-medium">Instructor Agreement</h4>
                        <p>You agree to provide high-quality, safe, and engaging classes for families.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Revenue Sharing</h4>
                        <p>Instructors keep 80% of class revenue. Crafty Kid retains 20% for platform services.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Cancellation Policy</h4>
                        <p>Classes must be cancelled at least 24 hours in advance except for emergencies.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => 
                          handleInputChange("termsAccepted", checked)
                        }
                      />
                      <div className="text-sm">
                        <Label htmlFor="terms" className="font-medium">
                          I accept the Terms of Service and Instructor Agreement *
                        </Label>
                        <p className="text-gray-600 mt-1">
                          By checking this box, you agree to our{" "}
                          <a href="/terms" className="text-purple-600 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="/instructor-agreement" className="text-purple-600 hover:underline">
                            Instructor Agreement
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="marketing"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => 
                          handleInputChange("marketingConsent", checked)
                        }
                      />
                      <div className="text-sm">
                        <Label htmlFor="marketing" className="font-medium">
                          I'd like to receive marketing emails
                        </Label>
                        <p className="text-gray-600 mt-1">
                          Get tips, resources, and updates to help you succeed as an instructor
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Complete Onboarding
                <CheckCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <PageBuilder 
        blocks={[
          {
            type: "Footer",
            props: { id: "footer" }
          }
        ]}
      />
    </>
  )
}