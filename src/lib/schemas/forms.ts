import { z } from "zod"

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["PARENT", "INSTRUCTOR"]),
  marketingOptIn: z.boolean().default(false),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Search schema
export const searchSchema = z.object({
  location: z.string().optional(),
  ageMin: z.number().min(0).max(18).optional(),
  ageMax: z.number().min(0).max(18).optional(),
  categoryId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().optional(),
  instructorId: z.string().optional(),
  venueId: z.string().optional(),
})

// Booking schema
export const createBookingSchema = z.object({
  scheduleId: z.string(),
  childIds: z.array(z.string()).min(1, "Please select at least one child"),
})

// Child schema
export const childSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthdate: z.string(), // Will be converted to Date
  notes: z.string().optional(),
})

// Review schema
export const reviewSchema = z.object({
  targetType: z.enum(["Class", "Instructor", "Venue"]),
  targetId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Title must be at least 3 characters"),
  body: z.string().min(10, "Review must be at least 10 characters"),
})

// Instructor onboarding schema
export const instructorOnboardingSchema = z.object({
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  crafts: z.array(z.string()).min(1, "Please select at least one craft"),
  experience: z.string().min(20, "Please describe your experience"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  backgroundCheckConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to a background check",
  }),
})

// Class creation schema
export const createClassSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  categoryId: z.string(),
  ageMin: z.number().min(0).max(18),
  ageMax: z.number().min(0).max(18),
  description: z.string().min(50, "Description must be at least 50 characters"),
  venueId: z.string(),
  capacity: z.number().min(1).max(50),
  priceCents: z.number().min(0),
  materialsProvided: z.boolean(),
  images: z.array(z.string().url()).optional(),
})

// Class schedule schema
export const createScheduleSchema = z.object({
  classId: z.string(),
  startsAt: z.string(), // Will be converted to Date
  duration: z.number().min(30).max(360), // In minutes
  recurrenceRule: z.string().optional(),
  seatsTotal: z.number().min(1),
})

// Venue creation schema
export const createVenueSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string(),
  capacity: z.number().min(1),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }).optional(),
})

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

// Type exports
export type SignInData = z.infer<typeof signInSchema>
export type SignUpData = z.infer<typeof signUpSchema>
export type SearchData = z.infer<typeof searchSchema>
export type CreateBookingData = z.infer<typeof createBookingSchema>
export type ChildData = z.infer<typeof childSchema>
export type ReviewData = z.infer<typeof reviewSchema>
export type InstructorOnboardingData = z.infer<typeof instructorOnboardingSchema>
export type CreateClassData = z.infer<typeof createClassSchema>
export type CreateScheduleData = z.infer<typeof createScheduleSchema>
export type CreateVenueData = z.infer<typeof createVenueSchema>
export type ContactData = z.infer<typeof contactSchema>
