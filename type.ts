import {RegistrationStatus, Volunteer, VolunteerRegistration, VolunteerSession } from "@/generated/prisma";


  export type VolunteerWithTutoringCount = Volunteer & {
    tutoringCount: number;
  };

export type RegistrationWithSession = VolunteerRegistration & {
  session:VolunteerSession
}

export interface VolunteerWithRegistration {
  id: number;
  clerkUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  registrations: RegistrationWithSession[];
  tutoringCount: number;
}

export interface SessionWithLiders {
  id: number;
  title: string;
  date: string; // ou Date si tu les convertis
  description: string;
  location: string;
  capacity: number;
  type: "TUTORING" | "OTHER";
  createdAt: string; // ou Date
  liders: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }[];
}

export interface RegisteredVolunteer {
  registrationId: number;
  volunteerId: number;
  clerkUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  status: RegistrationStatus;
}


export interface SessionWithRegistrations {
  session: VolunteerSession;
  registeredVolunteers: RegisteredVolunteer[];
  userStatus: {
    isUserRegistered: boolean;
    isSessionInFuture24h: boolean;
    isVolunteerActive: boolean;
  };
}





  export type SortBy = "firstName" | "lastName" | "email" | "tutoringCount" | "createdAt" | "updatedAt"; 
