# Security policy

## Report a vulnerability

Do not open a public issue for a vulnerability, exposed credential, malicious instruction, unsafe installer behavior, or supply-chain concern. Use GitHub's private vulnerability reporting for this repository.

Include the affected skill or file, impact, reproduction steps, and any suggested containment. Do not include real secrets or personal data.

## Scope

Security reports may cover:

- prompt injection or instructions that exceed a skill's stated authority;
- unsafe shell, network, authentication, or destructive-operation guidance;
- executable content that runs during installation;
- path traversal or archive extraction risks in Mémoire packaging;
- missing or false provenance and license metadata;
- leaked credentials or sensitive data.

## Distribution posture

Skill folders are intended to be inspectable, passive content. Installation must not execute arbitrary scripts from a downloaded skill archive. Runtime actions still depend on the agent harness and must respect its approvals, sandbox, and user authority.
