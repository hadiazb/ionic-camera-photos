import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'fotos-gram-front',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
};

export default config;
