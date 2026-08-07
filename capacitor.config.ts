import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'ai.accentpro.app',
  appName: 'Accent Pro',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#060f1e',
      showSpinner: false,
    },
  },
}

export default config
