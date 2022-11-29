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

## Add, Remove, or Edit Location on Map

# Adding a Location

In order to add a new location, navigate to src/assets/data.tsx. You should see a very large section near the bottom of the page with every location on the map. To add a new location, find the correct category for your new location, which will be one of the twelve categories. These include "Academics and Administrative", "Athletics and Recreation", "ATM Locations", and so on. 

Once you have identified your category, add a new line to the corresponding list. New lines must be added in this format:

```
{ name: "New Location", coords: "00.00, 00.00" },
```

The coords are the GPS coordinates of the location. To conveniently get the coordinates, open Google Maps in a browser, right click on the location, and click the first option, which should copy your current coordinates to your clipboard. From there, you can paste it as a string.

# Removing / Editing a Location

Removing a location from the map is as simple as deleting the line it's on. Navigate to src/assets/data.tsx and scroll to the bottom, where you will see multiple lists containing every location on the map. To delete a location, simply find the line and delete it. To edit a location, find the line and change either its name or its GPS coordinates.

## Pulling from Backend
## Special Packages