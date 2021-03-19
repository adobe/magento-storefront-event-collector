/*
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import { analytics } from "../analytics";

const handler = (): void => {
    analytics.track("searchRequestSent", {
        category: "search",
        action: "searchRequestSent",
        label: "<userQuery>",
        property: "<pageType>",
        value: "<popover|grid>",
        contexts: [],
    });
};

export default handler;
