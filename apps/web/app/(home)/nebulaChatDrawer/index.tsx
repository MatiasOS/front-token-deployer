"use client";
import { Drawer, Box, Typography, TextField, Stack } from "@mui/material";

interface NebulaChatDrawerProps {
  open: boolean;
  onClose: () => void;
  blockchain: string | null;
}

const blockchainDescriptions: Record<string, string> = {
  mantle:
    "Mantle is an Ethereum Layer 2 (L2) blockchain network designed to offer faster transaction speeds and lower fees while leveraging Ethereum's mainnet security. It utilizes a modular architecture and rollup technology to scale decentralized applications beyond the capabilities of Ethereum L1.\n\nKey facts about Mantle:\n\nNetwork Structure: Mantle includes the Mantle Network (Layer 2 chain), Mantle Treasury, and is governed by token holders through decentralized proposals.\nTechnology: It is optimized for mass adoption of decentralized, token-governed applications. Its modular rollup design allows for scalability and flexibility.\nToken: The native token is MNT (previously BIT, after the merger with BitDAO). Mantle also developed mETH, a liquid staking derivative for staked ETH on Ethereum mainnet.\nEcosystem: Mantle has processed tens of millions of transactions, launched a large ecosystem fund (proposed at $200 million) to support dApp development, and integrates a variety of DeFi protocols.\nGovernance: Projects and funding are managed via proposals and on-chain voting by token holders.\n\nMantle’s focus is to combine the security of Ethereum with the scalability and efficiency of a Layer 2. It also supports liquid staking and aims for open, decentralized innovation.",
  ethereum:
    "Ethereum is a decentralized, open-source blockchain platform launched in 2015. It allows anyone to deploy and operate smart contracts—self-executing code with logic written directly on the blockchain—and decentralized applications (dApps). Ethereum introduced the concept of programmable money and assets using its cryptocurrency, Ether (ETH), which is used for transaction fees and computational services.\n\nKey characteristics:\n\nSmart Contracts: Code stored and executed on-chain, removing the need for centralized intermediaries.\nNative Currency: Ether (ETH) powers transactions and contract interactions.\nTuring-complete Virtual Machine: The Ethereum Virtual Machine (EVM) enables complex logic and universal programmability.\nDeFi & NFTs: Ethereum hosts a rich ecosystem of decentralized finance (DeFi), non-fungible tokens (NFTs), DAOs, and gaming protocols.\nConsensus Mechanism: Ethereum transitioned from Proof-of-Work to Proof-of-Stake for greater scalability and lower environmental impact.\n\nWould you like to know about how to interact with Ethereum, its smart contract capabilities, or its ecosystem?",
  arbitrum:
    'It appears you meant "Arbitrum," not "Artbitrum."\n\nArbitrum is a leading Layer 2 scaling solution for Ethereum. Here’s what you need to know:\n\nPurpose: Enables faster and much cheaper Ethereum transactions by moving computation and data off the main Ethereum chain ("off-chain") and then settling results on Ethereum using a system called "optimistic rollups."\nRollup Technology: Arbitrum batches many transactions, reducing congestion and significantly lowering gas fees compared to using Ethereum Layer 1 directly.\nChains:\n- Arbitrum One is the main, general-purpose chain using optimistic rollups.\n- Arbitrum Nova is optimized for high transaction volume use cases like gaming and social apps, using a related protocol (AnyTrust).\nEcosystem: Supports a wide range of decentralized applications (DeFi, NFTs, gaming, etc.) and is fully compatible with Ethereum smart contracts written in Solidity.\nToken: Arbitrum has its own native governance token, $ARB, used for voting on protocol upgrades and community decisions.\nMarket position: Arbitrum is the largest Ethereum Layer 2 solution by market share and Total Value Locked (TVL), often processing billions of dollars in assets.\n\nIf you have a question about a different project called "Artbitrum" please clarify. Would you like to know how to use Arbitrum, bridge assets, or explore its dApps?',
};

export const NebulaChatDrawer = ({
  open,
  onClose,
  blockchain,
}: NebulaChatDrawerProps) => {
  const question = blockchain ? `What is ${capitalize(blockchain)}?` : "";
  const answer = blockchain
    ? blockchainDescriptions[blockchain.toLowerCase()] || "No info available."
    : "";

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        p={3}
        width={450}
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Stack spacing={2} mt={4} flex={1}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Assistant:
            </Typography>
            <Box
              border={0.5}
              padding={2}
              borderColor="custom.sage"
              borderRadius={2}
            >
              <Typography variant="body1">{answer}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              You asked:
            </Typography>
            <TextField
              fullWidth
              value={question}
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Box>
        </Stack>
        <Box mt={1} display="flex" alignItems="center" flexDirection="column">
          <Typography>Powered By</Typography>
          <svg
            width="24"
            height="24"
            viewBox="0 0 153 153"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-foreground"
            role="presentation"
          >
            <path
              d="M76.3162 90.8232C82.4613 90.8232 87.4429 85.8416 87.4429 79.6965C87.4429 73.5514 82.4613 68.5698 76.3162 68.5698C70.171 68.5698 65.1895 73.5514 65.1895 79.6965C65.1895 85.8416 70.171 90.8232 76.3162 90.8232Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M91.9481 29.4892C78.7023 32.4916 63.6745 40.7425 50.4663 53.9508C46.781 57.636 43.4817 61.4629 40.5746 65.3532C44.5585 68.8492 47.0735 73.9786 47.0735 79.6955C47.0735 90.2299 38.5336 98.7698 27.9992 98.7698C27.1107 98.7698 26.2364 98.7091 25.3803 98.5915C23.3955 110.414 25.9579 119.384 31.3537 124.78C37.2202 130.646 47.3123 133.164 60.701 130.129C73.9468 127.126 88.9745 118.875 102.183 105.667C105.888 101.962 109.204 98.1131 112.122 94.2007C108.103 90.7037 105.562 85.551 105.562 79.8048C105.562 69.2704 114.102 60.7305 124.636 60.7305C125.536 60.7305 126.421 60.7928 127.288 60.9133C129.237 49.147 126.674 40.2167 121.295 34.8381C115.429 28.9716 105.337 26.4545 91.9481 29.4892ZM16.3791 94.8229C13.4047 109.493 15.9004 122.818 24.608 131.526C42.6147 149.532 80.3662 140.975 108.928 112.413C113.381 107.96 117.348 103.284 120.803 98.494C122.042 98.7466 123.324 98.8792 124.636 98.8792C135.171 98.8792 143.711 90.3393 143.711 79.8048C143.711 73.6582 140.803 68.1906 136.289 64.7023C139.234 50.0687 136.73 36.7817 128.041 28.0925C110.034 10.0859 72.2829 18.6429 43.7206 47.2051C39.2988 51.627 35.3564 56.2691 31.9179 61.024C30.6531 60.7599 29.3423 60.6211 27.9992 60.6211C17.4647 60.6211 8.9248 69.161 8.9248 79.6955C8.9248 85.8567 11.8461 91.3357 16.3791 94.8229ZM124.636 70.2677C119.369 70.2677 115.099 74.5376 115.099 79.8048C115.099 85.0721 119.369 89.342 124.636 89.342C129.904 89.342 134.174 85.0721 134.174 79.8048C134.174 74.5376 129.904 70.2677 124.636 70.2677ZM18.462 79.6955C18.462 74.4282 22.7319 70.1583 27.9992 70.1583C33.2664 70.1583 37.5363 74.4282 37.5363 79.6955C37.5363 84.9627 33.2664 89.2326 27.9992 89.2326C22.7319 89.2326 18.462 84.9627 18.462 79.6955Z"
              fill="currentColor"
            ></path>
          </svg>
          <span className="font-medium text-lg">Nebula</span>
        </Box>
      </Box>
    </Drawer>
  );
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
