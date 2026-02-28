// Static fallback data used when the database is not available.
// Mirrors the seed data in prisma/seed.ts with additional rich detail.

export const staticProducts = [
  {
    id: "static-1",
    title: "BF-Q Inference API",
    slug: "bf-q-inference-api",
    category: "AI Platform",
    summary:
      "High-throughput REST API for deploying and scaling custom AI models with sub-millisecond latency. Supports PyTorch, TensorFlow, and ONNX formats.",
    description:
      "BF-Q Inference API is a fully managed, cloud-native model-serving platform designed for enterprises that need deterministic performance at any scale. Built on a distributed inference engine, it handles thousands of concurrent requests while maintaining p99 latency under 10 ms. The API natively supports PyTorch, TensorFlow, ONNX, and JAX models, with auto-scaling, canary deployments, and A/B testing baked in.",
    features: [
      "Sub-10 ms P99 inference latency",
      "Auto-scaling from 0 to 10 000 RPS",
      "Multi-framework: PyTorch, TensorFlow, ONNX, JAX",
      "Canary & A/B deployment strategies",
      "Built-in model versioning & rollback",
      "OpenTelemetry-native observability",
      "gRPC & REST endpoints",
      "Edge deployment support (WASM / TensorRT)",
    ],
    useCases: [
      "Real-time recommendation engines",
      "NLP API services (classification, summarisation, generation)",
      "Computer-vision pipelines in production",
      "Fraud detection & anomaly scoring",
    ],
    links: ["https://api.bf-q.com/docs"],
    gradient: "from-quantum-800 to-quantum-600",
    iconColor: "text-quantum-400",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "static-2",
    title: "QuantumLedger SDK",
    slug: "quantumledger-sdk",
    category: "Blockchain",
    summary:
      "Open-source SDK for building quantum-resistant blockchain applications. Features post-quantum cryptography and smart contract templates.",
    description:
      "QuantumLedger SDK equips Web3 developers with post-quantum cryptographic primitives—CRYSTALS-Kyber, CRYSTALS-Dilithium, and SPHINCS+—integrated directly into a familiar Ethers.js-compatible API. Build quantum-proof DeFi protocols, NFT platforms, and DAOs today so your users are safe when large-scale quantum computers arrive.",
    features: [
      "NIST-standardised PQC algorithms (Kyber, Dilithium, SPHINCS+)",
      "EVM-compatible smart contract templates",
      "Hardware wallet integration",
      "Zero-knowledge proof helpers (SNARK & STARK)",
      "Multi-chain support (Ethereum, Polygon, Solana)",
      "TypeScript-first API with full type safety",
      "Comprehensive test suite with 95 % coverage",
      "Apache 2.0 open-source licence",
    ],
    useCases: [
      "Post-quantum DeFi protocols",
      "Quantum-resistant NFT marketplaces",
      "Enterprise private blockchains requiring long-term security",
      "Government & defence digital-asset infrastructure",
    ],
    links: ["https://github.com/bf-q/quantumledger-sdk"],
    gradient: "from-green-900 to-green-700",
    iconColor: "text-green-400",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "static-3",
    title: "NeuroCraft Studio",
    slug: "neurocraft-studio",
    category: "Developer Tools",
    summary:
      "Visual IDE for designing, training, and deploying neural network architectures. Drag-and-drop interface with real-time performance profiling.",
    description:
      "NeuroCraft Studio reimagines how AI engineers design and iterate on neural architectures. Its canvas-based editor lets you drag, connect, and configure layers visually while the live-profiler updates FLOPs, parameter counts, and memory estimates in real time. One-click export to PyTorch, ONNX, or TensorFlow Lite, and seamless push to BF-Q Inference API.",
    features: [
      "Drag-and-drop neural architecture canvas",
      "Real-time FLOPs, params & memory estimator",
      "Integrated hyperparameter sweep with Optuna",
      "Collaborative workspaces (multi-user editing)",
      "Export to PyTorch, ONNX, TFLite, CoreML",
      "Built-in dataset versioning",
      "CUDA & Metal GPU acceleration",
      "One-click deploy to BF-Q Inference API",
    ],
    useCases: [
      "Rapid neural-architecture prototyping",
      "Automated NAS (Neural Architecture Search)",
      "Academic research and teaching",
      "MLOps team collaboration",
    ],
    links: ["https://studio.bf-q.com"],
    gradient: "from-purple-900 to-purple-700",
    iconColor: "text-purple-400",
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "static-4",
    title: "SecureVault Enterprise",
    slug: "securevault-enterprise",
    category: "Security",
    summary:
      "Enterprise-grade secrets management and PKI solution with AI-driven threat detection and automated certificate lifecycle management.",
    description:
      "SecureVault Enterprise is a zero-trust secrets management platform that combines AI-driven behavioural anomaly detection with quantum-resistant PKI. Centralise API keys, database credentials, and TLS certificates across any cloud or on-premise environment, with automated rotation and audit-ready compliance reports for SOC 2, ISO 27001, and PCI-DSS.",
    features: [
      "AI-powered anomaly & insider-threat detection",
      "Quantum-resistant PKI (CRYSTALS-Dilithium)",
      "Automated secret rotation on configurable schedules",
      "Cloud-agnostic: AWS, GCP, Azure, on-prem",
      "Kubernetes native via CSI driver",
      "Immutable audit trail with cryptographic proof",
      "SOC 2 Type II, ISO 27001, PCI-DSS compliance",
      "FIPS 140-2 Level 3 HSM integration",
    ],
    useCases: [
      "Enterprise DevSecOps pipelines",
      "Financial services credential governance",
      "Healthcare PHI protection",
      "Multi-cloud secret synchronisation",
    ],
    links: ["https://vault.bf-q.com"],
    gradient: "from-red-900 to-red-700",
    iconColor: "text-red-400",
    createdAt: new Date("2024-04-01"),
  },
  {
    id: "static-5",
    title: "Coretex Studio",
    slug: "coretex-studio",
    category: "AI Platform",
    summary:
      "Coretex Studio is an advanced AI-driven digital studio platform designed for creative professionals, developers, and enterprises to build, design, and deploy visual, media, and software solutions seamlessly.",
    description:
      "Coretex Studio is a next-generation intelligent studio ecosystem that combines generative AI, interactive development tools, digital content creation systems, and automation frameworks into a unified creative environment. It empowers startups, developers, creative agencies, enterprises, and content creators to ship faster and smarter.",
    features: [
      "AI-powered visual content generation",
      "Brand identity & digital media creation",
      "UI/UX design and interactive prototyping",
      "API & backend workflow simulation tools",
      "Automated marketing content generation",
      "Developer sandbox & endpoint explorer",
      "AI-assisted product mockups",
      "High-performance cloud deployment integration",
    ],
    useCases: [
      "Creative agencies building branded digital experiences",
      "Developers prototyping AI-powered applications",
      "Enterprises automating marketing content pipelines",
      "Startups deploying scalable software ecosystems",
    ],
    links: [],
    gradient: "from-violet-700 to-indigo-600",
    iconColor: "text-violet-400",
    createdAt: new Date("2025-01-10"),
  },
];

export const staticProjects = [
  {
    id: "static-p1",
    title: "QuantumMind Neural Engine",
    slug: "quantummind-neural-engine",
    status: "NOW" as const,
    summary:
      "A next-generation neural processing engine leveraging quantum-classical hybrid architectures for real-time AI inference at unprecedented speeds.",
    tags: ["quantum-computing", "neural-networks", "AI", "inference"],
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "static-p2",
    title: "SecureChain Identity Protocol",
    slug: "securechain-identity-protocol",
    status: "NEXT" as const,
    summary:
      "Decentralised identity management system built on blockchain, enabling self-sovereign identity with zero-knowledge proofs.",
    tags: ["blockchain", "identity", "ZKP", "Web3"],
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "static-p3",
    title: "BioSense AI Diagnostics",
    slug: "biosense-ai-diagnostics",
    status: "PIPELINE" as const,
    summary:
      "AI-powered biomedical diagnostic platform combining computer vision and federated learning for privacy-preserving medical analysis.",
    tags: ["healthcare", "computer-vision", "federated-learning", "AI"],
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "static-p4",
    title: "QuantumNLP Language Model",
    slug: "quantumnlp-language-model",
    status: "NOW" as const,
    summary:
      "A quantum-enhanced large language model pre-training framework that uses variational quantum circuits as attention-mechanism accelerators.",
    tags: ["NLP", "LLM", "quantum-computing", "transformers"],
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "static-p5",
    title: "EdgeAI Inference Runtime",
    slug: "edgeai-inference-runtime",
    status: "NEXT" as const,
    summary:
      "Ultra-lightweight inference runtime for deploying AI models on IoT edge devices with less than 512 KB of memory footprint.",
    tags: ["edge-AI", "IoT", "WASM", "TensorRT"],
    createdAt: new Date("2024-05-01"),
  },
  {
    id: "static-p6",
    title: "Federated Quantum Learning",
    slug: "federated-quantum-learning",
    status: "PIPELINE" as const,
    summary:
      "A federated learning framework where model gradient aggregation leverages quantum annealing for optimal convergence guarantees.",
    tags: ["federated-learning", "quantum-annealing", "privacy", "AI"],
    createdAt: new Date("2024-06-01"),
  },
  {
    id: "static-p7",
    title: "Coretex Studio",
    slug: "coretex-studio",
    status: "NOW" as const,
    summary:
      "Coretex Studio is an advanced AI-driven digital studio platform designed for creative professionals, developers, and enterprises to build, design, and deploy visual, media, and software solutions seamlessly.",
    tags: ["AI", "Creative", "Developer Platform"],
    createdAt: new Date("2025-01-10"),
  },
];

export const staticPosts = [
  {
    id: "static-r1",
    title: "Quantum-Classical Hybrid Architectures: The Next Frontier",
    slug: "quantum-classical-hybrid-architectures",
    type: "RESEARCH" as const,
    content: `## Abstract

Quantum-classical hybrid architectures represent a paradigm shift in computational design, blending the deterministic power of classical processors with the probabilistic advantages of quantum circuits.

## Introduction

As quantum hardware matures beyond the NISQ era, integrating quantum processing units (QPUs) with classical CPUs and GPUs presents unique engineering challenges and extraordinary opportunities. BrainFuel Quantum AI Labs has been at the forefront of this research, developing novel middleware layers that abstract QPU complexity from application developers.

## Key Findings

Our research demonstrates that hybrid architectures can achieve **10–100× speedups** for specific problem classes including:

- Portfolio optimisation
- Drug-discovery molecular simulation
- Cryptographic key generation
- Large-scale machine-learning gradient computation

## Methodology

We benchmarked four QPU providers (IBM Quantum, IonQ, Rigetti, QuEra) using a standardised set of 12 combinatorial optimisation problems. Classical baselines used state-of-the-art heuristics on 256-core CPU clusters.

## Results

| Problem Class | Classical Baseline | BF-Q Hybrid | Speedup |
|---|---|---|---|
| Portfolio Opt. (500 assets) | 42 min | 28 s | 90× |
| Molecular Sim. (C₆₀) | 18 h | 11 min | 98× |
| ML Gradient (1B params) | 6 h | 22 min | 16× |

## Conclusion

The quantum advantage is not monolithic—it emerges in carefully selected computational kernels. Our hybrid framework enables developers to seamlessly offload these kernels to QPUs while maintaining classical control flow.`,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "static-r2",
    title: "BrainFuel Quantum AI Labs Secures Seed Funding",
    slug: "brainfuel-secures-seed-funding",
    type: "NEWS" as const,
    content: `BrainFuel Quantum AI Labs, headquartered in Navi Mumbai, India, has secured seed funding to accelerate development of its quantum-AI product suite.

The funding will be directed toward expanding the engineering team, accelerating R&D on the QuantumMind Neural Engine, and establishing strategic partnerships with leading research institutions across Asia and Europe.

**Founder Mohsin Agwan commented:** "This investment validates our vision of democratising quantum AI capabilities for enterprises worldwide. We are building the infrastructure layer that will power the next generation of intelligent systems."

The company plans to launch its BF-Q Inference API in public beta within the next quarter, with the QuantumLedger SDK following shortly after.

## Use of Funds

- **40 %** — Engineering team expansion (quantum & AI engineers)
- **30 %** — R&D infrastructure (QPU cloud credits, GPU compute)
- **20 %** — Go-to-market and enterprise partnerships
- **10 %** — IP strategy and patent filings`,
    createdAt: new Date("2024-02-05"),
  },
  {
    id: "static-r3",
    title: "Introducing Zero-Knowledge Proofs for AI Model Verification",
    slug: "zk-proofs-ai-model-verification",
    type: "RESEARCH" as const,
    content: `## Overview

Zero-knowledge proofs (ZKPs) offer a compelling solution to a critical problem in enterprise AI: how can you verify that an AI model was trained correctly and on approved data without revealing the model weights or training data?

## The Problem

Enterprises deploying AI face a trilemma:
1. **Transparency** — Regulators demand auditability
2. **Privacy** — Training data may be sensitive or proprietary
3. **Security** — Model weights represent significant IP

## Our Approach

BF-Q Research has developed a ZK-SNARK-based framework for generating succinct proofs of correct model training. Our system can generate a proof for a ResNet-50 training run in under 4 hours on commodity hardware — orders of magnitude faster than prior art.

## System Architecture

The framework operates in three phases:

1. **Commit** — The trainer commits to the dataset Merkle root and model initialisation hash.
2. **Execute** — Training proceeds normally; gradients are recorded in a provable computation trace.
3. **Prove** — A ZK-SNARK proof is generated attesting that the final weights were derived from the committed dataset via the committed algorithm.

## Applications

- Regulatory compliance in financial services
- Healthcare AI certification (FDA 510(k) pathways)
- Federated learning integrity verification
- Supply chain AI auditing

## Performance

| Model | Proof Generation Time | Proof Size | Verification Time |
|---|---|---|---|
| ResNet-50 | 3.8 h | 1.2 KB | < 1 ms |
| BERT-Base | 9.2 h | 1.4 KB | < 1 ms |
| GPT-2 Small | 22.1 h | 1.6 KB | < 1 ms |`,
    createdAt: new Date("2024-03-12"),
  },
  {
    id: "static-r4",
    title: "Post-Quantum Cryptography Migration Guide for Enterprises",
    slug: "post-quantum-cryptography-migration",
    type: "UPDATE" as const,
    content: `## Why Migrate Now?

NIST finalised its first set of post-quantum cryptography (PQC) standards in August 2024. Enterprises that delay migration face a "harvest-now, decrypt-later" threat: adversaries are already recording encrypted traffic to decrypt once quantum computers reach sufficient scale.

## NIST PQC Standards at a Glance

| Standard | Type | Recommended For |
|---|---|---|
| CRYSTALS-Kyber (ML-KEM) | Key encapsulation | TLS key exchange, encrypted storage |
| CRYSTALS-Dilithium (ML-DSA) | Digital signatures | Code signing, authentication |
| SPHINCS+ (SLH-DSA) | Hash-based signatures | Long-lived certificates |
| FALCON | Digital signatures | Constrained environments |

## Migration Roadmap

### Phase 1 — Inventory (0–3 months)
Catalogue all cryptographic assets: certificates, key stores, TLS configurations, signing keys, and encrypted databases.

### Phase 2 — Hybrid Deployment (3–12 months)
Deploy hybrid classical/PQC schemes so existing clients remain compatible while new clients negotiate PQC algorithms.

### Phase 3 — PQC-First (12–24 months)
Retire classical-only cipher suites. Full PQC enforcement for all new systems.

## BF-Q SecureVault Integration

Our SecureVault Enterprise product automates steps 1–3 with automated inventory scanning, certificate lifecycle management, and policy enforcement. Contact us to begin your migration assessment.`,
    createdAt: new Date("2024-04-18"),
  },
  {
    id: "static-r5",
    title: "Federated Learning at Scale: Lessons from 10 000 Edge Nodes",
    slug: "federated-learning-at-scale",
    type: "RESEARCH" as const,
    content: `## Background

Federated learning (FL) enables model training across distributed data sources without centralising sensitive data. In collaboration with a healthcare consortium, BF-Q Labs deployed FL across 10 000 edge devices spanning 47 hospitals in 3 countries.

## Challenges Encountered

### Communication Bottlenecks
Naive FL aggregation requires O(N) communication rounds. We implemented our **QuantumAggregation** protocol, which uses quantum annealing to identify an optimal sparse gradient-sharing topology, reducing communication cost by 73 %.

### Non-IID Data Distribution
Hospital datasets are inherently non-independent and identically distributed (non-IID). Our personalised FL approach uses a meta-learning initialisation that adapts to local distributions within 5 fine-tuning steps.

### Privacy Guarantees
We applied differential privacy with ε = 0.5, δ = 10⁻⁵ — satisfying HIPAA requirements — with less than 2 % accuracy degradation vs. the centralised baseline.

## Results

- **Global model accuracy**: 94.2 % (vs. 95.1 % centralised)
- **Training time**: 6× faster than synchronous FL baselines
- **Privacy**: DP (ε = 0.5, δ = 10⁻⁵) certified
- **Communication savings**: 73 % reduction

## Open Source

The QuantumAggregation protocol is available in our open-source FL toolkit at github.com/bf-q/quantumagg.`,
    createdAt: new Date("2024-05-22"),
  },
];

export type StaticProduct = (typeof staticProducts)[number];
export type StaticProject = (typeof staticProjects)[number];
export type StaticPost = (typeof staticPosts)[number];
