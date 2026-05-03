import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { STORE_SUBTITLE } from "../subtitles/actionTypes"; 

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = new WebSocket("wss://meet.local:8443/stt/test_123");
   socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  console.log("RAW:", event.data);
  console.log("PARSED:", msg);

  if (msg.type === "final" || msg.type === "translation_bundle") {
    // captions and audio
    const subtitleId = msg.id || `${msg.participant_id}-${msg.timestamp}`; // added this 
    dispatch({
      type: STORE_SUBTITLE,
      subtitle: {
        id: subtitleId, //adde this 
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