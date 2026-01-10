# CryptViz: Cryptography Fundamentals Visual Learning

A visual-first interactive microsite that teaches Cryptography Fundamentals with a deep focus on Hashing and Digital Signatures.

## Features

- **Interactive Hashing**: Type text and see the hash change in real-time. Visualize the "Avalanche Effect".
- **Digital Signatures**: Generate ECDSA key pairs, sign messages, and verify them.
- **Tamper Simulation**: Edit a signed message to see verification fail.
- **Learning Path**: Guided modules explaining the core concepts of crypto.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/subhajitlucky/cryptviz.git
   cd cryptviz
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the local URL (usually `http://localhost:5173`).

## Simulation Details

### Hashing
We use the **Web Crypto API** to generate real **SHA-256** hashes. The visualization highlights which characters change when the input is modified.

### Digital Signatures
We use **ECDSA (P-256)** via the Web Crypto API.
- **Keys**: Real cryptographic keys are generated in the browser. They are displayed as truncated hex strings for readability.
- **Signing**: The message is hashed and signed with the Private Key.
- **Verification**: The signature is checked against the Public Key and the Message.

## Disclaimer

**Educational Use Only.**
While this application uses real cryptographic algorithms (SHA-256, ECDSA), the key management and display are simplified for educational purposes. Do not use the keys generated here for protecting real value or sensitive data. The keys are ephemeral and stored only in memory.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React