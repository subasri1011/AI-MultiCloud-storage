import hashlib
from collections import defaultdict
from difflib import SequenceMatcher
from itertools import combinations

import streamlit as st
from PIL import Image
import imagehash

st.set_page_config(page_title="Duplicate Detector", page_icon="🗂️")

st.title("🗂️ Multi-Cloud Duplicate File Detector")
st.write("AI + Security module — Exact + near-duplicate detection")

IMAGE_TEXT_PREFIX = "image/"
TEXT_EXTENSIONS = {".txt", ".md", ".csv", ".log", ".json"}


def is_text_file(filename: str) -> bool:
    return any(filename.lower().endswith(ext) for ext in TEXT_EXTENSIONS)


def compute_sha256(file) -> str:
    """Exact-match hash — byte-for-byte identical files only."""
    sha256 = hashlib.sha256()
    file.seek(0)
    for chunk in iter(lambda: file.read(8192), b""):
        sha256.update(chunk)
    file.seek(0)
    return sha256.hexdigest()


def compute_image_phash(file):
    """Perceptual hash — stays similar even if the image is resized or recompressed."""
    file.seek(0)
    img_hash = imagehash.phash(Image.open(file))
    file.seek(0)
    return img_hash


def read_text(file) -> str:
    """Decode an uploaded text file to a string for similarity comparison."""
    file.seek(0)
    content = file.read()
    file.seek(0)
    return content.decode("utf-8", errors="ignore")


uploaded_files = st.file_uploader(
    "Upload files to check for duplicates",
    accept_multiple_files=True
)

if uploaded_files:
    st.subheader(f"📁 {len(uploaded_files)} file(s) uploaded")

    # --- Exact duplicates (SHA-256) ---
    hash_to_files = defaultdict(list)
    for file in uploaded_files:
        file_hash = compute_sha256(file)
        hash_to_files[file_hash].append(file.name)

    exact_duplicate_groups = {h: names for h, names in hash_to_files.items() if len(names) > 1}
    exact_dup_names = {name for names in exact_duplicate_groups.values() for name in names}

    if exact_duplicate_groups:
        st.error(f"🚨 Found {len(exact_duplicate_groups)} exact duplicate group(s)!")
        for file_hash, names in exact_duplicate_groups.items():
            st.write(f"**Exact duplicate set** — hash `{file_hash[:16]}...`")
            for name in names:
                st.write(f"　• {name}")
    else:
        st.success("✅ No exact duplicates found.")

    with st.expander("See all file hashes"):
        for file_hash, names in hash_to_files.items():
            for name in names:
                st.write(f"**{name}** → `{file_hash}`")

    # --- Near-duplicate images (perceptual hashing) ---
    image_files = [f for f in uploaded_files if f.type and f.type.startswith(IMAGE_TEXT_PREFIX)]

    if len(image_files) >= 2:
        st.subheader("🖼️ Near-Duplicate Image Detection")
        image_threshold = st.slider(
            "Image similarity sensitivity (lower = stricter match)",
            min_value=0, max_value=20, value=10, key="image_threshold"
        )

        image_hashes = {}
        for file in image_files:
            try:
                image_hashes[file.name] = compute_image_phash(file)
            except Exception:
                pass  # unreadable image, skip

        near_dup_images = []
        for name_a, name_b in combinations(image_hashes.keys(), 2):
            if name_a in exact_dup_names and name_b in exact_dup_names:
                continue  # already reported above
            distance = image_hashes[name_a] - image_hashes[name_b]
            if distance <= image_threshold:
                near_dup_images.append((name_a, name_b, int(distance)))

        if near_dup_images:
            for name_a, name_b, distance in near_dup_images:
                similarity_pct = round((1 - distance / 64) * 100, 1)
                st.warning(
                    f"🔍 **{name_a}** ↔ **{name_b}** — {similarity_pct}% visually similar "
                    f"(distance: {distance})"
                )
        else:
            st.success("No visually similar image pairs found.")

    # --- Near-duplicate text/documents (similarity scoring) ---
    text_files = [f for f in uploaded_files if is_text_file(f.name)]

    if len(text_files) >= 2:
        st.subheader("📄 Near-Duplicate Text Detection")
        text_threshold = st.slider(
            "Text similarity threshold (%)",
            min_value=50, max_value=100, value=80, key="text_threshold"
        )

        text_contents = {f.name: read_text(f) for f in text_files}

        near_dup_text = []
        for name_a, name_b in combinations(text_contents.keys(), 2):
            if name_a in exact_dup_names and name_b in exact_dup_names:
                continue  # already reported above
            ratio = SequenceMatcher(None, text_contents[name_a], text_contents[name_b]).ratio()
            similarity_pct = round(ratio * 100, 1)
            if similarity_pct >= text_threshold:
                near_dup_text.append((name_a, name_b, similarity_pct))

        if near_dup_text:
            for name_a, name_b, similarity_pct in near_dup_text:
                st.warning(f"📝 **{name_a}** ↔ **{name_b}** — {similarity_pct}% text similarity")
        else:
            st.success("No similar text documents found.")
else:
    st.info("Upload one or more files above to get started.")