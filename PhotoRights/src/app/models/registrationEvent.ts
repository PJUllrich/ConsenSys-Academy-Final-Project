import BaseEvent from './baseEvent';

export default class RegistrationEvent extends BaseEvent {
  returnValues: {adder: string, index: number, hash: string}
}
