export interface SignRequest {
    uid: string,
    requestedBy: string,
    requestedTime: Date,
    signStatus: string,
    signatureKind: string,
    digitalSignature: string,
    document: {
        uid: string,
        type: string,
        documentNo: string,
        description: string,
        uri: string
    },
    filing: {
        filingNo: string,
        filingTime: Date,
        filedBy: string,
        postedBy: string
    }
    selected: boolean
}

