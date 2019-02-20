# AccessU

### NOTE: This guide is still a work in progress. Follow at your own risk.


## Project Installation and setup:

Clone the repository in any desired file location.

Download and place the following dependency files in the specified locations:

- _AppDelegate.m_ in PROJECT_DIRECTORY/ios/AccessU/
- _AndroidManifest.xml_ in PROJECT_DIRECTORY/android/app/src/main/
- _db.js_ in PROJECT_DIRECTORY/app/

In the project directory, run the following command:

    npm install

### iOS:

...

Run the command to install and run the app on a connected device:

    react-native run-android

### Android:

First, install Android Debug Bridge (ADB) which allows the computer to communicate with a mobile device via cord.
Go to [Android Studio's website](https://developer.android.com/studio/#downloads) to download and install their sdk.
If you don't need the full Android Studio IDE you can just download the "Command line tools only".

Navigate to Settings > About Phone > Software Information and tap "Build Number" 7 times to enable Developer Mode (this process may vary depending on the specific device).
Make sure Developer Options > USB Debugging is enabled.

You can verify the device is detected by your computer with this command:

  adb devices

which will list the device.

...

Run the command to install and run the app on a connected device:

    react-native run-android

## Questions

If you have any questions, issues or suggestions, feel free to reach out to us!
We're constantly trying to make this app better for everyone.
