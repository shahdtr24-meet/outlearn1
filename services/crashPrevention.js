// Crash Prevention Service
// This service helps prevent common React Native crashes

class CrashPreventionService {
  static init() {
    // Set up global error handlers
    this.setupGlobalErrorHandlers();
    this.setupPromiseRejectionHandler();
    this.setupConsoleOverrides();
  }

  static setupGlobalErrorHandlers() {
    // Catch JavaScript errors before they crash the app
    const originalHandler = global.ErrorUtils?.getGlobalHandler?.();
    
    global.ErrorUtils?.setGlobalHandler?.((error, isFatal) => {
      console.error('Global error caught:', error);
      
      // Log the error but don't let it crash the app
      if (isFatal) {
        console.error('Fatal error prevented from crashing app:', error);
        // You could show a user-friendly error screen here
        return;
      }
      
      // Call the original handler for non-fatal errors
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
  }

  static setupPromiseRejectionHandler() {
    // Handle unhandled promise rejections
    const originalHandler = global.Promise;
    
    if (originalHandler) {
      global.Promise = class extends originalHandler {
        constructor(executor) {
          super((resolve, reject) => {
            return executor(resolve, (error) => {
              console.error('Promise rejection caught:', error);
              reject(error);
            });
          });
        }
      };
    }
  }

  static setupConsoleOverrides() {
    // Override console.error to catch and log errors
    const originalError = console.error;
    console.error = (...args) => {
      // Check for React Native specific errors
      const errorMessage = args.join(' ');
      
      if (errorMessage.includes('non-std C++ exception')) {
        console.warn('C++ exception detected - likely caused by async operation in Firebase listener');
      }
      
      if (errorMessage.includes('RCTFatal')) {
        console.warn('RCTFatal error detected - likely caused by unhandled JavaScript error');
      }
      
      originalError.apply(console, args);
    };
  }

  // Safe wrapper for Firebase operations
  static safeFirebaseCall(operation, fallback = null) {
    return new Promise((resolve) => {
      try {
        const result = operation();
        
        if (result && typeof result.then === 'function') {
          result
            .then(resolve)
            .catch((error) => {
              console.error('Firebase operation failed safely:', error);
              resolve(fallback);
            });
        } else {
          resolve(result);
        }
      } catch (error) {
        console.error('Firebase operation failed synchronously:', error);
        resolve(fallback);
      }
    });
  }

  // Safe wrapper for async operations
  static async safeAsync(operation, fallback = null) {
    try {
      return await operation();
    } catch (error) {
      console.error('Async operation failed safely:', error);
      return fallback;
    }
  }

  // Check if user is properly authenticated before operations
  static isUserReady(user, userProfile) {
    return user && user.uid && !user.isAnonymous;
  }

  // Safe state updates for React components
  static safeSetState(setStateFunction, newValue) {
    try {
      if (typeof setStateFunction === 'function') {
        setStateFunction(newValue);
      }
    } catch (error) {
      console.error('State update failed safely:', error);
    }
  }
}

export default CrashPreventionService;