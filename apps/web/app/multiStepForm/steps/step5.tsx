import { useState } from "react";
import { OFTSection } from "../../components/oft";
import { Box } from "@mui/material";
import { MerkleTreeSection } from "../../components/merkle-tree";

export interface SmartContractAddress {
  contractAddress: string;
  blockchain: "ethereum" | "mantle" | "arbitrum";
}

export const Step5 = () => {
  const [oftAddress, setOftAddress] = useState<SmartContractAddress[]>([]);

  return (
    <Box>
      <OFTSection oftAddress={oftAddress} setOftAddress={setOftAddress} />
      <MerkleTreeSection oftAdrress={oftAddress} />
    </Box>
  );
};
