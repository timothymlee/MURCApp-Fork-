# This will be the documentation for contributing to the APP

## Contributing code to the Repo
## Contributing to the Read the Docs

## Adding New Pages

To order to add a new page, navigate to src/assets/screens. From there, you should see all the pages for the app along with a folder named "Components". If you're creating a new page, add a new .tsx file with an appropriate name, following conventions. If you're creating a page that is meant to be imported to another page, such as the header or search bar, add that to the Components folder. 

Once you create a new .tsx file, you should copy and paste this template:

```
import React from 'react';
import { StyleSheet, SafeAreaView } from "react-native";

type CompProps = {
  navigation: { navigate: Function; };
};

export default function NewPageName(props: CompProps) {
    return (
        <SafeAreaView style={styles.page}>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
    backgroundColor: '#1E293B',
    flex: 1
  }
})
```

Any import statements will go at the top of the page. The CompProps type is used for navigation. Styles will go in the style sheet at the bottom of the page. All displayed page content should go in the SafeAreaView. Make sure you change the name of the export default function to the name of your page!

Next, open App.js, which is located at the root. You will need to add an import statement to the stack, following this format:

```
import NewPageName from './assets/screens/new_page_name';
```

Then, add your page to the navigation stack at the bottom of the page:

```
<Stack.Screen name = "NewPageName" component = {NewPageName} />
```

Make sure your names follow the same format. 

## Adding new Widgets

To add a new widget to the home screen, you first need to create a new page following the steps above. Once you do that, navigate to src/data and find the const WidgetNames. You must add a new line following this format:

```
{ name: "Widget Name", url: 'NewWidgetName', icon: resourceImages[0], size: 6, color: darkBlue, guest: true },
```

- *name* The display name of your new widget, in quotes
- *url* The navigation object that is created in App.js. The navigation.navigate() function will be called on this in the code.
- *icon* Uses an index from resourceImages, which contains the names of the icons. This list is in src/assets/data.tsx. If you need to add a new image, add it to the resourceImages list. Only takes icons from the "ionicon" library.
- *size* The size of the widget in the grid. Size 0 is 1x1, 1 is 1x2, 2 is 1x3, 3 is 1x4, 4 is 2x2, 5 is 2x3, 6 is 2x4.
- *color* Can be a hard-coded hex value with the "#FFFFFF" format or a color which refers to the colors in src/assets/data.tsx.
- *guest* A boolean value that says whether a guest can have access to this widget or not. If it is true, a guest (a user who is not signed in) will be able to click on the widget. If it is false, it will be grayed out and guests cannot access it.

# For the Back 
## Scrapping a new page
## Calling a new endpoint
