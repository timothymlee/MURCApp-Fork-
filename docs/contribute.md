# This will be the documentation for contributing to the APP

## Contributing code to the Repo
## Contributing to the Read the Docs

## Adding new pages

In order to add a new page, navigate to the assets folder in the project, then go to screens. From there, you should see all the pages for the app along with a folder named "Components". If you're creating a new page, add a new .tsx file with an appropriate name, following conventions. If you're creating a page that is meant to be imported to another page, such as the header or search bar, add that to the Components folder. 

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

Next, find the App.js file. You will need to add an import statement to the stack, following this format:

```
import NewPageName from './assets/screens/new_page_name';
```

Then, add your page to the navigation stack at the bottom of the page:

```
<Stack.Screen name = "NewPageName" component = {NewPageName} />
```

Make sure your names follow the same format. 

## Adding new Widgets

# For the Back 
## Scrapping a new page
## Calling a new endpoint
