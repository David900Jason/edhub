# 🤝 Contributing Guide

Welcome! This document explains the rules and structure for contributing to this full-stack project.

---

## 📦 Project Structure

- `app/` – Next.js routes and pages
- `components/` – Reusable UI components
- `lib/` – Utilities, API wrappers, helper functions
- `styles/` – Global styles and Tailwind config
- `public/` – Static assets
- `.env.local` – Local env variables (DO NOT COMMIT)
- `.env.example` – Template for required env vars

---

## 🌱 Branching Strategy

- `main` – Stable production code
- `dev` – Active development branch
- `feature/xyz` – New features
- `bugfix/xyz` – Bug fixes
- `hotfix/xyz` – Critical patches

### ✅ Branch Naming

\`\`\`bash
# Examples
feature/user-auth
bugfix/login-error
hotfix/urgent-patch
\`\`\`

---

## 🛁 Pull Requests

- Always PR **into** \`dev\`, never directly into \`main\`
- Title your PR clearly: \`feat: add auth\`, \`fix: navbar issue\`, etc.
- Describe:
  - What the PR does
  - Any breaking changes
  - How to test

---

## 💬 Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
feat: add sign-in page
fix: correct email validation
refactor: clean up auth logic
docs: update setup instructions
\`\`\`

---

## 🧪 Testing

- Test your code locally before pushing.
- Include unit tests if applicable.
- Run:
  \`\`\`bash
  npm run lint && npm run test
  \`\`\`

---

## 🔐 Environment Variables

- Never commit \`.env.local\`
- Instead, update \`.env.example\` if new env keys are added

\`\`\`env
# .env.example
NEXT_PUBLIC_API_URL=
AUTH_SECRET_KEY=
\`\`\`

---

## 📚 Documentation

- Update \`README.md\` with major feature/setup changes
- Major releases or updates should be added to \`CHANGELOG.md\`
- Add detailed setup/API notes in a \`docs/\` folder if needed

---

## ✅ Contribution Checklist

Before pushing:

-

---

Thanks for helping make this project better! 🚀
