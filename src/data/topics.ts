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
  visualizerType: 'none' | 'intro' | 'hash-simple' | 'hash-props' | 'avalanche' | 'hash-vs-enc' | 'sig-concept' | 'pk-concept' | 'sig-vs-ver' | 'keys' | 'signature' | 'blockchain';
}

export const TOPICS: Topic[] = [
  {
    id: 'intro',
    title: 'What is Cryptography',
    description: 'The science of securing communication.',
    icon: Shield,
    content: {
      definition: "At its core, cryptography is the art of writing secrets. It allows you to send a message that looks like nonsense to everyone except the person who has the 'key' to read it.",
      analogy: "A secret decoder ring. You spin the ring (the key) to turn 'HELLO' into 'KHOOR'. Only someone with the same ring setting can read it.",
      keyPoints: [
        "Confidentiality: Keeping secrets secret.",
        "Integrity: Ensuring no one changed the message.",
        "Authentication: Knowing exactly who sent it."
      ]
    },
    visualizerType: 'intro'
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
    title: 'Properties of Hash Functions',
    description: 'Why small changes matter.',
    icon: Search,
    content: {
      definition: "A secure hash function has a special property called the 'Avalanche Effect'. This means if you change just ONE letter of your message, the entire hash fingerprint changes completely.",
      analogy: "A kaleidoscope. If you turn the tube just 1 millimeter, the entire beautiful pattern completely rearranges itself into something unrecognizable.",
      keyPoints: [
        "Unpredictable: You can't guess the output.",
        "Sensitive: Even a space or comma changes everything.",
        "Irreversible: You can't turn the smoothie back into fruit."
      ]
    },
    visualizerType: 'avalanche'
  },
  {
    id: 'hashing-vs-encryption',
    title: 'Hashing vs Encryption',
    description: 'One-way vs. Two-way security.',
    icon: ArrowLeftRight,
    content: {
      definition: "Hashing is for verifying (is this the same?), while Encryption is for hiding (can you read this?). Hashing is one-way and requires no key. Encryption is two-way and MUST have a key to work.",
      analogy: "Hashing is like making a fruit smoothie: you can't turn the smoothie back into fruit. Encryption is like putting fruit in a locked safe: you can get the fruit back if you have the key.",
      keyPoints: [
        "Hashing: Verification & Integrity (Passwords).",
        "Encryption: Privacy & Confidentiality (Messages).",
        "The Key: Only Encryption uses a key to reverse the process."
      ]
    },
    visualizerType: 'hash-vs-enc'
  },
  {
    id: 'public-key',
    title: 'Public Key Cryptography',
    description: 'The foundation of modern identity.',
    icon: Key,
    content: {
      definition: "Public Key Cryptography uses a mathematically linked pair of keys. Here is the golden rule: What one key locks, ONLY the other key can unlock.",
      analogy: "A magic distinct-key lock. If you lock it with Key A (Public), only Key B (Private) opens it (Confidentiality). If you lock it with Key B (Private), only Key A (Public) opens it (Identity/Signing).",
      keyPoints: [
        "Confidentiality: Encrypt with Public -> Decrypt with Private.",
        "Identity (Signing): Encrypt with Private -> Decrypt/Verify with Public.",
        "The Pair: You can never derive the Private Key from the Public Key."
      ]
    },
    visualizerType: 'pk-concept'
  },
  {
    id: 'digital-signatures',
    title: 'Digital Signatures',
    description: 'Proving authenticity.',
    icon: FileSignature,
    content: {
      definition: "Now that we have Private Keys, we can use them to 'sign' data. A digital signature is created by encrypting the message's hash with your Private Key.",
      analogy: "The Wax Seal. You create a unique stamp (Signature) using your ring (Private Key). Anyone with your public info can check the stamp to prove it came from you and hasn't been broken.",
      keyPoints: [
        "Process: Hash(Message) + Private Key = Signature.",
        "Verification: Signature + Public Key = Valid/Invalid.",
        "Security: Proves origin and integrity simultaneously."
      ]
    },
    visualizerType: 'sig-concept'
  },
  {
    id: 'signing-vs-verification',
    title: 'Signing vs Verification',
    description: 'The distinct roles of key pairs.',
    icon: FileSignature,
    content: {
      definition: "Signing and Verification are the two halves of a secure conversation. The Sender signs in private, and the Receiver verifies in public.",
      analogy: "Signing is like writing a check with a secret pen. Verification is like a bank teller using a public light to check if the ink is genuine.",
      keyPoints: [
        "Signing: Uses the Private Key to create the proof.",
        "Verification: Uses the Public Key to check the proof.",
        "Tamper Detection: If even one bit changes, verification fails."
      ]
    },
    visualizerType: 'sig-vs-ver'
  },
  {
    id: 'blockchain',
    title: 'Why Blockchains Need Cryptography',
    description: 'Building trust without a middleman.',
    icon: Network,
    content: {
      definition: "Blockchains use Hashes to link blocks together in a specific order. Each block contains the 'fingerprint' of the one before it. If you change a block in the past, the fingerprints no longer match, breaking the chain.",
      analogy: "A public notary book where every page starts by summarizing the page before it. If you rip out or change a page in the middle, the summaries on the following pages won't match anymore.",
      keyPoints: [
        "Hashed Linking: Block B points to the hash of Block A.",
        "Immutability: You can't change history without breaking the future.",
        "Distributed Trust: Math, not people, ensures the ledger is honest."
      ]
    },
    visualizerType: 'blockchain'
  }
];