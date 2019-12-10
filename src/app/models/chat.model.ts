export interface Chat {
    _id: string,
    members: [ string ], //usernames 
    messages:[ { _id: string, from: string, body: string} ]
}