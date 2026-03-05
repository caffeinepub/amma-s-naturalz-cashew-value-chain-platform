import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitContactInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      companyName: string;
      email: string;
      phone: string;
      industryType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitContactInquiry(
        data.name,
        data.companyName,
        data.email,
        data.phone,
        data.industryType,
        data.message,
      );
    },
  });
}

export function useSubmitInvestorRegistration() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      company: string;
      investmentInterest: string;
      phone: string;
      email: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitInvestorRegistration(
        data.name,
        data.company,
        data.investmentInterest,
        data.phone,
        data.email,
      );
    },
  });
}

export function useSubmitMarketGuideLead() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      company: string;
      phone: string;
      email: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitMarketGuideLeadCapture(
        data.name,
        data.company,
        data.phone,
        data.email,
      );
    },
  });
}
