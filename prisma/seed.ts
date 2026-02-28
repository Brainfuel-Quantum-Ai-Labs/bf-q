import { PrismaClient, ProjectStatus, PostType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Projects
  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "QuantumMind Neural Engine",
        slug: "quantummind-neural-engine",
        status: ProjectStatus.NOW,
        summary:
          "A next-generation neural processing engine leveraging quantum-classical hybrid architectures for real-time AI inference at unprecedented speeds.",
        tags: ["quantum-computing", "neural-networks", "AI", "inference"],
        heroImageUrl: null,
      },
      {
        title: "SecureChain Identity Protocol",
        slug: "securechain-identity-protocol",
        status: ProjectStatus.NEXT,
        summary:
          "Decentralized identity management system built on blockchain, enabling self-sovereign identity with zero-knowledge proofs.",
        tags: ["blockchain", "identity", "ZKP", "Web3"],
        heroImageUrl: null,
      },
      {
        title: "BioSense AI Diagnostics",
        slug: "biosense-ai-diagnostics",
        status: ProjectStatus.PIPELINE,
        summary:
          "AI-powered biomedical diagnostic platform combining computer vision and federated learning for privacy-preserving medical analysis.",
        tags: ["healthcare", "computer-vision", "federated-learning", "AI"],
        heroImageUrl: null,
      },
    ],
  });

  // Seed Products
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "BF-Q Inference API",
        slug: "bf-q-inference-api",
        category: "AI Platform",
        summary:
          "High-throughput REST API for deploying and scaling custom AI models with sub-millisecond latency. Supports PyTorch, TensorFlow, and ONNX formats.",
        links: ["https://api.bf-q.com/docs"],
      },
      {
        title: "QuantumLedger SDK",
        slug: "quantumledger-sdk",
        category: "Blockchain",
        summary:
          "Open-source SDK for building quantum-resistant blockchain applications. Features post-quantum cryptography and smart contract templates.",
        links: ["https://github.com/bf-q/quantumledger-sdk"],
      },
      {
        title: "NeuroCraft Studio",
        slug: "neurocraft-studio",
        category: "Developer Tools",
        summary:
          "Visual IDE for designing, training, and deploying neural network architectures. Drag-and-drop interface with real-time performance profiling.",
        links: ["https://studio.bf-q.com"],
      },
      {
        title: "SecureVault Enterprise",
        slug: "securevault-enterprise",
        category: "Security",
        summary:
          "Enterprise-grade secrets management and PKI solution with AI-driven threat detection and automated certificate lifecycle management.",
        links: ["https://vault.bf-q.com"],
      },
    ],
  });

  // Seed Posts
  await prisma.post.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Quantum-Classical Hybrid Architectures: The Next Frontier",
        slug: "quantum-classical-hybrid-architectures",
        type: PostType.RESEARCH,
        content: `## Abstract

Quantum-classical hybrid architectures represent a paradigm shift in computational design, blending the deterministic power of classical processors with the probabilistic advantages of quantum circuits.

## Introduction

As quantum hardware matures beyond the NISQ era, integrating quantum processing units (QPUs) with classical CPUs and GPUs presents unique engineering challenges and extraordinary opportunities. BrainFuel Quantum AI Labs has been at the forefront of this research, developing novel middleware layers that abstract QPU complexity from application developers.

## Key Findings

Our research demonstrates that hybrid architectures can achieve **10-100x speedups** for specific problem classes including:

- Portfolio optimization
- Drug discovery molecular simulation  
- Cryptographic key generation
- Large-scale machine learning gradient computation

## Conclusion

The quantum advantage is not monolithic—it emerges in carefully selected computational kernels. Our hybrid framework enables developers to seamlessly offload these kernels to QPUs while maintaining classical control flow.`,
      },
      {
        title: "BrainFuel Quantum AI Labs Secures Seed Funding",
        slug: "brainfuel-secures-seed-funding",
        type: PostType.NEWS,
        content: `BrainFuel Quantum AI Labs, headquartered in Navi Mumbai, India, has secured seed funding to accelerate development of its quantum-AI product suite.

The funding will be directed toward expanding the engineering team, accelerating R&D on the QuantumMind Neural Engine, and establishing strategic partnerships with leading research institutions.

Founder Mohsin Agwan commented: "This investment validates our vision of democratizing quantum AI capabilities for enterprises worldwide. We are building the infrastructure layer that will power the next generation of intelligent systems."

The company plans to launch its BF-Q Inference API in public beta within the next quarter.`,
      },
      {
        title: "Introducing Zero-Knowledge Proofs for AI Model Verification",
        slug: "zk-proofs-ai-model-verification",
        type: PostType.RESEARCH,
        content: `## Overview

Zero-knowledge proofs (ZKPs) offer a compelling solution to a critical problem in enterprise AI: how can you verify that an AI model was trained correctly and on approved data without revealing the model weights or training data?

## The Problem

Enterprises deploying AI face a trilemma:
1. **Transparency** – Regulators demand auditability
2. **Privacy** – Training data may be sensitive or proprietary  
3. **Security** – Model weights represent significant IP

## Our Approach

BF-Q Research has developed a ZK-SNARK based framework for generating succinct proofs of correct model training. Our system can generate a proof for a ResNet-50 training run in under 4 hours on commodity hardware.

## Applications

- Regulatory compliance in financial services
- Healthcare AI certification
- Federated learning integrity verification
- Supply chain AI auditing`,
      },
    ],
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
