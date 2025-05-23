import { create } from "zustand";

export type Deployment = {
  txHash: string;
  blockchain: "ethereum" | "mantle" | "arbitrum";
};

interface Store {
  deployments: Deployment[] | null;
  setDeployments: (d: Deployment[]) => void;
}

export const useDeploymentStore = create<Store>((set) => ({
  deployments: null,
  setDeployments: (deployments) => {
    set({ deployments });
    console.log("Deployments set:", deployments);
  },
}));
