import json

import streamlit as st
from security_scoring.core import (
    CLASSIFICATION_SCORES,
    calculate_security_score,
    calculate_security_score_from_dict,
)

st.set_page_config(page_title="Security Scoring Demo", layout="wide")

st.title("Security Scoring Demo")
st.write("Use this UI to see how your file security score is calculated and what recommendations are generated.")

with st.sidebar:
    st.header("File attributes")
    encrypted = st.checkbox("Encrypted", value=False)
    password_protected = st.checkbox("Password protected", value=False)
    has_expiry = st.checkbox("Has expiry date", value=False)
    publicly_accessible = st.checkbox("Publicly accessible", value=False)
    shared_with_external_users = st.checkbox("Shared with external users", value=False)
    mfa_required = st.checkbox("MFA required", value=False)
    audit_logging_enabled = st.checkbox("Audit logging enabled", value=False)
    classification = st.selectbox(
        "Sensitive data classification",
        list(CLASSIFICATION_SCORES.keys()),
        index=list(CLASSIFICATION_SCORES.keys()).index("internal"),
    )

st.sidebar.markdown("---")
if st.sidebar.button("Use sample file"):
    st.session_state.update(
        {
            "encrypted": True,
            "password_protected": True,
            "has_expiry": True,
            "publicly_accessible": False,
            "shared_with_external_users": False,
            "mfa_required": True,
            "audit_logging_enabled": True,
            "classification": "confidential",
        }
    )

file_info = {
    "encrypted": encrypted,
    "password_protected": password_protected,
    "has_expiry": has_expiry,
    "publicly_accessible": publicly_accessible,
    "sensitive_data_classification": classification,
    "shared_with_external_users": shared_with_external_users,
    "mfa_required": mfa_required,
    "audit_logging_enabled": audit_logging_enabled,
}

result = calculate_security_score_from_dict(file_info)

col1, col2 = st.columns([2, 3])
with col1:
    st.metric("Security Score", f"{result['score']}/100", delta=None)
    st.markdown(f"**Risk level:** {result['risk_level']}")
    st.markdown("### Recommendations")
    if result["recommendations"]:
        for item in result["recommendations"]:
            st.write(f"- {item}")
    else:
        st.write("No recommendations — this appears secure.")

with col2:
    st.markdown("### Score breakdown")
    st.json(result["breakdown"])

st.markdown("---")
st.markdown("### Current input data")
st.code(json.dumps(file_info, indent=2))
