import { trackStructEvent } from "@snowplow/browser-tracker";

import { productViewHandler } from "../../src/handlers";
import schemas from "../../src/schemas";
import { mockEvent, mockProductCtx } from "../utils/mocks";

test("sends snowplow event", () => {
    productViewHandler(mockEvent);

    expect(trackStructEvent).toHaveBeenCalledTimes(1);

    expect(trackStructEvent).toHaveBeenCalledWith({
        category: "product",
        action: "view",
        property: "pdp",
        context: [
            {
                data: mockProductCtx,
                schema: schemas.PRODUCT_SCHEMA_URL,
            },
        ],
    });
});
