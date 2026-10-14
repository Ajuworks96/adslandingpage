export interface RegistrationFormData {
  fullName: string;
  mobile: string;
  businessName: string;
  businessCategory: string;
  otherCategory?: string;
  email?: string;
  businessLocation?: string;
  websiteOrSocial?: string;
  consent: boolean;
  honeypot?: string;
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    referrer?: string;
  };
}

export interface LeadRecord extends RegistrationFormData {
  id: string;
  createdAt: string;
  emailStatus: 'sent' | 'queued_for_configuration' | 'failed';
  emailError?: string;
  sheetStatus?: 'synced' | 'queued_for_configuration' | 'failed';
  sheetError?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  referenceId?: string;
  data?: T;
  errors?: Record<string, string>;
}
