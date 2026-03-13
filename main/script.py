import streamlit as st
import time
import pandas as pd

st.set_page_config(page_title="Play Tagging System", layout="wide")

TAG_CATEGORIES = {
    "pass": "Pass Play",
    "run": "Run Play",
    "touchdown": "Touchdown",
    "turnover": "Turnover",
    "defensive_stop": "Defensive Stop"
}

# Initialize session state
if "tags" not in st.session_state:
    st.session_state.tags = []

if "current_time" not in st.session_state:
    st.session_state.current_time = 0.0

st.title("🏈 Play Tagging System")

# Upload video
video_file = st.file_uploader("Upload Game Film", type=["mp4", "mov", "avi"])

if video_file:
    st.video(video_file)

    st.divider()

    st.subheader("Quick Tag Plays")

    # Manual timestamp input
    current_time = st.number_input(
        "Current Video Time (seconds)",
        min_value=0.0,
        step=0.5,
        value=st.session_state.current_time
    )

    st.session_state.current_time = current_time

    cols = st.columns(len(TAG_CATEGORIES))

    # Tag buttons
    for i, (key, label) in enumerate(TAG_CATEGORIES.items()):
        if cols[i].button(label):

            new_tag = {
                "id": int(time.time() * 1000),
                "timestamp": current_time,
                "category": key,
                "label": label
            }

            st.session_state.tags.append(new_tag)

    st.divider()

    st.subheader(f"Tagged Plays ({len(st.session_state.tags)})")

    if len(st.session_state.tags) == 0:
        st.info("No plays tagged yet.")
    else:
        for i, tag in enumerate(st.session_state.tags):

            cols = st.columns([2, 2, 1])

            cols[0].write(f"⏱ {tag['timestamp']:.1f}s")
            cols[1].write(tag["label"])

            if cols[2].button("Delete", key=tag["id"]):
                st.session_state.tags.pop(i)
                st.rerun()

        st.divider()

        # Export tags
        df = pd.DataFrame(st.session_state.tags)

        st.download_button(
            "Download Tags CSV",
            df.to_csv(index=False),
            "play_tags.csv"
        )