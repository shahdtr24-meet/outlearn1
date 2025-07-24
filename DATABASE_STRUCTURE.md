# Database Structure & User Data Linking

## Overview
This app uses Firebase Authentication and Firestore Database to create a personalized experience where each authenticated user has their own data isolated from other users.

## User Authentication Flow
1. **Signup/Login**: Users authenticate via Firebase Auth
2. **User Document Creation**: Upon signup, a user document is created in Firestore
3. **Real-time Sync**: User data is synced in real-time across the app

## Database Collections

### 1. Users Collection (`users/{userId}`)
Each authenticated user has a document with their UID as the document ID.

```javascript
{
  email: "user@example.com",
  displayName: "John Doe",
  points: 150,
  level: 2,
  financeProgress: [1, 2, 3], // Completed levels
  completedCourses: ["finance", "marketing"],
  achievements: [
    {
      title: "First Course Complete",
      description: "Completed your first course",
      earnedAt: timestamp,
      points: 50
    }
  ],
  createdAt: "2024-01-01T00:00:00Z",
  lastActive: timestamp
}
```

### 2. Posts Collection (`posts/{postId}`)
Community posts linked to users via `userId` field.

```javascript
{
  userId: "user123", // Links to authenticated user
  user: "John Doe", // Display name
  avatar: "J", // First letter of name
  content: "Just completed level 3!",
  likes: 5,
  likedBy: ["user456", "user789"], // Array of user IDs who liked
  createdAt: timestamp
}
```

## User Data Linking Implementation

### 1. Authentication Context (`hooks/useAuth.js`)
- Provides `userId`, `user`, and `userProfile` throughout the app
- Real-time listener for user profile changes
- Automatic authentication state management

### 2. User Service (`services/userService.js`)
- `updateCourseProgress(userId, courseType, level)` - Updates user's course progress
- `addAchievement(userId, achievement)` - Adds achievements to user profile
- `createCommunityPost(userId, displayName, content)` - Creates posts linked to user
- `togglePostLike(postId, userId)` - Handles post likes with user tracking

### 3. Data Security Rules (Firestore)
```javascript
// Each user can only read/write their own data
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Posts are readable by all authenticated users
    // Users can only create posts with their own userId
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                   request.auth.uid == resource.data.userId;
      allow update: if request.auth != null;
    }
  }
}
```

## How Each User Gets Their Own Data

### 1. Course Progress
- When a user completes a level: `UserService.updateCourseProgress(userId, 'finance', level)`
- Progress is stored in the user's document: `users/{userId}.financeProgress`
- Only the authenticated user can see/modify their progress

### 2. Points & Levels
- Points are awarded automatically when completing courses or earning achievements
- Level is calculated dynamically based on points using `UserService.calculateLevel(points)`
- Each user has their own point total and level

### 3. Community Posts
- Posts include the `userId` field linking them to the creator
- Users can only create posts with their own `userId`
- Likes are tracked per user in the `likedBy` array

### 4. Achievements
- Stored in the user's document as an array
- Each achievement includes when it was earned and points awarded
- Personal to each user

## Key Benefits

1. **Data Isolation**: Each user only sees and can modify their own data
2. **Real-time Updates**: Changes sync instantly across all user sessions
3. **Scalable**: Can handle unlimited users without data conflicts
4. **Secure**: Firebase security rules prevent unauthorized access
5. **Personalized**: Each user has a unique experience based on their progress

## Usage Examples

### Getting Current User Data
```javascript
const { userId, userProfile } = useAuth();
const points = userProfile?.points || 0;
const level = UserService.calculateLevel(points);
```

### Updating User Progress
```javascript
// This will only update the authenticated user's progress
await UserService.updateCourseProgress(userId, 'finance', 3);
```

### Creating User-Specific Posts
```javascript
// Post will be linked to the current user
await UserService.createCommunityPost(userId, displayName, content);
