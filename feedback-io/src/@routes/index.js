import TestPage from "../@pages/TestPage/TestPage";

const routes = [{
    path: "/",
    key: "root",
    component: TestPage,
    children: [{
        path: "/test",
        key: "test",
        displayName: "Test",
        component: TestPage
    }]
}];

export default routes;