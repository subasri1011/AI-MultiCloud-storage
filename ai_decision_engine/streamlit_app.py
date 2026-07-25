import json
import sys
from pathlib import Path

import streamlit as st

sys.path.insert(0, str(Path(__file__).resolve().parent))
from core import load_mock_quota, route_file_to_cloud

st.set_page_config(page_title="AI Decision Engine", layout="wide")

st.title("AI Decision Engine — Mock Cloud Routing")
st.write(
    "This demo shows how the engine chooses the best cloud provider for a file using mock quota data."
)

providers = load_mock_quota(Path(__file__).with_name("mock_quota.json"))
provider_ids = [provider["provider_id"] for provider in providers]

with st.sidebar:
    st.header("Input file metadata")
    file_name = st.text_input("File name", "quarterly_report.pdf")
    file_type = st.selectbox(
        "File type",
        ["pdf", "docx", "xlsx", "pptx", "jpg", "png", "mp4", "txt"],
        index=0,
    )
    file_size_mb = st.number_input("File size (MB)", min_value=0.1, value=180.0, step=0.1)
    preferred_provider = st.selectbox(
        "Preferred provider (optional)", ["none"] + provider_ids,
        index=0,
    )
    st.markdown("---")
    st.markdown("### Mock cloud quota providers")
    for provider in providers:
        st.write(f"**{provider['display_name']}** — free: {provider['free_space_mb']} MB, max file: {provider['max_file_size_mb']} MB")
        st.write(f"Supported types: {', '.join(provider['supported_types'])}")

if preferred_provider == "none":
    preferred_provider = None

file_info = {
    "name": file_name,
    "type": file_type,
    "size_mb": float(file_size_mb),
    "preferred_provider": preferred_provider,
}

decision = route_file_to_cloud(file_info, providers)

st.subheader("Routing decision")
selected = decision.get("decision", {})
if selected.get("selected_provider") is None:
    st.error("No eligible provider found for this file.")
    st.write(selected.get("selected_reason"))
else:
    st.success(
        f"Selected provider: {selected['selected_display_name']} ({selected['selected_provider']})"
    )
    st.write(f"Score: {selected['selected_score']}")
    st.write(selected["selected_reason"])

st.markdown("---")
st.subheader("Eligible provider candidates")
if selected.get("candidates"):
    st.dataframe(
        [
            {
                "provider_id": c["provider_id"],
                "display_name": c["display_name"],
                "eligible": c["eligible"],
                "score": c["score"],
                "reason": c["reason"],
                "free_space_mb": c["free_space_mb"],
                "max_file_size_mb": c["max_file_size_mb"],
            }
            for c in selected["candidates"]
        ],
        use_container_width=True,
    )
else:
    st.write("No candidate providers available.")

st.markdown("---")
st.subheader("File metadata JSON")
st.code(json.dumps(file_info, indent=2))

st.subheader("Decision payload JSON")
st.code(json.dumps(decision, indent=2))
