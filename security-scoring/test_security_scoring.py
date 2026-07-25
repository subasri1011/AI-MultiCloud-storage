import unittest

from security_scoring import (
    CLASSIFICATION_SCORES,
    calculate_security_score,
    calculate_security_score_from_dict,
    _get_risk_level,
)


class TestSecurityScoring(unittest.TestCase):
    def test_secure_score(self):
        result = calculate_security_score(
            encrypted=True,
            password_protected=True,
            has_expiry=True,
            publicly_accessible=False,
            sensitive_data_classification="secret",
            shared_with_external_users=False,
            mfa_required=True,
            audit_logging_enabled=True,
        )

        self.assertEqual(result["risk_level"], "Secure")
        self.assertEqual(result["score"], 100)
        self.assertIn("encrypted", result["breakdown"])
        self.assertEqual(len(result["recommendations"]), 0)

    def test_high_risk_score(self):
        result = calculate_security_score(
            encrypted=False,
            password_protected=False,
            has_expiry=False,
            publicly_accessible=True,
            sensitive_data_classification="confidential",
            shared_with_external_users=True,
            mfa_required=False,
            audit_logging_enabled=False,
        )

        self.assertEqual(result["risk_level"], "Critical Risk")
        self.assertLess(result["score"], 40)
        self.assertTrue(any("Enable encryption" in item for item in result["recommendations"]))

    def test_calculate_from_dict(self):
        payload = {
            "encrypted": True,
            "password_protected": False,
            "has_expiry": True,
            "publicly_accessible": False,
            "sensitive_data_classification": "internal",
            "shared_with_external_users": True,
            "mfa_required": False,
            "audit_logging_enabled": True,
        }

        result = calculate_security_score_from_dict(payload)
        self.assertEqual(result["breakdown"]["encrypted"], 20)
        self.assertEqual(result["breakdown"]["private_access"], 25)
        self.assertEqual(result["risk_level"], "Moderate Risk")

    def test_get_risk_level_thresholds(self):
        self.assertEqual(_get_risk_level(85), "Secure")
        self.assertEqual(_get_risk_level(70), "Moderate Risk")
        self.assertEqual(_get_risk_level(45), "High Risk")
        self.assertEqual(_get_risk_level(20), "Critical Risk")

    def test_classification_mapping(self):
        self.assertEqual(CLASSIFICATION_SCORES["public"], 0)
        self.assertEqual(CLASSIFICATION_SCORES["secret"], 18)


if __name__ == "__main__":
    unittest.main()
