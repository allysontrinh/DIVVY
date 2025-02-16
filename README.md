# DIVVY

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get Started:
1. cd DIVVY

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses
[file-based routing] -> https://docs.expo.dev/develop/file-based-routing/

**Reference the /app-example directory when you need it, it's an example of a React Native app.**

Maybe some helpful notes:
- File-based routing: The example app has 2 screens, Home (/app-example/app/(tabs)/index.tsx) and Explore (/app-example/app/(tabs)/explore.tsx).
- _layout.tsx defines shared UI elements such as headers, tab bars so that they persist between different routes

# IMPORTANT FILE NOTES
- index.jsx inside /app/(home) is the entry point
- every 'folder' needs a _layout.jsx in order for react router to work properly