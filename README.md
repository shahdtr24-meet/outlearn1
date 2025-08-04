# OutLearn - Financial Education App

## Tutorial Integration

The app now includes a comprehensive tutorial system that guides new users through the app's features. Here's how it works:

### Features

1. **Automatic Tutorial Display**: New users automatically see the tutorial on their first app launch
2. **Interactive Tutorial Steps**: The tutorial includes 6 steps covering:
   - Welcome message
   - Dashboard overview
   - Courses section
   - Games section
   - Profile section
   - Completion message

3. **Tutorial Management**:
   - Tutorial status is stored in Firebase
   - Users can reset the tutorial from their profile
   - Tutorial can be skipped at any time

### Technical Implementation

#### Files Modified/Created:

1. **`services/userService.js`** - Fixed syntax error and added tutorial methods:
   - `getTutorialStatus(userId)` - Check if user completed tutorial
   - `updateTutorialStatus(userId, completed)` - Update tutorial completion
   - `resetTutorial(userId)` - Reset tutorial for existing users
   - `createUserDocument(userId, userData)` - Create user with tutorial defaults

2. **`hooks/useTutorial.js`** - New hook for tutorial state management:
   - Manages tutorial visibility and step progression
   - Integrates with UserService for persistence
   - Provides methods to control tutorial display

3. **`app/components/AppTutorial.jsx`** - Enhanced tutorial component:
   - Beautiful animated tutorial with spotlight effects
   - Interactive navigation between app sections
   - Progress indicators and skip functionality

4. **`app/(tabs)/_layout.jsx`** - Integrated tutorial into main app layout

5. **`app/components/signupscreen.jsx`** - Added tutorial field to new user creation

6. **`app/profile.jsx`** - Added tutorial management options:
   - Reset tutorial button
   - Test tutorial button for development

### Usage

#### For New Users:
- Tutorial automatically appears on first app launch
- Users can navigate through steps or skip entirely
- Tutorial completion is saved to Firebase

#### For Existing Users:
- Tutorial won't show unless reset
- Can reset tutorial from Profile > Settings > Reset Tutorial
- Can test tutorial from Profile > Settings > Test Tutorial

#### For Developers:
- Use `forceShowTutorial()` from useTutorial hook to test
- Tutorial state is managed through Firebase user documents
- All tutorial interactions are logged and persisted

### Database Schema

The tutorial integration adds these fields to the user document:

```javascript
{
  completedTutorial: boolean, // Whether user has completed tutorial
  // ... other user fields
}
```

### Testing

To test the tutorial:
1. Go to Profile screen
2. Tap "Test Tutorial" in Settings section
3. Navigate through the tutorial steps
4. Complete or skip the tutorial

The tutorial will guide users through the main app features with beautiful animations and clear instructions.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
