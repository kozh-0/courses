## My project written in TypeScript, Next.js, SCSS, RTK, Routing, SSR, REST API, Git, GitHub, Figma, Docker

# Description

The "Courses" project contains educational courses on various topics, in the navigation section they are divided into categories, according to thematic subcategories. When you go to a subcategory, cards with courses are provided, they can be filtered by price and rating. The card contains all the necessary information, conveniently designed, you can also view comments and leave your own, which will go to the courses-top.ru API and be rendered.

The project is written in Next.js `12.2.5` using server rendering and TypeScript. Animations are made on Framer-motion, SCSS styling, Axios requests via SSR rendering then data is being distributed via Redux Toolkit. Aria attributes and competent semantics, for example, the menu is presented as a root tag nav, in which ul with li tags, which can be navigated with keyboards (tab), there is accessibility and support for screen readers, the comment form is validated through the react-hook-form, tooltips icluded. Meta tags on each page are unique and the head tag renders based on API call. Images are compressed and cached through next-image. The 'up' button changes opacity as you scroll.

I made it with a figma layout, some things had been enhanced
https://www.figma.com/file/eHIyKZXUUtMf1BQiuv6tTA/%D0%9A%D1%83%D1%80%D1%81-2---NextJS?node-id=1%3A2

There are a docker container support, deployed on Vercel.
