import BaseEvent from './baseEvent';

export default class RemovalEvent extends BaseEvent {
  returnValues: {remover: string, index: number}
}
