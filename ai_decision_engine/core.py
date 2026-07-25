import json
from pathlib import Path
from typing import Any, Dict, List, Optional

QuotaProvider = Dict[str, Any]
FileInfo = Dict[str, Any]


def load_mock_quota(path: Optional[str] = None) -> List[QuotaProvider]:
    if path is None:
        path = Path(__file__).with_name("mock_quota.json")
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)
    return payload.get("providers", [])


def _normalize_file_type(file_type: str) -> str:
    return str(file_type or "").strip().lower()


def _provider_supports_type(file_type: str, provider: QuotaProvider) -> bool:
    supported = [str(t).strip().lower() for t in provider.get("supported_types", [])]
    return "*" in supported or file_type in supported


def _provider_has_capacity(file_size_mb: float, provider: QuotaProvider) -> bool:
    free_space = provider.get("free_space_mb", 0)
    max_file_size = provider.get("max_file_size_mb", 0)
    return free_space >= file_size_mb and max_file_size >= file_size_mb


def _score_provider(file_info: FileInfo, provider: QuotaProvider) -> int:
    file_size_mb = float(file_info.get("size_mb", 0))
    free_space = float(provider.get("free_space_mb", 0))
    max_file_size = float(provider.get("max_file_size_mb", 0))
    file_type = _normalize_file_type(file_info.get("type", ""))

    score = 0
    if _provider_supports_type(file_type, provider):
        score += 30
    free_ratio = min(max((free_space - file_size_mb) / max(free_space, 1), 0), 1)
    score += int(free_ratio * 40)
    if max_file_size > file_size_mb:
        size_ratio = file_size_mb / max(max_file_size, 1)
        score += int((1 - size_ratio) * 20)
    if provider.get("preferred"):
        score += 10
    if provider.get("provider_id") == file_info.get("preferred_provider"):
        score += 5
    return score


def find_best_provider(file_info: FileInfo, providers: List[QuotaProvider]) -> Dict[str, Any]:
    normalized_type = _normalize_file_type(file_info.get("type", ""))
    file_size_mb = float(file_info.get("size_mb", 0))

    candidates: List[Dict[str, Any]] = []
    for provider in providers:
        eligible = _provider_supports_type(normalized_type, provider) and _provider_has_capacity(file_size_mb, provider)
        candidate = {
            "provider_id": provider.get("provider_id"),
            "display_name": provider.get("display_name"),
            "eligible": eligible,
            "free_space_mb": provider.get("free_space_mb"),
            "max_file_size_mb": provider.get("max_file_size_mb"),
            "score": _score_provider(file_info, provider) if eligible else 0,
            "reason": None,
        }
        if not eligible:
            if not _provider_supports_type(normalized_type, provider):
                candidate["reason"] = f"Unsupported file type '{normalized_type}'."
            elif not _provider_has_capacity(file_size_mb, provider):
                candidate["reason"] = "Insufficient space or max file size exceeded."
        candidates.append(candidate)

    eligible_providers = [c for c in candidates if c["eligible"]]
    if not eligible_providers:
        return {
            "selected_provider": None,
            "selected_reason": "No eligible provider found.",
            "candidates": candidates,
        }

    selected = max(eligible_providers, key=lambda candidate: candidate["score"])
    return {
        "selected_provider": selected["provider_id"],
        "selected_display_name": selected["display_name"],
        "selected_score": selected["score"],
        "selected_reason": "Best fit based on capacity, file type, and provider preferences.",
        "candidates": sorted(eligible_providers, key=lambda candidate: candidate["score"], reverse=True),
    }


def route_file_to_cloud(file_info: FileInfo, providers: List[QuotaProvider]) -> Dict[str, Any]:
    return {
        "file": {
            "name": file_info.get("name"),
            "type": file_info.get("type"),
            "size_mb": file_info.get("size_mb"),
        },
        "decision": find_best_provider(file_info, providers),
    }
