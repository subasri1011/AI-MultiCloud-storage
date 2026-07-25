# AI-Powered Multi-Cloud Storage Assistant

This workspace contains three independent modules for your team project:

1. `duplicate-detection`
2. `security-scoring`
3. `ai_decision_engine`

Each module is intended to run separately and demonstrate a different part of the overall solution.

---

## 1. Duplicate Detection

### What it does
- Detects exact duplicate files using SHA-256.
- Detects near-duplicate images using perceptual hashing.
- Detects similar text documents using string similarity.

### Where it lives
- Folder: `duplicate-detection/`
- Main file: `duplicate-detection/app.py`

### How to run
1. Open PowerShell in `c:\Users\jefli\ai-service\duplicate-detection`
2. Install dependencies if needed:
   ```powershell
   python -m pip install streamlit pillow imagehash
   ```
3. Start the UI:
   ```powershell
   streamlit run app.py
   ```
4. Open the browser URL shown by Streamlit.

### What the user sees
- File upload interface
- Exact duplicate results
- Near-duplicate image results
- Near-duplicate text similarity results

---

## 2. Security Scoring

### What it does
- Scores file security from 0-100.
- Uses encryption, password protection, expiry, access visibility, classification, external sharing, MFA, and audit logging.
- Returns a risk level and recommendations.

### Where it lives
- Folder: `security-scoring/`
- Python package: `security_scoring/`
- CLI runner: `python -m security_scoring`
- Streamlit demo: `security-scoring/streamlit_app.py`
- Unit tests: `security-scoring/test_security_scoring.py`

### How to run
1. Open PowerShell in `c:\Users\jefli\ai-service\security-scoring`
2. Install dependencies if needed:
   ```powershell
   python -m pip install streamlit
   ```
3. Run the CLI:
   ```powershell
   python -m security_scoring --help
   ```
4. Start the UI demo:
   ```powershell
   streamlit run streamlit_app.py
   ```

### What the user sees
- Score and risk level for a file
- Breakdown of scoring factors
- Recommendations to improve security
- Frontend form controls for file security attributes

### Backend contract
- The scoring logic is in `security_scoring/core.py`.
- Frontend can send file metadata to the backend.
- Backend returns JSON with `score`, `risk_level`, `breakdown`, and `recommendations`.

---

## 3. AI Decision Engine

### What it does
- Selects the best cloud provider for a file.
- Uses mock provider quota data.
- Considers file type, file size, provider free space, max file size, and provider preference.

### Where it lives
- Folder: `ai_decision_engine/`
- Core logic: `ai_decision_engine/core.py`
- Mock data: `ai_decision_engine/mock_quota.json`
- CLI runner: `python -m ai_decision_engine`
- Streamlit demo: `ai_decision_engine/streamlit_app.py`

### How to run
1. Open PowerShell in `c:\Users\jefli\ai-service\ai_decision_engine`
2. Install dependencies if needed:
   ```powershell
   python -m pip install streamlit
   ```
3. Run the CLI example:
   ```powershell
   python -m ai_decision_engine
   ```
4. Start the UI demo:
   ```powershell
   streamlit run streamlit_app.py
   ```

### What the user sees
- A form for file metadata: name, type, size, and preferred provider.
- A list of mock cloud providers and their quota details.
- The selected provider and score.
- Candidate providers and eligibility reasons.
- JSON payloads for the file and the decision result.

### Backend contract
- The frontend sends file metadata as JSON to the backend.
- Backend loads quota data from `mock_quota.json` today.
- When the real `/api/quota` endpoint is available, replace `load_mock_quota()` with the API call.
- The selection logic stays the same.

---

## Notes for the team
- These three modules are intentionally separate.
- The frontend can integrate with the backend by calling the backend scoring and routing functions.
- `duplicate-detection` is currently a Streamlit frontend.
- `security-scoring` and `ai_decision_engine` each have both CLI and demo UI layers.

## Recommended workflow
- You work on the backend logic and package behavior.
- One teammate can build the frontend UI and call your backend endpoints.
- Another teammate can integrate the cloud providers and quota API.

If you want, I can also add a short `README` inside each module folder with module-specific instructions.