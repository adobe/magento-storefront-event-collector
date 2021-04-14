import { addToCartHandler } from "../../src/handlers";
import schemas from "../../src/schemas";
import { mockEvent, mockProductCtx } from "../utils/mocks";

test("sends snowplow event", () => {
    addToCartHandler(mockEvent);

    expect(window.snowplow).toHaveBeenCalledTimes(1);

    expect(window.snowplow).toHaveBeenCalledWith(
        "trackStructEvent",
        "product",
        "add-to-cart",
        undefined,
        "pdp",
        undefined,
        [
            {
                data: mockProductCtx,
                schema: schemas.PRODUCT_SCHEMA_URL,
            },
        ],
    );
});
