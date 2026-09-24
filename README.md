## 📌 Overview

ShopAgent is an AI-powered **agentic commerce platform** built with the MERN stack.

Unlike a traditional e-commerce application where users manually search, filter, and select products, ShopAgent uses an **AI shopping agent** to understand the user's intent and assist throughout the shopping journey.

The agent can understand natural-language shopping requirements, discover relevant products, provide explainable recommendations, assist with cart-related actions, and guide users toward checkout.

The platform combines:

- 🤖 **Agentic AI for conversational commerce**
- 🔎 AI-assisted product discovery
- 💡 Explainable product recommendations
- 🛒 Agent-assisted cart actions
- 💳 Razorpay payment integration
- 🔐 Authentication and authorization
- 🧾 Order management
- 👨‍💼 Merchant and customer roles
- 🐳 Docker-based deployment
- ☁️ AWS EC2 deployment

### 🤖 Agentic AI Shopping Assistant

ShopAgent uses an AI agent to act as a conversational shopping assistant rather than simply generating text responses.

The agent is designed to:

- Understand natural-language shopping requirements
- Identify user preferences such as budget, category, and product requirements
- Discover relevant products from the available product data
- Recommend products based on the user's requirements
- Explain why a recommended product matches the user's needs
- Assist users with shopping-related actions such as cart operations
- Guide the user through the shopping journey toward checkout

Example:

> "I need a laptop under ₹60,000 for coding and development."

The agent interprets the user's intent and helps identify suitable products instead of requiring the user to manually search through the entire catalog.

                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                    Natural Language Request
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Tailwind     │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express / Node.js  │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Agentic AI       │
                    │  Shopping Agent     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌───────────┐    ┌─────────────┐   ┌────────────┐
       │  Product  │    │    Cart     │   │ Razorpay   │
       │   Data    │    │   Actions   │   │  Payments  │
       └─────┬─────┘    └─────────────┘   └────────────┘
             │
             ▼
       ┌────────────┐
       │  MongoDB   │
       │   Atlas    │
       └────────────┘
