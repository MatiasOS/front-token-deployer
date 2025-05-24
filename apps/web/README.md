# Front Token Deployer - Web App

This is the web application for the **Front Token Deployer**, a tool designed to simplify the deployment and management of tokens on blockchain networks.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
- **Package Manager**: Use `npm` or `yarn` for dependency management.

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-repo/front-token-deployer.git
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Start the development server:
  ```bash
  npm run dev
  ```

4. Open the app in your browser at `http://localhost:3005`.

## Usage

1. Fill in the required token details (name, symbol, etc.).
2. Select whether you want the token to have the "Ownable" property (allows ownership control).
3. Provide the following details for deployment. For each blockchain:
  - **Owner Address**: The wallet address that will own the deployed token on the blockchain selected.
  - **Amount**: The total number of tokens to be minted.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please contact the development team at `matias.ovejasmith@gmail.com `.