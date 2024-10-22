# Task Master Native App

## Overview

Task Master is a React Native application designed to help users manage their tasks. This app allows users to add, edit, delete, mark tasks as complete, and filter tasks based on their completion status. The tasks are stored locally on the device using AsyncStorage, making it easy for users to resume where they left off, even after closing the app. The app emphasizes simplicity, responsiveness, and a user-friendly interface.

<br><br>

## [You can download the APK from this link](https://example.com/demo-apk).

## Features

### Core Features

- **Task List View:** Displays a list of tasks with titles, descriptions, and completion status. Completed tasks are visually distinguishable (e.g., strikethrough or different color).
- **Add Task:** A form to add new tasks with input validation (e.g., non-empty title).
- **Mark Task as Completed:** Users can toggle tasks between completed and incomplete states.
- **Delete Task:** Users can delete tasks from the list with a simple action.
- **Persistent Storage:** Task data is saved using AsyncStorage, ensuring tasks persist even after closing the app.

### Bonus Features

- **Edit Task:** Users can edit existing tasks (title and description).
- **Task Filtering:** Users can filter tasks based on their status (completed or incomplete).
- **Subtle Animations:** Smooth animations when adding, completing, or deleting tasks.

## Technologies Used

- **React Native**
- **Redux**: For managing task-related state
- **AsyncStorage**: For persistent local task storage
- **NativeWind**: For styling
- **React Navigation**: For screen and tab navigation

## App Screenshots

![Screenshot 1](https://drive.google.com/file/d/1D3wJPeWfYs4h0Tf9UGy4lO0b0LiwoKJU/view?usp=sharing)
![Screenshot 2](https://drive.google.com/file/d/1kbbAP1nBLPhFhKMu3R8w3rrp3ZuCXe-2/view?usp=sharing)
![Screenshot 3](https://drive.google.com/file/d/1Rv2oyAYz_VQSa8_-aTvtiUOZo_PerYtS/view?usp=sharing)

## Installation

To get the project running locally, follow these steps:

```
git clone https://github.com/nazmul162001/Task-Master_Native-App.git
npm install
npx expo start
```

## Folder Structure

```
TASK-MASTER_NATIVE-APP/
├── .expo
├── .idea
├── .vscode
├── app
│   ├── (tabs)
│   │   ├── _layout.jsx
│   │   ├── all.jsx
│   │   └── create.jsx
│   ├── redux
│   │   ├── reducers
│   │   │   └── TodoReducer.js
│   │   └── store
│   │       ├── TodoStore.js
│   │       └── _layout.jsx
│   ├── assets
│   ├── components
│   │   ├── CustomButton.jsx
│   │   └── FormField.jsx
│   ├── constants
│   │   ├── icons.js
│   │   ├── images.js
│   │   └── index.js
├── node_modules
├── .gitignore
├── app.json
├── babel.config.js
├── eas.json
├── package-lock.json
├── package.json
├── README.md
└── tailwind.config.js
```
