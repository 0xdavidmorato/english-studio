import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors, typography } from '@english-studio/ui-shared';

export default function App() {
  return (
    <ScrollView contentContainerStyle={{ padding: 24, backgroundColor: (colors as any).background }}>
      <Text style={{ color: (colors as any).ink, fontFamily: (typography as any).fontFamily, fontSize: 20, marginBottom: 12 }}>English Studio (mobile scaffold)</Text>
      <Text style={{ color: (colors as any).muted }}>This is a minimal Expo scaffold referencing the ui-shared workspace package.</Text>
    </ScrollView>
  );
}
