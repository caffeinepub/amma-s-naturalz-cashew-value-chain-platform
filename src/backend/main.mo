import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Timestamp = Time.Time;

  public type ContactInquiry = {
    id : Nat;
    name : Text;
    companyName : Text;
    email : Text;
    phone : Text;
    industryType : Text;
    message : Text;
    submittedAt : Timestamp;
  };

  public type InvestorRegistration = {
    id : Nat;
    name : Text;
    company : Text;
    investmentInterest : Text;
    phone : Text;
    email : Text;
    submittedAt : Timestamp;
  };

  public type MarketGuideLeadCapture = {
    id : Nat;
    name : Text;
    company : Text;
    phone : Text;
    email : Text;
    submittedAt : Timestamp;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    company : Text;
  };

  module ContactInquiry {
    public func compare(ci1 : ContactInquiry, ci2 : ContactInquiry) : Order.Order {
      Nat.compare(ci1.id, ci2.id);
    };
  };

  module InvestorRegistration {
    public func compare(ir1 : InvestorRegistration, ir2 : InvestorRegistration) : Order.Order {
      Nat.compare(ir1.id, ir2.id);
    };
  };

  module MarketGuideLeadCapture {
    public func compare(mglc1 : MarketGuideLeadCapture, mglc2 : MarketGuideLeadCapture) : Order.Order {
      Nat.compare(mglc1.id, mglc2.id);
    };
  };

  stable var nextContactInquiryId = 0;
  stable var nextInvestorRegistrationId = 0;
  stable var nextMarketGuideLeadCaptureId = 0;

  let contactInquiries = Map.empty<Nat, ContactInquiry>();
  let investorRegistrations = Map.empty<Nat, InvestorRegistration>();
  let marketGuideLeadCaptures = Map.empty<Nat, MarketGuideLeadCapture>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public form submission endpoints (no auth required - accessible to guests)
  public shared ({ caller }) func submitContactInquiry(name : Text, companyName : Text, email : Text, phone : Text, industryType : Text, message : Text) : async () {
    let inquiry : ContactInquiry = {
      id = nextContactInquiryId;
      name;
      companyName;
      email;
      phone;
      industryType;
      message;
      submittedAt = Time.now();
    };
    contactInquiries.add(nextContactInquiryId, inquiry);
    nextContactInquiryId += 1;
  };

  public shared ({ caller }) func submitInvestorRegistration(name : Text, company : Text, investmentInterest : Text, phone : Text, email : Text) : async () {
    let registration : InvestorRegistration = {
      id = nextInvestorRegistrationId;
      name;
      company;
      investmentInterest;
      phone;
      email;
      submittedAt = Time.now();
    };
    investorRegistrations.add(nextInvestorRegistrationId, registration);
    nextInvestorRegistrationId += 1;
  };

  public shared ({ caller }) func submitMarketGuideLeadCapture(name : Text, company : Text, phone : Text, email : Text) : async () {
    let leadCapture : MarketGuideLeadCapture = {
      id = nextMarketGuideLeadCaptureId;
      name;
      company;
      phone;
      email;
      submittedAt = Time.now();
    };
    marketGuideLeadCaptures.add(nextMarketGuideLeadCaptureId, leadCapture);
    nextMarketGuideLeadCaptureId += 1;
  };

  // Admin-only retrieval endpoints (contains sensitive PII and business data)
  public query ({ caller }) func getAllContactInquiries() : async [ContactInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all contact inquiries");
    };
    contactInquiries.values().toArray().sort();
  };

  public query ({ caller }) func getAllInvestorRegistrations() : async [InvestorRegistration] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all investor registrations");
    };
    investorRegistrations.values().toArray().sort();
  };

  public query ({ caller }) func getAllMarketGuideLeadCaptures() : async [MarketGuideLeadCapture] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all market guide lead captures");
    };
    marketGuideLeadCaptures.values().toArray().sort();
  };

  public query ({ caller }) func getContactInquiry(id : Nat) : async ContactInquiry {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact inquiries");
    };
    switch (contactInquiries.get(id)) {
      case (null) { Runtime.trap("Contact inquiry with id " # Nat.toText(id) # " does not exist.") };
      case (?inquiry) { inquiry };
    };
  };

  public query ({ caller }) func getInvestorRegistration(id : Nat) : async InvestorRegistration {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view investor registrations");
    };
    switch (investorRegistrations.get(id)) {
      case (null) { Runtime.trap("Investor registration with id " # Nat.toText(id) # " does not exist.") };
      case (?registration) { registration };
    };
  };

  public query ({ caller }) func getMarketGuideLeadCapture(id : Nat) : async MarketGuideLeadCapture {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view market guide lead captures");
    };
    switch (marketGuideLeadCaptures.get(id)) {
      case (null) { Runtime.trap("Market guide lead capture with id " # Nat.toText(id) # " does not exist.") };
      case (?leadCapture) { leadCapture };
    };
  };
};
