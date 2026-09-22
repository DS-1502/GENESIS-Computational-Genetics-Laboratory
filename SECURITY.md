# Security Policy

## Supported Version

The active development line is the latest repository release.

## Scope

GENESIS v0.3 is a static browser prototype with local experiment persistence. It does not process personal genomic uploads and does not contain server credentials.

## Reporting

Please report suspected security issues privately to the project maintainer rather than publishing exploit details in a public issue.

Do **not** include personal genomic information, medical information, credentials, or other sensitive data in reports.

## Security Principles

- Do not commit secrets or API keys.
- Do not introduce personal genomic-data collection without a reviewed privacy architecture.
- Keep dynamic content escaped.
- Avoid `eval()` and dynamic code execution.
- Validate external or imported sequence data before processing.
- Bound computationally expensive operations.
- Record provenance for externally sourced biological data.
