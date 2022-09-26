import { TopLevelCategory } from "./pageInterface";

export interface PageItem {
    alias: string;
    title: string;
    _id: string;
    category: string;
}
export interface MenuItem {
    _id: {
        secondCategory: string;
    };
    isOpened?: boolean;
    pages: PageItem[];
}
// REDUX
export interface Menu {
    firstCategory: number;
    list: MenuItem[];
}

// Верстка
export interface FirstLevelMenuItem {
    route: string;
    name: string;
    icon: JSX.Element;
    id: TopLevelCategory
}