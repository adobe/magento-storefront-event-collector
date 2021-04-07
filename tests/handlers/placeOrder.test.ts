import { placeOrderHandler } from "../../src/handlers";

test("sends snowplow event", () => {
    placeOrderHandler();

    expect(window.snowplow).toHaveBeenCalledTimes(1);

    expect(window.snowplow).toHaveBeenCalledWith(
        "trackStructEvent",
        "checkout",
        "place-order",
        "111111",
        "pdp",
        0,
        undefined,
    );
});
