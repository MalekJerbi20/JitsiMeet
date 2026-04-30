import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { STORE_SUBTITLE } from "../subtitles/actionTypes"; 
import { dark } from "@mui/material/styles/createPalette";

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = new WebSocket("wss://localhost:5000/stt/test_123");
   socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  console.log("RAW:", event.data);
  console.log("PARSED:", msg);

  if (msg.type === "final") {
    // captions only
    dispatch({
      type: STORE_SUBTITLE,
      subtitle: {
        id: Date.now().toString(),
        participantId: msg.participant_id,
        text: msg.text,
        language: "de",
        timestamp: Date.now(),
        audio_paths: {},          // empty for now
        translations: {}          // empty for now
      }
    });
  } else if (msg.type === "translation_bundle") {
    // enrich with audio + translations
    dispatch({
      type: STORE_SUBTITLE,
      subtitle: {
        id: Date.now().toString(),
        participantId: msg.participant_id,
        text: msg.text,
        language: "de",
        timestamp: Date.now(),
        audio_paths: msg.audio_paths,
        translations: msg.translations
      }
    });
  }
};

    return () => {
      socket.close();
    };
  }, [dispatch]);
  return <>{children}</>;
}