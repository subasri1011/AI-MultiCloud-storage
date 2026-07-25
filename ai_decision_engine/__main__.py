import json
import sys

from .core import load_mock_quota, route_file_to_cloud


def main() -> int:
    providers = load_mock_quota()
    sample_file = {
        "name": "quarterly_report.pdf",
        "type": "pdf",
        "size_mb": 180,
        "preferred_provider": "google_drive",
    }

    decision = route_file_to_cloud(sample_file, providers)
    print(json.dumps(decision, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
