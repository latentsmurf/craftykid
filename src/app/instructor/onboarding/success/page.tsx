import { PageBuilder } from "@/lib/page-builder/renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle,
  Clock,
  Mail,
  FileText,
  Users,
  Calendar,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function OnboardingSuccessPage() {
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
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Welcome to Crafty Kid!
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 mb-2">
              Your onboarding has been submitted successfully
            </p>
            <p className="text-muted-foreground">
              We're excited to have you join our community of creative instructors
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  Background Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    In Progress
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  We've initiated your background check with our trusted partner. 
                  This typically takes 2-3 business days to complete.
                </p>
                <div className="text-xs text-gray-500">
                  <p>• Identity verification</p>
                  <p>• Criminal background check</p>
                  <p>• Professional references</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  Profile Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Under Review
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Our team is reviewing your profile, portfolio, and credentials to ensure 
                  you meet our quality standards.
                </p>
                <div className="text-xs text-gray-500">
                  <p>• Bio and experience verification</p>
                  <p>• Portfolio quality assessment</p>
                  <p>• Craft expertise validation</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full flex-shrink-0">
                    <span className="text-sm font-semibold text-purple-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Verification Complete</h3>
                    <p className="text-sm text-gray-600">
                      Once your background check and profile review are complete, we'll send you an email 
                      confirmation and activate your instructor account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full flex-shrink-0">
                    <span className="text-sm font-semibold text-purple-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Create Your First Class</h3>
                    <p className="text-sm text-gray-600">
                      Access your instructor dashboard to create and schedule your first class. 
                      Our team will help you get started with best practices and tips.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full flex-shrink-0">
                    <span className="text-sm font-semibold text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Start Teaching</h3>
                    <p className="text-sm text-gray-600">
                      Once your classes are live, families can discover and book them. 
                      You'll receive notifications and manage everything through your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Resources for New Instructors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/instructor-resources" className="group">
                  <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-purple-600">
                        Teaching Guide
                      </h4>
                      <p className="text-sm text-gray-600">
                        Best practices for family classes
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Link>

                <Link href="/instructor-faq" className="group">
                  <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-purple-600">
                        Instructor FAQ
                      </h4>
                      <p className="text-sm text-gray-600">
                        Common questions answered
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Link>

                <Link href="/success-stories" className="group">
                  <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-purple-600">
                        Success Stories
                      </h4>
                      <p className="text-sm text-gray-600">
                        Learn from other instructors
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Link>

                <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Support Team</h4>
                    <p className="text-sm text-gray-600">
                      instructors@craftykid.com
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="text-center space-y-4">
            <div className="space-x-4">
              <Button asChild>
                <Link href="/dashboard/instructor">
                  Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/instructor-resources">
                  View Resources
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              We'll email you updates on your verification status. 
              In the meantime, explore our resources to prepare for teaching!
            </p>
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
