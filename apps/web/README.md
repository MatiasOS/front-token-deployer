# Front Token Deployer - Web App

This is the web application for the **Front Token Deployer**, a tool designed to simplify the deployment and management of tokens on blockchain networks.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
- **Package Manager**: Use `npm` for dependency management.

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-repo/front-token-deployer.git
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Create a `.env` file in the root directory with the following content:
  ```bash
  NEXT_PUBLIC_API_URL=http://localhost:3000/api
  ```

  Adjust the API URL according to your setup if needed.

4. Start the development server:
  ```bash
  npm run dev
  ```

5. Open the app in your browser at `http://localhost:3005`.

## Demo
Check out our demo video to see the Front Token Deployer in action:

<img alt="Front Token Deployer Demo" src="https://img.youtube.com/vi/xcj8AmWRF-s/0.jpg">

## AI Assistant - Nebula
Our platform includes an integrated AI chat assistant named Nebula that can help you with:

  - Understanding token deployment concepts
  - Answering questions about blockchain networks
  - Providing guidance on token parameters

## Usage

  ### Token Configuration
  1. **Basic Token Details**:
      - **Select Blockchain Network**: Choose from the supported chains where you want to deploy your token (e.g., Ethereum, Mantle, Arbitrum).
      - **Select Protocols**: Specify the protocols or standards your token should adhere to (e.g., OFT).
      - **Token Name**: Enter a meaningful name for your token (e.g., "My Sample Token")
      - **Token Symbol**: Choose a short symbol (typically 3-4 characters, e.g., "MST")

  2. **Token Properties**:
    - **Ownable**: Toggle this option if you want to transfer the contract ownership control functions. *(Not implemented yet)*
      - When *enabled*, the owner can perform privileged operations like pausing transfers or minting new tokens
      - When *disabled*, the contract has no special administrator

  3. **Distribution**:
    - For each network you'll need configure:
      - **Address**: Enter the wallet address that will own the deployed token on that network.
      - **Amount**: Set the number of tokens to be created at deployment on that network.

  4. **Review & Deploy**:
      - Verify all information on the payment screen before proceeding. 
      - Confirm the deployment transaction.
      - Monitor deployment status on the resume screen.

  5. **Post-Deployment**:
    Once deployment is successful, you'll see the contract address. Save this information for future reference. 

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please contact the development team at `https://x.com/mati_os_eth`.