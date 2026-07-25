import argparse
import json
import sys
from typing import Any, Dict, Optional

DEFAULT_WEIGHTS = {
    "encrypted": 20,
    "password_protected": 15,
    "has_expiry": 10,
    "private_access": 25,
    "classification": 15,
    "external_sharing": 10,
    "mfa_required": 3,
    "audit_logging_enabled": 2,
}

CLASSIFICATION_SCORES = {
    "public": 0,
    "internal": 10,
    "confidential": 15,
    "secret": 18,
}

RISK_LEVELS = [
    (80, "Secure"),
    (60, "Moderate Risk"),
    (40, "High Risk"),
    (0, "Critical Risk"),
]


def _get_risk_level(score: int) -> str:
    for threshold, label in RISK_LEVELS:
        if score >= threshold:
            return label
    return "Unknown"


def _build_recommendations(values: Dict[str, Any]) -> list[str]:
    recommendations = []

    if not values.get("encrypted"):
        recommendations.append("Enable encryption for the file.")
    if not values.get("password_protected"):
        recommendations.append("Require a password or access key.")
    if not values.get("has_expiry"):
        recommendations.append("Set an expiration date for shared access.")
    if values.get("publicly_accessible"):
        recommendations.append("Restrict public access and use private sharing.")

    classification = values.get("sensitive_data_classification", "internal")
    if CLASSIFICATION_SCORES.get(classification, 0) < 15:
        recommendations.append(
            "Assign a stronger data classification level for sensitive content."
        )
    if values.get("shared_with_external_users"):
        recommendations.append("Review and limit external sharing permissions.")
    if not values.get("mfa_required"):
        recommendations.append("Require multi-factor authentication for access.")
    if not values.get("audit_logging_enabled"):
        recommendations.append("Enable audit logging to track access and changes.")

    return recommendations


def calculate_security_score(
    encrypted: bool,
    password_protected: bool,
    has_expiry: bool,
    publicly_accessible: bool,
    sensitive_data_classification: str = "internal",
    shared_with_external_users: bool = False,
    mfa_required: bool = False,
    audit_logging_enabled: bool = False,
    weights: Optional[Dict[str, int]] = None,
) -> Dict[str, Any]:
    """Calculate a reusable security score and detailed risk result."""
    effective_weights = {**DEFAULT_WEIGHTS, **(weights or {})}
    classification = sensitive_data_classification.lower()
    classification_score = CLASSIFICATION_SCORES.get(classification, 0)

    breakdown = {
        "encrypted": effective_weights["encrypted"] if encrypted else 0,
        "password_protected": effective_weights["password_protected"] if password_protected else 0,
        "has_expiry": effective_weights["has_expiry"] if has_expiry else 0,
        "private_access": effective_weights["private_access"] if not publicly_accessible else 0,
        "classification": classification_score,
        "external_sharing": 0 if shared_with_external_users else effective_weights["external_sharing"],
        "mfa_required": effective_weights["mfa_required"] if mfa_required else 0,
        "audit_logging_enabled": effective_weights["audit_logging_enabled"] if audit_logging_enabled else 0,
    }

    score = min(sum(breakdown.values()), 100)
    risk_level = _get_risk_level(score)
    recommendations = _build_recommendations(
        {
            "encrypted": encrypted,
            "password_protected": password_protected,
            "has_expiry": has_expiry,
            "publicly_accessible": publicly_accessible,
            "sensitive_data_classification": classification,
            "shared_with_external_users": shared_with_external_users,
            "mfa_required": mfa_required,
            "audit_logging_enabled": audit_logging_enabled,
        }
    )

    return {
        "score": score,
        "risk_level": risk_level,
        "breakdown": breakdown,
        "recommendations": recommendations,
    }


def calculate_security_score_from_dict(file_info: Dict[str, Any], weights: Optional[Dict[str, int]] = None) -> Dict[str, Any]:
    """Create a score result from a dictionary of file attributes."""
    return calculate_security_score(
        encrypted=bool(file_info.get("encrypted", False)),
        password_protected=bool(file_info.get("password_protected", False)),
        has_expiry=bool(file_info.get("has_expiry", False)),
        publicly_accessible=bool(file_info.get("publicly_accessible", False)),
        sensitive_data_classification=str(file_info.get("sensitive_data_classification", "internal")),
        shared_with_external_users=bool(file_info.get("shared_with_external_users", False)),
        mfa_required=bool(file_info.get("mfa_required", False)),
        audit_logging_enabled=bool(file_info.get("audit_logging_enabled", False)),
        weights=weights,
    )


def _parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Score file security and return risk recommendations."
    )
    parser.add_argument("--json-file", dest="json_file", help="Path to a JSON file containing one or more file definitions.")
    parser.add_argument("--encrypted", action="store_true", help="Indicate the file is encrypted.")
    parser.add_argument("--password-protected", action="store_true", help="Indicate the file is password protected.")
    parser.add_argument("--expiry", action="store_true", help="Indicate the file has an expiry date.")
    parser.add_argument("--publicly-accessible", action="store_true", help="Indicate the file is publicly accessible.")
    parser.add_argument("--private-access", action="store_true", help="Indicate the file is private access only.")
    parser.add_argument("--classification", default="internal", choices=list(CLASSIFICATION_SCORES), help="Sensitive data classification.")
    parser.add_argument("--external-shared", action="store_true", help="Indicate the file is shared with external users.")
    parser.add_argument("--mfa-required", action="store_true", help="Indicate multi-factor authentication is required to access the file.")
    parser.add_argument("--audit-logging-enabled", action="store_true", help="Indicate audit logging is enabled.")
    parser.add_argument("--output-json", action="store_true", help="Print results as JSON.")
    return parser.parse_args()


def _load_json_file(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def _print_result(name: str, result: Dict[str, Any], output_json: bool = False) -> None:
    if output_json:
        print(json.dumps({"name": name, **result}, indent=2))
        return

    print(f"{name:<28} Score: {result['score']:>3}/100   Risk: {result['risk_level']}")
    print(f"   breakdown: {result['breakdown']}")
    if result["recommendations"]:
        print("   recommendations:")
        for recommendation in result["recommendations"]:
            print(f"     - {recommendation}")
    print()


def main() -> int:
    args = _parse_arguments()
    results: list[tuple[str, Dict[str, Any]]] = []

    if args.json_file:
        payload = _load_json_file(str(args.json_file))
        if isinstance(payload, dict):
            payload = [payload]
        if not isinstance(payload, list):
            raise ValueError("JSON file must contain an object or an array of objects.")

        for item in payload:
            name = str(item.get("name", "unnamed"))
            result = calculate_security_score_from_dict(item)
            results.append((name, result))
    else:
        publicly_accessible = args.publicly_accessible or not args.private_access
        result = calculate_security_score(
            encrypted=args.encrypted,
            password_protected=args.password_protected,
            has_expiry=args.expiry,
            publicly_accessible=publicly_accessible,
            sensitive_data_classification=args.classification,
            shared_with_external_users=args.external_shared,
            mfa_required=args.mfa_required,
            audit_logging_enabled=args.audit_logging_enabled,
        )
        results.append(("input", result))

    for name, result in results:
        _print_result(name, result, args.output_json)

    return 0


SAMPLE_FILES = [
    {
        "name": "salary_report.pdf",
        "encrypted": True,
        "password_protected": True,
        "has_expiry": True,
        "publicly_accessible": False,
        "sensitive_data_classification": "confidential",
        "shared_with_external_users": False,
        "mfa_required": True,
        "audit_logging_enabled": True,
    },
    {
        "name": "team_photo.jpg",
        "encrypted": False,
        "password_protected": False,
        "has_expiry": False,
        "publicly_accessible": True,
        "sensitive_data_classification": "public",
        "shared_with_external_users": False,
        "mfa_required": False,
        "audit_logging_enabled": False,
    },
    {
        "name": "client_contract.docx",
        "encrypted": True,
        "password_protected": True,
        "has_expiry": False,
        "publicly_accessible": True,
        "sensitive_data_classification": "confidential",
        "shared_with_external_users": True,
        "mfa_required": False,
        "audit_logging_enabled": False,
    },
    {
        "name": "meeting_notes.txt",
        "encrypted": False,
        "password_protected": False,
        "has_expiry": False,
        "publicly_accessible": False,
        "sensitive_data_classification": "internal",
        "shared_with_external_users": False,
        "mfa_required": False,
        "audit_logging_enabled": False,
    },
]


if __name__ == "__main__":
    sys.exit(main())
