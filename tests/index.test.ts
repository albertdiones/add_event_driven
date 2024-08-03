import {test, expect} from "@jest/globals"
import {EventContainer} from '..';

test(
    "test working",
    () => {
        const x = 1;
        expect(x).toBe(1);
    }
);

test(
    "new EventContainer()",
    () => {
        new EventContainer();
    }
);

test(
    "addEventListener('event_name', handler)",
    () => {
        const container = new EventContainer();
        const handler = () => console.log('event handled');
        expect(container).toHaveProperty('addEventListener');

        container.addEventListener('event_name', handler);
    }
)