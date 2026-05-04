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
    translations?: { [lang: string]: string }; // added this 
    url?: { [lang: string]: string }; // added this as filename it was audio_paths before
    //audio_paths?: {[lang: string]: string; }; // added this 

    
    /*audio: string;*/
}
