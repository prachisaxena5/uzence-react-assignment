# 🚀 Component Assignment: InputField & DataTable
This repository contains the solution for the component development assignment, focusing on building two production-ready, flexible UI components: InputField and DataTable.

The project is built using React with TypeScript and styled using Tailwind CSS, adhering to modern component patterns, responsiveness, and accessibility best practices.

# ✅ Deliverables Summary

### 📝 InputField Component
- Flexible input with variants (filled, outlined, ghost) and sizes (sm, md, lg).
- Supports disabled, readOnly, and invalid states.
- Includes optional password toggle and a clear button feature.

### 📊 DataTable Component
- Supports tabular data display with TypeScript Generics (<T>).
- Includes robust column sorting functionality.
- Supports row selection (single/multiple).
- Handles Loading and Empty states for optimal UX.

# 🌐 General
-  TypeScript for strict typing throughout the codebase.
-  Responsive Design using Tailwind utility classes.
-  Basic Documentation provided via Storybook.
-  Simple Demo included in App.tsx.

---

# 🛠 Tech Stack
## ⚛️ React (Functional Components & Hooks)
- ⚡ Vite (Build Tooling)
- 🎨 Tailwind CSS (Utility-First Styling)
- 🤖 TypeScript (Strict Type Checking)

## Setup
Run the demo app: npm run dev

# 📂 Project Structure

```bash
├── src/
│   ├── components/
│   │   ├── DataTable/          # Generic Table component logic
│   │   ├── InputField/         # Input component logic
│   │   └── utils/              # Shared icons and utilities (Icons.tsx)
│   ├── types/                  # All TypeScript interface definitions (index.ts)
│   ├── App.tsx                 # Main demo application
│   └── main.tsx                # Application entry point
├── stories/
│   ├── DataTable.stories.tsx   # DataTable documentation
│   └── InputField.stories.tsx  # InputField documentation
├── tailwind.config.ts          # Tailwind configuration
└── postcss.config.ts           # PostCSS setup
```
