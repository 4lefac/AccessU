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

#### STEP 1

Install Xcode

You will need a developer account and it should be free so do not pay for one!

#### STEP 2

Generate your provision profile. So basically sign into Xcode and set your self as the Team developer.

Go to this link:

https://ioscodesigning.com/generating-code-signing-files/

Then run your program on a simulator or you can run it in your phone.

Instructions to run your app on your phone:

https://www.twilio.com/blog/2018/07/how-to-test-your-ios-application-on-a-real-device.html

Now you can actually run from the command line if you would like. CD into the AccessU directory in the terminal. Then run:

    react-native run-ios

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

# AccessU Rest API VERSION 1

### Client Side Data Structure

Currently every json object return or given to the API must have the following format: 

    {
        "coordinates": {
            "latitude": PUT-LATITUDE-HERE,
            "longitude": PUT-LONGITUDE-HERE
        },
        "name": PUT-ENTRANCE-NAME-AS-A-STRING,
        "description": PUT-DESCRIPTION-AS-A-STRING,
        "accessibilityType": []
    }
    
AccessibilityType should be just an array of the different type of accessibility features an entrance has.
We will define what these are in future versions.

You are allowed to leave these properties blank but remember it will be your responsibility to edit them in the future.

### Get all entrances from database:
https://accessu-c0933.firebaseapp.com/api/v1/entrances

You will get back an array of json objects that contain all the entrances in the database. 
The array will sort the entrances before you receive them. They will be sorted in alphabetical order by name.

You can click on the link to see what an example response would look like.

### Get a specific entrance from an id
https://accessu-c0933.firebaseapp.com/api/v1/entrances/PUT-ID-HERE

You will get back a single json object of an entrance. 
If the document does not exist you will get back a json object that looks like this:

    {
        "message" : "no such document"
    }


### add a specific entrance
https://accessu-c0933.firebaseapp.com/api/v1/entrances

You have to make post request to this link. With the fetch api in react native, you should be able to specify you want to
make a post request and send a single json object.

Once your entrance is added you will get a message and the id of the entrance in the database. Example:

    {
        message: 'Successfully added document',
        id: ENTRACE_ID_WILL_BE_HERE
    }

## ERRORS

If something happens that is not supposed to like for example you put in a wrong url, you will get an error message json back.
An example is :

    {
        "error": {"message": "Not found"}
    }


Usually the message will consist of what mistake you made!


## Questions

If you have any questions, issues or suggestions, feel free to reach out to us!
We're constantly trying to make this app better for everyone.

