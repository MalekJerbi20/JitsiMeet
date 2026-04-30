import { IGroupableMessage } from '../base/util/messageGrouping';

export interface ITranscriptMessage {
    clearTimeOut?: number;
    final?: string;
    participant: {
        avatarUrl?: string;
        id?: string;
        name?: string;
    };
    stable?: string;
    unstable?: string;
}

export interface ISubtitle extends IGroupableMessage {
    id: string;
    interim?: boolean;
    isTranscription?: boolean;
    language?: string;
    participantId: string;
    text: string;
    timestamp: number;
    audio_paths?: {
        [lang: string]: string; // e.g. { en: "/audio/en_123.mp3", de: "/audio/de_456.mp3" }
    };
    
    /*audio: string;*/
}
