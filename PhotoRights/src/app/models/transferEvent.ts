import BaseEvent from './baseEvent';

export default class TransferEvent extends BaseEvent {
  returnValues: {oldOwner: string, newOwner: string, newIndex: number}
}
