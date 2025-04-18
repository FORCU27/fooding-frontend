## Step 1: Metro 서버 실행

```sh
cd apps/app-mobile
yarn start
```

## Step 2: 앱 실행

### Android

```sh
cd apps/app-mobile/android
npx react-native run-android ## yarn android
```

### iOS

```sh
cd apps/app-mobile/ios
pod install
npx react-native run-ios ## yarn ios
```
