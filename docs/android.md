### Android:

First, install Android Debug Bridge (ADB) which allows the computer to communicate with a mobile device via cord.
To do this, go to [Android Studio's website](https://developer.android.com/studio/#downloads) to download and install the SDK.
If you don't need the full Android Studio IDE you can just download the "Command line tools only" option.

On your mobile device, navigate to _Settings > About Phone > Software Information_ and tap "Build Number" 7 times to enable Developer Mode (this process may vary depending on the specific device).
Make sure _Developer Options > USB Debugging_ is enabled.

You can verify the mobile device is detected by your computer with this command:

  adb devices

which will list the device.

...

Run the command to install and run the app on a connected device:

    react-native run-android
