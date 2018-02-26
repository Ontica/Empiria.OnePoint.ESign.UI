import { SignRequest } from './signRequest';

export interface SignEvent {
    uid: string,
    eventType: string,
    timeStamp: Date,
    signRequest: SignRequest;    
}
