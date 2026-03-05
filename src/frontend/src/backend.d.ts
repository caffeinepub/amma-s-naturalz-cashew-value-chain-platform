import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InvestorRegistration {
    id: bigint;
    name: string;
    submittedAt: Timestamp;
    email: string;
    company: string;
    investmentInterest: string;
    phone: string;
}
export type Timestamp = bigint;
export interface MarketGuideLeadCapture {
    id: bigint;
    name: string;
    submittedAt: Timestamp;
    email: string;
    company: string;
    phone: string;
}
export interface ContactInquiry {
    id: bigint;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
    companyName: string;
    phone: string;
    industryType: string;
}
export interface UserProfile {
    name: string;
    email: string;
    company: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactInquiries(): Promise<Array<ContactInquiry>>;
    getAllInvestorRegistrations(): Promise<Array<InvestorRegistration>>;
    getAllMarketGuideLeadCaptures(): Promise<Array<MarketGuideLeadCapture>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInquiry(id: bigint): Promise<ContactInquiry>;
    getInvestorRegistration(id: bigint): Promise<InvestorRegistration>;
    getMarketGuideLeadCapture(id: bigint): Promise<MarketGuideLeadCapture>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactInquiry(name: string, companyName: string, email: string, phone: string, industryType: string, message: string): Promise<void>;
    submitInvestorRegistration(name: string, company: string, investmentInterest: string, phone: string, email: string): Promise<void>;
    submitMarketGuideLeadCapture(name: string, company: string, phone: string, email: string): Promise<void>;
}
