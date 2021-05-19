/*
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import mse from "@adobe/magento-storefront-events-sdk";
import { MagentoExtension } from "@adobe/magento-storefront-events-sdk/dist/types/types/schemas";

import schemas from "../schemas";
import { ExtensionContext } from "../types/contexts";

const createContext = (extension?: MagentoExtension): ExtensionContext => {
    const magentoExtensionCtx = extension ?? mse.context.getMagentoExtension();

    if (!magentoExtensionCtx) {
        return {
            schema: schemas.MAGENTO_EXTENSION_SCHEMA_URL,
            data: {},
        };
    }

    const context = {
        schema: schemas.MAGENTO_EXTENSION_SCHEMA_URL,
        data: {
            magentoExtensionVersion:
                magentoExtensionCtx.magentoExtensionVersion,
        },
    };

    return context;
};

export default createContext;
