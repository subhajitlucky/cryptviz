import { Hash, FileSignature, Shield, Network, Key, Search, ArrowLeftRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  content: {
    definition: string;
    analogy: string;
    keyPoints: string[];
  };
  visualizerType: 'none' | 'hash-simple' | 'hash-props' | 'hash-vs-enc' | 'keys' | 'signature' | 'blockchain';
}

export const TOPICS: Topic[] = [
  {
    id: 'intro',
    title: 'What is Cryptography?',
    description: 'The science of securing communication.',
    icon: Shield,
    content: {
      definition: "Cryptography is the practice of protecting information by transforming it (encrypting) into an unreadable format, called ciphertext. Only those who possess a secret key can decipher (or decrypt) the message into plain text.",
      analogy: "Writing a letter in a language only you and your friend understand.",
      keyPoints: [
        "Confidentiality: Only authorized people can read it.",
        "Integrity: The message hasn't been changed.",
        "Authentication: Proving who sent the message.",
        "Non-repudiation: The sender cannot deny sending it."
      ]
    },
    visualizerType: 'none'
  },
  {
    id: 'hashing',
    title: 'Hash Functions',
    description: 'The digital fingerprint of data.',
    icon: Hash,
    content: {
      definition: "A hash function takes input data of any size and converts it into a fixed-size string of characters, which is typically a digest that is unique to the data being hashed.",
      analogy: "A fingerprint. A person (data) is complex, but their fingerprint (hash) is small and unique to them.",
      keyPoints: [
        "Deterministic: Same input always equals same output.",
        "Fast: Quick to compute.",
        "Fixed Size: Output length is always the same (e.g., 256 bits)."
      ]
    },
    visualizerType: 'hash-simple'
  },
  {
    id: 'hash-properties',
    title: 'Avalanche Effect',
    description: 'Why small changes matter.',
    icon: Search,
    content: {
      definition: "A key property of cryptographic hashes where a tiny change in the input (like flipping one bit) results in a drastically different output.",
      analogy: "A kaleidoscope. A tiny turn of the tube completely changes the entire pattern.",
      keyPoints: [
        "Unpredictable: You can't guess the output from the input.",
        "Sensitive: Even a space or comma change alters everything.",
        "Secure: Makes it impossible to reverse-engineer the input."
      ]
    },
    visualizerType: 'hash-props'
  },
  {
    id: 'hashing-vs-encryption',
    title: 'Hashing vs. Encryption',
    description: 'One-way vs. Two-way security.',
    icon: ArrowLeftRight,
    content: {
      definition: "Hashing is a one-way process used for integrity. Encryption is a two-way process used for confidentiality. You can't 'un-hash' a fingerprint, but you can 'de-crypt' a message.",
      analogy: "Hashing is like making a smoothie (you can't turn the smoothie back into fruit). Encryption is like putting fruit in a locked box (you can get the fruit back if you have the key).",
      keyPoints: [
        "Hashing: NO KEY required to create, NO WAY to reverse.",
        "Encryption: KEY REQUIRED to lock and unlock.",
        "Usage: Hashing for passwords/files, Encryption for messages."
      ]
    },
    visualizerType: 'hash-vs-enc'
  },
  {
    id: 'public-key',
    title: 'Public Key Cryptography',
    description: 'Two keys are better than one.',
    icon: Key,
    content: {
      definition: "Also known as asymmetric cryptography, this system uses pairs of keys: public keys (which may be shared) and private keys (known only to the owner).",
      analogy: "A mailbox. Anyone can drop a letter in (encrypt with public key), but only the owner with the key can open it (decrypt with private key).",
      keyPoints: [
        "Private Key: Must be kept secret.",
        "Public Key: Can be shared with the world.",
        "Mathematically Related: They work as a pair."
      ]
    },
    visualizerType: 'keys'
  },
  {
    id: 'digital-signatures',
    title: 'Digital Signatures',
    description: 'Proving authenticity.',
    icon: FileSignature,
    content: {
      definition: "A digital signature proves that a message came from a specific person and hasn't been tampered with. It combines hashing and private keys.",
      analogy: "A wax seal on an envelope, stamped with a ring only YOU possess.",
      keyPoints: [
        "Authenticity: Confirms who sent it.",
        "Integrity: Confirms content wasn't changed.",
        "Non-repudiation: Sender can't deny it."
      ]
    },
    visualizerType: 'signature'
  },
  {
    id: 'blockchain',
    title: 'Why Blockchains?',
    description: 'Building trust without a middleman.',
    icon: Network,
    content: {
      definition: "Blockchains use hashes to link blocks of data together (integrity) and digital signatures to authorize transactions (authenticity), creating a tamper-proof ledger.",
      analogy: "A public notary notebook where every page references the previous page's fingerprint, and every entry is signed by the author.",
      keyPoints: [
        "Immutable: Can't change history without breaking the chain.",
        "Decentralized: No single authority needed.",
        "Trustless: Math provides the trust."
      ]
    },
    visualizerType: 'blockchain'
  }
];