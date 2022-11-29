# This will be the Front Documentation page

## Front End Structure

Almost everything for the front end is located in the src/assets folder. Inside this folder, you will see images, screens, and data. Images contains all images the app uses, screens contains all the pages or screens the app uses, and data contains most of the long or complicated data sets that pages will use.

Inside the screens folder, there is a Components folder. This folder contains any partial pages that are meant to be rendered inside another page. For example, the header and profile overlay pages are here. These are best used when there is a component that is used in multiple pages.

## Pages

All pages follow the same format. The import statements are at the top, followed by the export default function, the return statement, and the stylesheet at the bottom. In order to create a new page, follow the steps on "Contribute." 

On most pages, you will see the import for the header since it appears often. This is written as such:

```
import Header from "./Components/header";
```

## Widgets

Widgets are essentially just clever buttons that link to certain pages. In order to add a new widget, follow the steps on "Contribute."

## Special Pages
## Pulling from Backend
## Special Packages