

type EventHandler = (event: Event) => void;


// possibly renameable to something more descriptive? because what pair???
interface EventHandlerPair {
    event_name: string;
    handler: EventHandler;
}

export class EventContainer {

    handlers: EventHandlerPair[] = [];

    addEventListener(eventName: string, handler: EventHandler): void {
        this.handlers.push(
            {
                event_name: eventName, 
                handler: handler
            }
        );
    }

    getEventListeners(eventName: string): EventHandlerPair[] {
        return this.handlers.filter(
            (handlerPair: EventHandlerPair) => {
                return handlerPair.event_name === eventName;
            } 
        );
    }

    protected _getEventHandlers(event: Event): EventHandler[] {
        return this
            .getEventListeners(event.type).map(
                eventHandlerPair => eventHandlerPair.handler
            );
    }

    protected _executeEventHandlers(event: Event, handlers: EventHandler[]): void {
        handlers.map(
            (handler: EventHandler) => {
                handler(event) // should pass event details/context
            }
        );
    }

    // return a map of Array of Promises so the event handler's results
    // can be accessed by the dispatchEvent caller ???
    dispatchEvent(event: Event): void {
        const handlers = this._getEventHandlers(event);
        this._executeEventHandlers(event, handlers);
    }
    
}

export class Event {
    readonly type: string;
    readonly data: object | null;
    constructor(eventName: string, eventData: object | null = null) {
        this.type = eventName;
        this.data = eventData;
    }
}