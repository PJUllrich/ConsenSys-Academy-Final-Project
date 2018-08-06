export default abstract class BaseEvent {
  event: string;
  signature: string;
  address: string;
  abstract returnValues: Object;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  raw: Object;
}
