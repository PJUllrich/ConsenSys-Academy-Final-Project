export default class Hash {
  index: number;
  fingerprint: string;
  owner: string;
  timestamp: number;


  constructor(index: number, fingerprint: string, owner: string, timestamp: number) {
    this.index = index;
    this.fingerprint = fingerprint;
    this.owner = owner;
    this.timestamp = timestamp;
  }

}
