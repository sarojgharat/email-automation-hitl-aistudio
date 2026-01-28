
export type Classification =
  | 'booking request'
  | 'booking amendment'
  | 'booking cancellation'
  | 'equipment release request'
  | 'special equipment request'
  | 'equipment substitution request'
  | 'empty container pickup request'
  | 'equipment interchange request'
  | 'manual move request'
  | 'dispute'
  | 'other'
  | 'unclassified';

export interface BookingCreationData {
  type: 'booking request';
  origin: string;
  destination: string;
  fromDate: string;
  toDate: string;
  specialRequests?: string;
}

export interface BookingAmendmentData {
  type: 'booking amendment';
  bookingNumber: string;
  updatedDetails: string;
}

export interface BookingCancellationData {
  type: 'booking cancellation';
  bookingNumber: string;
  cancellationReason: string;
  dateOfChange: string;
}

export interface ManualMoveRequestData {
  type: 'manual move request';
  moveType: string;
  sourceLocation: string;
  destinationLocation: string;
  moveDate: string;
  itemDescription: string;
}

export interface InvoiceDisputeData {
  type: 'dispute';
  invoiceNumber: string;
  disputeText: string;
}

export type ExtractedData =
  | BookingCreationData
  | BookingAmendmentData
  | BookingCancellationData
  | ManualMoveRequestData
  | InvoiceDisputeData;

export interface Email {
  id: string;
  from: string;
  subject: string;
  date: string;
  body: string;
  classification: Classification;
  businessProcess: 'booking' | 'equipment' | 'invoicing' |'other';
  extractedData?: ExtractedData;
  automationStatus: string;
  processingStatus: string;
}

export const emails: Email[] = [
  {
    id: '1',
    from: 'SkyHigh Airlines',
    subject: 'Booking Confirmation: Flight to Tokyo',
    date: '2024-07-29',
    body: 'Dear Customer,\n\nYour flight booking to Tokyo (SH-123) is confirmed for October 15, 2024. Please find your e-ticket attached.\n\nThank you for flying with us,\nSkyHigh Airlines',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '2',
    from: 'Grand Hotel Group',
    subject: 'Your Reservation #GH-88231 is Confirmed',
    date: '2024-07-29',
    body: 'Hello,\n\nYour reservation for a Deluxe Queen Room at The Grand Hotel from Nov 5 to Nov 10, 2024, is confirmed. We look forward to welcoming you.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '3',
    from: 'support@rentalcarz.com',
    subject: 'Confirmation for your car rental in Miami',
    date: '2024-07-29',
    body: 'Your booking for a Standard SUV in Miami from Sep 1-7, 2024 is confirmed. Your reference is RC-45678.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '4',
    from: 'Eva Mendes',
    subject: 'Re: Your booking update',
    date: '2024-07-29',
    body: 'Hi, can we please change the number of guests from 2 to 3 for our booking #GH-88231? Please let me know if this is possible. Thanks, Eva',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '5',
    from: 'City Tours Co.',
    subject: 'Cancellation of your Historical Walk tour',
    date: '2024-07-29',
    body: 'Dear Customer,\n\nAs per your request, your booking for the Historical Walk tour on August 20th has been cancelled. A full refund will be processed within 5-7 business days.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '6',
    from: 'Tech Weekly Digest',
    subject: 'The latest in AI and Web Development',
    date: '2024-07-28',
    body: 'This week: The rise of serverless architecture, a deep dive into new JavaScript frameworks, and our take on the future of AI. Read more inside.',
    classification: 'unclassified',
    businessProcess: 'other',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '7',
    from: 'Oceanic Flights',
    subject: 'Important: Your flight itinerary has changed',
    date: '2024-07-28',
    body: 'Please note that your flight OF-456 to Honolulu will now depart at 10:30 AM instead of 9:45 AM. We apologize for any inconvenience.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '8',
    from: 'The Seaside Resort',
    subject: 'Update to your booking - Room upgrade!',
    date: '2024-07-28',
    body: 'Great news! We have upgraded your room to a Sea View Suite for your upcoming stay at no extra charge. We hope you enjoy it!',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '9',
    from: 'billing@cloudservice.com',
    subject: 'Your monthly invoice is ready',
    date: '2024-07-28',
    body: 'Your invoice for July 2024 is now available. Total amount due: $25.00. Thank you for your business.',
    classification: 'unclassified',
    businessProcess: 'other',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '10',
    from: 'Adventure Bookings',
    subject: 'Booking for Mountain Hike Confirmed',
    date: '2024-07-28',
    body: 'Your spot for the full-day mountain hike on September 12th is confirmed! Please review the attached gear list.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '11',
    from: 'Global Airways',
    subject: 'Your flight to Sydney has been cancelled',
    date: '2024-07-27',
    body: 'We regret to inform you that your flight GA-789 to Sydney has been cancelled due to operational reasons. Please contact customer service to rebook or request a refund.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '12',
    from: 'John Appleseed',
    subject: 'Quick question about the project',
    date: '2024-07-27',
    body: 'Hey, I was looking over the latest mockups and had a quick question. Do you have a moment to chat this afternoon?',
    classification: 'unclassified',
    businessProcess: 'other',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '13',
    from: 'FastTrack Trains',
    subject: 'Booking confirmation: London to Paris',
    date: '2024-07-27',
    body: 'Your e-ticket for your journey from London St Pancras to Paris Gare du Nord is attached. Your train departs at 08:01 on August 15th.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '14',
    from: 'The Royal Palace Hotel',
    subject: 'Cancellation Confirmation for booking #RP-54321',
    date: '2024-07-27',
    body: 'This email confirms the cancellation of your booking #RP-54321. As per our policy, your deposit has been fully refunded.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '15',
    from: 'DriveEasy Rentals',
    subject: 'Amendment to your rental agreement',
    date: '2024-07-27',
    body: 'We have updated your rental agreement to include an additional driver as requested. Please see the attached revised document.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '16',
    from: 'notifications@socialnet.com',
    subject: 'You have a new friend request',
    date: '2024-07-26',
    body: 'Jane Doe wants to connect with you on SocialNet. Visit their profile to accept the request.',
    classification: 'unclassified',
    businessProcess: 'other',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '17',
    from: 'support@cruisekings.com',
    subject: 'Your cruise booking is confirmed!',
    date: '2024-07-26',
    body: 'Get ready to set sail! Your booking for the 7-Day Caribbean Cruise is confirmed. Your cabin number is C-45. Bon voyage!',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '18',
    from: 'The Loft Apartments',
    subject: 'Re: Change of dates for your stay',
    date: '2024-07-26',
    body: 'We have successfully changed your booking dates to check-in on Dec 22nd and check-out on Dec 29th. We look forward to hosting you!',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '19',
    from: 'Global Airways',
    subject: 'New Booking: Reference GBL-987XYZ',
    date: '2024-07-26',
    body: 'Thank you for booking with Global Airways. Your flight from New York to London on Nov 1st is confirmed. Your booking reference is GBL-987XYZ.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '20',
    from: 'The Grand Hotel Group',
    subject: 'Your booking has been cancelled as requested',
    date: '2024-07-26',
    body: 'This confirms that your reservation #GH-91011 at The Grand Hotel has been cancelled. We hope to see you again in the future.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '21',
    from: 'HR Department',
    subject: 'Reminder: Annual Performance Review',
    date: '2024-07-25',
    body: 'This is a friendly reminder that your annual performance review is scheduled for next week. Please complete your self-assessment form by EOD Friday.',
    classification: 'unclassified',
    businessProcess: 'other',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '22',
    from: 'Adventure Bookings',
    subject: 'Change of guide for your Mountain Hike',
    date: '2024-07-25',
    body: 'Please note, your guide for the upcoming mountain hike will now be Sarah instead of Tom. All other details of the trip remain the same.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '23',
    from: 'SkyHigh Airlines',
    subject: 'Your flight time has been updated',
    date: '2024-07-25',
    body: 'An update on your flight SH-123 to Tokyo: The departure time has been moved from 2:00 PM to 2:30 PM. Please plan accordingly.',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '24',
    from: 'SecureBank',
    subject: 'Security Alert: Login from a new device',
    date: '2024-07-25',
    body: 'We detected a new login to your account from a device in London, UK. If this was not you, please secure your account immediately.',
    classification: 'unclassified',
    businessProcess: 'other',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '25',
    from: 'City Tours Co.',
    subject: 'New Booking Confirmed: Night Sky Tour',
    date: '2024-07-25',
    body: 'Thank you for booking the Night Sky Tour for 2 people on August 30th. We can\'t wait to show you the stars!',
    classification: 'unclassified',
    businessProcess: 'booking',
    automationStatus: 'TRIGGERED',
    processingStatus: 'PROCESSED'
  },
  {
    id: '26',
    from: 'Warehouse Logistics',
    subject: 'Request for Manual Move - Pallets to Section B',
    date: '2024-07-30',
    body: 'Dear Team, \n\nPlease arrange for a manual move of 5 pallets of finished goods from Section A to Section B in Warehouse 3. This needs to be completed by end of day August 5th. \n\nItem description: Electronics Components. \n\nThank you, \nJohn Doe',
    classification: 'manual move request',
    businessProcess: 'equipment',
    extractedData: {
      type: 'manual move request',
      moveType: 'Pallets',
      sourceLocation: 'Section A, Warehouse 3',
      destinationLocation: 'Section B, Warehouse 3',
      moveDate: '2024-08-05',
      itemDescription: 'Electronics Components',
    },
    automationStatus: 'PENDING',
    processingStatus: 'UNPROCESSED'
  }
];
