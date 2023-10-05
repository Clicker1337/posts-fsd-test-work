import { FC } from "react";

import {Routes, Route} from "react-router-dom";
import {ROUTE_CONSTANTS} from "../shared/config/routes";

import {PostDetailedPage} from "./post-detailed";
import {PostsPage} from "./posts";
import {NotFound} from "./not-found/NotFound";

export const Router: FC = () => (
    <Routes>
        <Route path="*" element={<PostsPage />} />
        <Route path={ROUTE_CONSTANTS.HOME} element={<PostsPage />} />
        <Route path={ROUTE_CONSTANTS.POST} element={<PostDetailedPage />} />
        <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound />} />
    </Routes>
);